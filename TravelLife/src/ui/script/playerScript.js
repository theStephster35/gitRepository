var player;
var playerIcon = document.getElementById("playerIcon");

var playerStatsMap = new Map();
playerStatsMap.set(StatsEnum.TILES_EXPOSED, 0);
playerStatsMap.set(StatsEnum.TILES_TRAVELED, 0);
playerStatsMap.set(StatsEnum.TREASURES_COLLECTED, 0);

var actionFunctionMap = new Map();
actionFunctionMap.set(DirectionEnum.UP_LEFT,    moveUpLeft);
actionFunctionMap.set(DirectionEnum.UP,         moveUp);
actionFunctionMap.set(DirectionEnum.UP_RIGHT,   moveUpRight);
actionFunctionMap.set(DirectionEnum.LEFT,       moveLeft);
actionFunctionMap.set(DirectionEnum.CENTER,     stayCenter);
actionFunctionMap.set(DirectionEnum.RIGHT,      moveRight);
actionFunctionMap.set(DirectionEnum.DOWN_LEFT,  moveDownLeft);
actionFunctionMap.set(DirectionEnum.DOWN,       moveDown);
actionFunctionMap.set(DirectionEnum.DOWN_RIGHT, moveDownRight);

// Server functions
function loadActivePlayer()
{
	if (user == null)
		return;

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function()
	{
		if (this.readyState === 4)
		{
			var activePlayerId;
			if (this.status === 200)
				activePlayerId = JSON.parse(this.responseText).playerId;

			loadGame(activePlayerId);
		}
	};

	xhttp.open("GET", ConfigEnum.API_ROOT + "/api/getActivePlayerId/" + user._id, true);
	xhttp.setRequestHeader("Content-Type", "application/json");

	xhttp.send();
}

function getPlayerDataToSave()
{
	if (user == null)
		return null;

	var playerData =
	{
		userId: user._id,
		modifiedDate: new Date(),
		name: player.name,
		species: player.species.type,
		status: player.status,
		up: player.momentum.up,
		left: player.momentum.left,
		right: player.momentum.right,
		down: player.momentum.down,
		map: getMapDataToSave()
	}

	return playerData;
}

function getPlayerIconByStatus()
{
	var playerIcon;

	switch (player.status)
	{
		case StatusEnum.CLIMBING:
			playerIcon = (player.momentum.left > 0
					? ActionEnum.CLIMB_LEFT : ActionEnum.CLIMB_RIGHT).replace(" ", "");
			break;
		case StatusEnum.JUMPING:
		case StatusEnum.SWIMMING:
		case StatusEnum.FALLING:
			if (player.momentum.left > 0)
				playerIcon = ActionEnum.JUMP_LEFT.replace(" ", "");
			else if (player.momentum.right > 0)
				playerIcon = ActionEnum.JUMP_RIGHT.replace(" ", "");
			else
				playerIcon = "Suspended";
			break;
		case StatusEnum.RUNNING:
			playerIcon = (player.momentum.left > 0
					? ActionEnum.RUN_LEFT : ActionEnum.RUN_RIGHT).replace(" ", "");
			break;
		case StatusEnum.DIGGING:
			if (player.momentum.left > 0)
				playerIcon = ActionEnum.DIG_LEFT.replace(" ", "");
			else if (player.momentum.right > 0)
				playerIcon = ActionEnum.DIG_RIGHT.replace(" ", "");
			else
				playerIcon = ActionEnum.DIG_DOWN.replace(" ", "");
			break;
		default:
			playerIcon = "Species";
	}

	return "images/Species/" + player.species.type + "/" + playerIcon + ".png";
}

function getAttributeDataToSave()
{
	if (player == null)
		return null;

	var attributeData = [];
	for (var attribute of player.attributeMap.keys())
	{
		attributeData.push(
		{
			playerId: player._id,
			name: attribute,
			value: player.attributeMap.get(attribute),
			maxValue: player.species.attributeMap.get(attribute)
		});
	}

	return attributeData;
}

function getStatisticDataToSave()
{
	if (player == null)
		return null;

	var statisticData = [];
	for (var statistic of player.statisticsMap.keys())
	{
		statisticData.push(
		{
			playerId: player._id,
			name: statistic,
			value: player.statisticsMap.get(statistic),
		});
	}

	return statisticData;
}
// Server functions end

