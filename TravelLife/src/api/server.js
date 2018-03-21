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

var User = require("./models/user");

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
						res.status(500).send({error: "Could not save new user."});
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
		User.remove({_id: req.body.userId}, function(err)
		{
			if (err)
				res.status(500).send({error: err});
			else // Success
				res.send("User deleted.");
		});
	}
});
