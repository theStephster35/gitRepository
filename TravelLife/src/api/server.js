var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var Config = require("./config/config");

var app = express();
app.use(express.static(Config.appRoot));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var db = mongoose.connect(Config.dbUrl, {}, function(err)
{
	if (err)
		db = null;
});

var DataEnum = require("./config/dataEnum");

var User = require("./models/user");
var Player = require("./models/player");
var Attribute = require("./models/attribute");
var Statistic = require("./models/statistic");

app.listen(Config.appPort, function()
{
	console.log("Travel Life running on port " + Config.appPort + ".")
});

app.get("/TravelLife", function(req, res)
{
	if (db == null)
		res.sendFile(Config.appRoot + "/index.html");
	else // DB Connected
		res.sendFile(Config.appRoot + "/signIn.html");
});

app.get("/TravelLifeGame", function(req, res)
{
	res.sendFile(Config.appRoot + "/index.html");
});

app.post("/api/signIn", function(req, res)
{
	if (req.body == null 
	 || req.body.username == null || req.body.username === "")
		res.status(400).send({error: "No username provided."});
	else if (req.body.password == null || req.body.password === "")
		res.status(400).send({error: "No password provided."});
	else // Username and password provided
	{
		User.findOne({username: req.body.username}, function(err, user)
		{
			if (err)
				res.status(500).send({error: err});
			else if (user == null)
			{
				// New User
				user = new User(req.body);
				user.save(function(err, savedUser)
				{
					if (err)
						res.status(500).send({error: err});
					else // Success
						res.send(savedUser);
				});
			}
			else // Success
			{
				if (user.password !== req.body.password)
					res.status(401).send({error: "Invalid credentials."});
				else // Success
					res.send(user);
			}
		});
	}
});

app.delete("/api/deleteUser", function(req, res)
{
	if (req.body == null
	 || req.body.userId == null || req.body.userId === "")
		res.status(400).send({error: "No user ID provided."});
	else // User ID provided
	{
		var userId = req.body.userId;

		Player.find({userId: userId}, function(err, players)
		{
			if (!err)
			{
				for (var player of players)
				{
					Attribute.remove({playerId: player._id}, function(err) {});
					Statistic.remove({playerId: player._id}, function(err) {});
				}

				Player.remove({userId: userId}, function(err) {});
			}
		});

		User.remove({_id: userId}, function(err)
		{
			if (err)
				res.status(500).send({error: err});
			else // Success
				res.send("User deleted.");
		});
	}
});

app.post("/api/saveGame", function(req, res)
{
	if (req.body == null 
	 || req.body.userId == null || req.body.userId === "")
		res.status(400).send({error: "No user ID provided."});
	if (req.body.player == null || req.body.player === "")
		res.status(400).send({error: "No player data provided."});
	if (req.body.attributes == null || req.body.player === "")
		res.status(400).send({error: "No attribute data provided."});
	if (req.body.statistics == null || req.body.player === "")
		res.status(400).send({error: "No statistic data provided."});
	else // User data provided
	{
		User.findOne({_id: req.body.userId}, function(err, user)
		{
			if (err)
				res.status(500).send({error: err});
			else if (user == null)
				res.status(404).send({error: "User not found."});
			else // Success
			{
				var playerData = req.body.player;
				playerData.userId = user._id;
				playerData.createdDate = new Date();
				playerData.modifiedDate = playerData.createdDate;

				var criteria = {userId: user._id};
				(req.body.playerId != null ? criteria._id = req.body.playerId : criteria.name = "");
				Player.findOneAndUpdate(criteria, playerData,
						{upsert: true, new: true, runValidators: true},
				function(err, player)
				{
					if (err)
						res.status(500).send({error: err});
					else // Success
					{
						var attributesData = req.body.attributes;
						for (var i = 0; i < attributesData.length; i++)
						{
							var attributeData = attributesData[i];
							attributeData.playerId = player._id;
							Attribute.findOneAndUpdate({playerId: player._id, name: attributeData.name},
									attributeData, {upsert: true, new: true, runValidators: true},
							function(err, savedAttribute)
							{
								if (err)
								{
									res.status(500).send({error: err});
									return;
								}
							});
						}

						var statisticsData = req.body.statistics;
						for (var i = 0; i < statisticsData.length; i++)
						{
							var statisticData = statisticsData[i];
							statisticData.playerId = player._id;
							Statistic.findOneAndUpdate({playerId: player._id, name: statisticData.name},
								statisticData, {upsert: true, new: true, runValidators: true},
							function(err, savedStatistic)
							{
								if (err)
								{
									res.status(500).send({error: err});
									return;
								}
							});
						}

						res.send({playerId: player._id});
					}
				});
			}
		});
	}
});

app.get("/api/getActivePlayerId/:userId", function(req, res)
{
	if (req.params.userId == null || req.params.userId === "")
		res.status(400).send({error: "No user ID provided."});
	else // Player ID provided
	{
		Player.findOne({userId: req.params.userId, status: {$ne: DataEnum.EXPIRED}},
		function(err, player)
		{
			if (err)
				res.status(500).send({error: err});
			else if (player == null)
				res.status(404).send({error: "Player not found."});
			else // Success
				res.send({playerId: player._id});
		});
	}
});

app.get("/api/loadGame/:playerId", function(req, res)
{
	if (req.body == null 
	 || req.params.playerId == null || req.params.playerId === "")
		res.status(400).send({error: "No player ID provided."});
	else // Player ID provided
	{
		var playerId = req.params.playerId;
		Player.findOne({_id: playerId}, function(err, player)
		{
			if (err)
				res.status(500).send({error: err});
			else if (player == null)
				res.status(404).send({error: "Player not found."});
			else // Success
			{
				const ATTRIBUTE_READY = 0;
				const STATISTIC_READY = 1;
				var readyCheck = [false, false];

				var resData = new Object();
				resData.player = player;
				Attribute.find({playerId: player._id}, function(err, attributes)
				{
					if (err)
						res.status(500).send({error: err});
					else // Success
					{
						resData.attributes = attributes;
						readyCheck[ATTRIBUTE_READY] = true;
						sendResponseWhenReady(res, resData, readyCheck);
					}
				});

				Statistic.find({playerId: player._id}, function(err, statistics)
				{
					if (err)
						res.status(500).send({error: err});
					else // Success
					{
						resData.statistics = statistics;
						readyCheck[STATISTIC_READY] = true;
						sendResponseWhenReady(res, resData, readyCheck);
					}
				});
			}
		});
	}
});

function sendResponseWhenReady(res, resData, readyCheck)
{
	if (!readyCheck.includes(false))
		res.send(resData);
}