// Uses server functions
function initPlayer(gameData)
{
	if (gameData == null)
	{
		var species = document.getElementById("species");
		player = new Player(document.getElementById("name").value,
				species.options[species.selectedIndex].value);
	}
	else // Loading player
	{
		var playerData = gameData.player;

		player = new Player(playerData.name, playerData.species);

		player._id = playerData._id;

		player.status = playerData.status;
		player.momentum.up = playerData.up;
		player.momentum.left = playerData.left;
		player.momentum.right = playerData.right;
		player.momentum.down = playerData.down;

		player.image = getPlayerIconByStatus();

		for (var attribute of gameData.attributes)
		{
			player.attributeMap.set(attribute.name, attribute.value);
			player.species.attributeMap.set(attribute.name, attribute.maxValue);
		}

		for (var statistic of gameData.statistics)
			player.statisticsMap.set(statistic.name, statistic.value);
	}

	updatePlayerIcon(player.image);

	playerIcon.style.width = (tileWidth*zoom) + "px";
	playerIcon.style.height = (tileHeight*zoom) + "px";

	// Player
	var playerSpecies = document.getElementById("playerSpecies");
	playerSpecies.src = player.species.image;
	playerSpecies.alt = player.species.type;
	document.getElementById("playerName").innerText = player.name;

	// Player Attributes
	getAttributes(document.getElementById("playerAttributes"),
			player.attributeMap, player.species.attributeMap);
}
// Uses server functions end

function getSpeciesByType(speciesType, getDefault)
{
	var species;

	switch (speciesType)
	{
		case SpeciesEnum.HUMAN:
			species = new Human();
			break;
		case SpeciesEnum.DOG:
			species = new Dog();
			break;
		case SpeciesEnum.CAT:
			species = new Cat();
			break;
		default:
			if (getDefault)
				species = new Human();
	}

	return species;
}

function updatePlayerIcon(playerImage)
{
	player.image = playerImage;
	playerIcon.src = playerImage;
}

function placePlayer()
{
	var playerTile = mapTiles.children[player.position.row].children[player.position.col];

	playerIcon.style.display = "block";
	playerIcon.style.top = playerTile.offsetTop + "px";
	playerIcon.style.left = playerTile.offsetLeft + "px";
}

function locatePlayer()
{
	jumpToLocation((playerIcon.offsetTop-(map.style.minHeight.replace("px","")/2)),
				   (playerIcon.offsetLeft-(map.style.minWidth.replace("px","")/2)));
}

function playerIsInStatus(status, direction)
{
	var playerIsInStatus = true;

	if (status != null && player.status !== status)
		playerIsInStatus = false;
	else if (direction != null)
	{
		switch (direction)
		{
			case DirectionEnum.UP:
				if (player.momentum.up === 0)
					playerIsInStatus = false;
				break;
			case DirectionEnum.LEFT:
				if (player.momentum.left === 0)
					playerIsInStatus = false;
				break;
			case DirectionEnum.RIGHT:
				if (player.momentum.right === 0)
					playerIsInStatus = false;
				break;
			case DirectionEnum.DOWN:
				if (player.momentum.down === 0)
					playerIsInStatus = false;
				break;
			default:
				playerIsInStatus = false;
		}
	}

	return playerIsInStatus;
}

function getAttributeByStatus()
{
	var attribute;
	switch (player.status)
	{
		case StatusEnum.CLIMBING:
			attribute = AttributeEnum.CLIMB;
			break;
		case StatusEnum.JUMPING:
			attribute = AttributeEnum.JUMP;
			break;
		case StatusEnum.RUNNING:
			attribute = AttributeEnum.RUN;
			break;
		case StatusEnum.SWIMMING:
			attribute = AttributeEnum.SWIM;
			break;
		case StatusEnum.DIGGING:
			attribute = AttributeEnum.DIG;
			break;
	}

	return attribute;
}

function moveUpLeft(doUpdate)
{
	var actionInfo = "";

	switch (confirmAction.innerText)
	{
		case ActionEnum.CLIMB_LEFT:
			actionInfo = climb(doUpdate);
			break;
		case ActionEnum.CLIMB_OVER:
			if (player.status === StatusEnum.SWIMMING)
				player.momentum.left = 1;
			actionInfo = climbOverOff(doUpdate);
			break;
		case ActionEnum.JUMP_LEFT:
		case ActionEnum.RISE_LEFT:
			actionInfo = jumpRiseDrift(doUpdate);
			break;
		case ActionEnum.SWIM_UP_LEFT:
			actionInfo = swim(doUpdate);
			break;
		case ActionEnum.CLIMB_OUT_LEFT:
			actionInfo = climbOut(doUpdate);
			break;
		default:
			actionInfo = "";
	}

	return actionInfo;
}

