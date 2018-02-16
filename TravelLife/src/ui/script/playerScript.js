var player;
var playerIcon = document.getElementById("playerIcon");

var actionFunctionMap = new Map();
actionFunctionMap.set(ActionEnum.UP_LEFT,    moveUpLeft);
actionFunctionMap.set(ActionEnum.UP,         moveUp);
actionFunctionMap.set(ActionEnum.UP_RIGHT,   moveUpRight);
actionFunctionMap.set(ActionEnum.LEFT,       moveLeft);
actionFunctionMap.set(ActionEnum.CENTER,     stayCenter);
actionFunctionMap.set(ActionEnum.RIGHT,      moveRight);
actionFunctionMap.set(ActionEnum.DOWN_LEFT,  moveDownLeft);
actionFunctionMap.set(ActionEnum.DOWN,       moveDown);
actionFunctionMap.set(ActionEnum.DOWN_RIGHT, moveDownRight);

function initPlayer()
{
	var species = document.getElementById("species");
	player = new Player(document.getElementById("name").value,
						species.options[species.selectedIndex].value);

	updatePlayerIcon(player.image);

	// Player
	var playerSpecies = document.getElementById("playerSpecies");
	playerSpecies.src = player.species.image;
	playerSpecies.alt = player.species.type;
	document.getElementById("playerName").innerText = player.name;
	document.getElementById("playerTitle").style.display = "block";

	// Player Attributes
	var playerAttributes = document.getElementById("playerAttributes");
	document.getElementById("attributeTitle").style.display = "block";
	getAttributes(document.getElementById("playerAttributes"),
			player.attributeMap, player.species.attributeMap);
}

function updatePlayerIcon(playerImage)
{
	player.image = playerImage;
	playerIcon.src = playerImage;
}

function placePlayer()
{
	exposeMapTiles();

	var playerTile = mapTiles.children[player.position.row].children[player.position.col];

	playerIcon.style.display = "block";
	playerIcon.style.top = (playerTile.offsetTop - map.offsetTop) + "px";
	playerIcon.style.left = (playerTile.offsetLeft - map.offsetLeft) + "px";
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
			case ActionEnum.UP:
				if (player.momentum.up === 0)
					playerIsInStatus = false;
				break;
			case ActionEnum.LEFT:
				if (player.momentum.left === 0)
					playerIsInStatus = false;
				break;
			case ActionEnum.RIGHT:
				if (player.momentum.right === 0)
					playerIsInStatus = false;
				break;
			case ActionEnum.DOWN:
				if (player.momentum.down === 0)
					playerIsInStatus = false;
				break;
			default:
				playerIsInStatus = false;
		}
	}

	return playerIsInStatus;
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
			actionInfo = climbOverOff(doUpdate);
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
			actionInfo = jumpRise(doUpdate);
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
			actionInfo = climbOverOff(doUpdate);
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
		case ActionEnum.LET_GO:
			actionInfo = letGo(doUpdate);
			break;
		case ActionEnum.RUN_LEFT:
			actionInfo = run(doUpdate);
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
			actionInfo = rest(doUpdate);
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
		case ActionEnum.LET_GO:
			actionInfo = letGo(doUpdate);
			break;
		case ActionEnum.RUN_RIGHT:
			actionInfo = run(doUpdate);
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
		case ActionEnum.FALL:
			actionInfo = fall(doUpdate);
			break;
		case ActionEnum.LAND:
			actionInfo = land(doUpdate);
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
				actionInfo += "death.";
			else
				actionInfo += "losing " + AttributeEnum.HEALTH + ".";
		}
	}
	else if (!doUpdate
		  && (actionName === ActionEnum.CLIMB_OVER
		   || actionName === ActionEnum.CLIMB_OFF
		   || actionName === ActionEnum.STOP
		   || actionName === ActionEnum.LET_GO))
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
		player.attributeMap.set(AttributeEnum.SIGHT, playerAttributeValue);

		exposeMapTiles();
	}

	// Gain Recovery
	playerAttributeValue = player.attributeMap.get(AttributeEnum.RECOVERY);
	speciesAttributeValue = player.species.attributeMap.get(AttributeEnum.RECOVERY);
	if (playerAttributeValue < speciesAttributeValue)
	{
		playerAttributeValue += getRandomNumber(0, Math.ceil(speciesAttributeValue/2));
		if (playerAttributeValue > speciesAttributeValue)
			playerAttributeValue = speciesAttributeValue;
		player.attributeMap.set(AttributeEnum.RECOVERY, playerAttributeValue);
	}
}

function resetPlayer()
{
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
