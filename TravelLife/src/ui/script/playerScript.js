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

	setPlayerDetails();	
}

function updatePlayerIcon(playerIcon)
{
	player.image = playerIcon;
	document.getElementById("playerIcon").src = playerIcon;
}

function placePlayer()
{
	exposeMapTiles();

	var playerTile = mapTiles.children[player.position.row].children[player.position.col];

	var map = document.getElementById("map");
	var playerIcon = document.getElementById("playerIcon");
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
				playerIsInStatus = false
		}
	}

	return playerIsInStatus;
}

function moveUpLeft(actionLabel, doUpdate)
{
	var actionInfo = "";

	if (actionLabel === ActionEnum.CLIMB_LEFT)
		actionInfo = climb(ActionEnum.LEFT, doUpdate);
	else if (actionLabel === ActionEnum.CLIMB_OVER)
		actionInfo = climbOverOff(ActionEnum.CLIMB_OVER, ActionEnum.LEFT, doUpdate);

	return actionInfo;
}

function moveUp(actionLabel, doUpdate)
{
	var actionInfo = "";

	if (actionLabel === ActionEnum.CLIMB_UP)
		actionInfo = climb(ActionEnum.UP, doUpdate);

	return actionInfo;
}

function moveUpRight(actionLabel, doUpdate)
{
	var actionInfo = "";

	if (actionLabel === ActionEnum.CLIMB_RIGHT)
		actionInfo = climb(ActionEnum.RIGHT, doUpdate);
	else if (actionLabel === ActionEnum.CLIMB_OVER)
		actionInfo = climbOverOff(ActionEnum.CLIMB_OVER, ActionEnum.RIGHT, doUpdate);

	return actionInfo;
}

function moveLeft(actionLabel, doUpdate)
{
	var actionInfo = "";

	if (actionLabel === ActionEnum.LET_GO)
		actionInfo = letGo(doUpdate);
	else if (actionLabel === ActionEnum.RUN_LEFT)
		actionInfo = run(ActionEnum.LEFT, doUpdate);

	return actionInfo;
}

function stayCenter(actionLabel, doUpdate)
{
	var actionInfo = "";

	if (actionLabel === ActionEnum.STOP)
		actionInfo = stop(doUpdate);
	else if (actionLabel === ActionEnum.REST)
		actionInfo = rest(doUpdate);

	return actionInfo;
}

function moveRight(actionLabel, doUpdate)
{
	var actionInfo = "";

	if (actionLabel === ActionEnum.LET_GO)
		actionInfo = letGo(doUpdate);
	else if (actionLabel === ActionEnum.RUN_RIGHT)
		actionInfo = run(ActionEnum.RIGHT, doUpdate);

	return actionInfo;
}

function moveDownLeft(actionLabel, doUpdate)
{
	var actionInfo = "";

	if (actionLabel === ActionEnum.CLIMB_OFF)
		actionInfo = climbOverOff(ActionEnum.CLIMB_OFF, ActionEnum.LEFT, doUpdate);

	return actionInfo;
}

function moveDown(actionLabel, doUpdate)
{
	var actionInfo = "";

	if (actionLabel === ActionEnum.FALL)
		actionInfo = fall(doUpdate);
	else if (actionLabel === ActionEnum.CLIMB_DOWN)
		actionInfo = climb(ActionEnum.DOWN, doUpdate);

	return actionInfo;
}

function moveDownRight(actionLabel, doUpdate)
{
	var actionInfo = "";

	if (actionLabel === ActionEnum.CLIMB_OFF)
		actionInfo = climbOverOff(ActionEnum.CLIMB_OFF, ActionEnum.RIGHT, doUpdate);
	else if (actionLabel === ActionEnum.FALL)
		actionInfo = fall(doUpdate);

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
	else if (!doUpdate && actionName === ActionEnum.STOP)
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
	document.getElementById("playerIcon").style.display = "none";

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