function moveUp(doUpdate)
{
	switch (confirmAction.innerText)
	{
		case ActionEnum.CLIMB_UP:
			actionInfo = climb(doUpdate);
			break;
		case ActionEnum.JUMP_UP:
		case ActionEnum.RISE_UP:
			actionInfo = jumpRiseDrift(doUpdate);
			break;
		case ActionEnum.SWIM_UP:
			actionInfo = swim(doUpdate);
			break;
		case ActionEnum.DIG_UP:
			actionInfo = dig(doUpdate);
			break;
		default:
			actionInfo = "";
	}

	return actionInfo;
}

function moveUpRight(doUpdate)
{
	var actionInfo = "";

	switch (confirmAction.innerText)
	{
		case ActionEnum.CLIMB_RIGHT:
			actionInfo = climb(doUpdate);
			break;
		case ActionEnum.CLIMB_OVER:
			if (player.status === StatusEnum.SWIMMING)
				player.momentum.right = 1;
			actionInfo = climbOverOff(doUpdate);
			break;
		case ActionEnum.JUMP_RIGHT:
		case ActionEnum.RISE_RIGHT:
			actionInfo = jumpRiseDrift(doUpdate);
			break;
		case ActionEnum.SWIM_UP_RIGHT:
			actionInfo = swim(doUpdate);
			break;
		case ActionEnum.CLIMB_OUT_RIGHT:
			actionInfo = climbOut(doUpdate);
			break;
		default:
			actionInfo = "";
	}

	return actionInfo;
}

function moveLeft(doUpdate)
{
	var actionInfo = "";

	switch (confirmAction.innerText)
	{
		case ActionEnum.DRIFT:
			actionInfo = jumpRiseDrift(doUpdate);
			break;
		case ActionEnum.LET_GO:
			actionInfo = letGo(doUpdate);
			break;
		case ActionEnum.GRAB_LEFT:
			actionInfo = grab(doUpdate);
			break;
		case ActionEnum.RUN_LEFT:
			actionInfo = run(doUpdate);
			break;
		case ActionEnum.SWIM_LEFT:
			actionInfo = swim(doUpdate);
			break;
		case ActionEnum.DIG_LEFT:
			actionInfo = dig(doUpdate);
			break;
		default:
			actionInfo = "";
	}

	return actionInfo;
}

function stayCenter(doUpdate)
{
	var actionInfo = "";

	switch (confirmAction.innerText)
	{
		case ActionEnum.STOP:
			actionInfo = stop(doUpdate);
			break;
		case ActionEnum.REST:
		case ActionEnum.FLOAT:
			actionInfo = restFloat(doUpdate);
			break;
		case ActionEnum.COLLECT:
			actionInfo = collect(doUpdate);
			break;
		default:
			actionInfo = "";
	}

	return actionInfo;
}

function moveRight(doUpdate)
{
	var actionInfo = "";

	switch (confirmAction.innerText)
	{
		case ActionEnum.DRIFT:
			actionInfo = jumpRiseDrift(doUpdate);
			break;
		case ActionEnum.LET_GO:
			actionInfo = letGo(doUpdate);
			break;
		case ActionEnum.GRAB_RIGHT:
			actionInfo = grab(doUpdate);
			break;
		case ActionEnum.RUN_RIGHT:
			actionInfo = run(doUpdate);
			break;
		case ActionEnum.SWIM_RIGHT:
			actionInfo = swim(doUpdate);
			break;
		case ActionEnum.DIG_RIGHT:
			actionInfo = dig(doUpdate);
			break;
		default:
			actionInfo = "";
	}

	return actionInfo;
}

function moveDownLeft(doUpdate)
{
	var actionInfo = "";

	switch (confirmAction.innerText)
	{
		case ActionEnum.CLIMB_OFF:
			actionInfo = climbOverOff(doUpdate);
			break;
		case ActionEnum.CLIMB_LEFT:
			actionInfo = climb(doUpdate);
			break;
		case ActionEnum.FALL_LEFT:
			actionInfo = fall(doUpdate);
			break;
		case ActionEnum.SWIM_DOWN_LEFT:
			actionInfo = swim(doUpdate);
			break;
		default:
			actionInfo = "";
	}

	return actionInfo;
}

function moveDown(doUpdate)
{
	var actionInfo = "";

	switch (confirmAction.innerText)
	{
		case ActionEnum.CLIMB_DOWN:
			actionInfo = climb(doUpdate);
			break;
		case ActionEnum.FALL_DOWN:
			actionInfo = fall(doUpdate);
			break;
		case ActionEnum.LAND:
			actionInfo = land(doUpdate);
			break;
		case ActionEnum.SPLASH:
			actionInfo = splash(doUpdate);
			break;
		case ActionEnum.SWIM_DOWN:
			actionInfo = swim(doUpdate);
			break;
		case ActionEnum.DIG_DOWN:
			actionInfo = dig(doUpdate);
			break;
		default:
			actionInfo = "";
	}

	return actionInfo;
}

function moveDownRight(doUpdate)
{
	var actionInfo = "";

	switch (confirmAction.innerText)
	{
		case ActionEnum.CLIMB_OFF:
			actionInfo = climbOverOff(doUpdate);
			break;
		case ActionEnum.CLIMB_RIGHT:
			actionInfo = climb(doUpdate);
			break;
		case ActionEnum.FALL_RIGHT:
			actionInfo = fall(doUpdate);
			break;
		case ActionEnum.SWIM_DOWN_RIGHT:
			actionInfo = swim(doUpdate);
			break;
		default:
			actionInfo = "";
	}

	return actionInfo;
}

function loseEndurance(actionName, actionInfo)
{
	var doUpdate = (actionInfo == null || actionInfo === "");
	var attributeValue = player.attributeMap.get(AttributeEnum.ENDURANCE)-1;
	if (doUpdate)
		player.attributeMap.set(AttributeEnum.ENDURANCE, attributeValue);

	if (attributeValue === 0)
	{
		attributeValue = player.attributeMap.get(AttributeEnum.HEALTH)-1;
		if (doUpdate)
			player.attributeMap.set(AttributeEnum.HEALTH, attributeValue);
		else // Get info, don't do update
		{
			actionInfo += "If you " + actionName + ", you risk ";
		
			if (attributeValue === 0)
				actionInfo += "death.\n";
			else
				actionInfo += "losing " + AttributeEnum.HEALTH + ".\n";
		}
	}
	else if (!doUpdate
		  && (actionName === ActionEnum.CLIMB_OVER
		   || actionName === ActionEnum.CLIMB_OFF
		   || actionName === ActionEnum.CLIMB_OUT_LEFT
		   || actionName === ActionEnum.CLIMB_OUT_RIGHT
		   || actionName === ActionEnum.LET_GO
		   || actionName === ActionEnum.GRAB_LEFT
		   || actionName === ActionEnum.STOP
		   || actionName === ActionEnum.GRAB_RIGHT
		   || (player.status === StatusEnum.CLIMBING
			&& (actionName === ActionEnum.DIG_UP
			 || actionName === ActionEnum.DIG_LEFT
			 || actionName === ActionEnum.DIG_RIGHT))))
		actionInfo += AttributeEnum.ENDURANCE + ": " + (attributeValue+1)
					+ " - 1 = " + attributeValue + "\n";

	return actionInfo;
}

function gainSightRecovery()
{
	// Gain Sight
	var playerAttributeValue = player.attributeMap.get(AttributeEnum.SIGHT);
	var speciesAttributeValue = player.species.attributeMap.get(AttributeEnum.SIGHT);
	if (playerAttributeValue < speciesAttributeValue)
	{
		playerAttributeValue += getRandomNumber(0, 1);
		if (player.attributeMap.get(AttributeEnum.SIGHT) < playerAttributeValue)
		{
			player.attributeMap.set(AttributeEnum.SIGHT, playerAttributeValue);

			exposeMapTiles();
		}
	}

	// Gain Recovery
	playerAttributeValue = player.attributeMap.get(AttributeEnum.RECOVERY);
	speciesAttributeValue = player.species.attributeMap.get(AttributeEnum.RECOVERY);
	if (playerAttributeValue < speciesAttributeValue)
	{
		playerAttributeValue += getRandomNumber(0, Math.ceil(speciesAttributeValue/2));
		if (playerAttributeValue > speciesAttributeValue)
			playerAttributeValue = speciesAttributeValue;
		else if (playerAttributeValue === 0
			  && player.attributeMap.get(AttributeEnum.ENDURANCE) === 0)
			playerAttributeValue++;
		player.attributeMap.set(AttributeEnum.RECOVERY, playerAttributeValue);
	}
}

function resetPlayer()
{
	player = null;

	playerIcon.style.display = "none";

	if (!document.getElementById("rememberMe").checked)
	{
		document.getElementById("name").value = "";

		resetSpecies();
	}
	else if (player != null)
		getSpecies(player.species);
	else
		resetSpecies();
}
