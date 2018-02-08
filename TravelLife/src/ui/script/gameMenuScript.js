var autoConfirm = document.getElementById("autoConfirm");

function setPlayerDetails()
{
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

function updateAutoConfirm()
{
	// Auto-Confirm
	if (autoConfirm.checked === true)
	{
		document.getElementById("confirmAction").style.display = "none";
		document.getElementById("actionLinkDetails").style.display = "none";
	}
	else // Don't Auto-Confirm
	{
		document.getElementById("confirmAction").style.display = "inline-block";
		document.getElementById("actionLinkDetails").style.display = "block";
	}
}

function checkUpLeft(row, col)
{
	var upLeftButton = document.getElementById(ActionEnum.UP_LEFT);

	//upLeftButton.innerText = "\u2196";

	upLeftButton.disabled = true;
	upLeftButton.innerText = "\u2BBE";
}

function checkUp(row, col)
{
	var upButton = document.getElementById(ActionEnum.UP);

	//upButton.innerText = "\u2191";

	upButton.disabled = true;
	upButton.innerText = "\u2BBE";
}

function checkUpRight(row, col)
{
	var upRightButton = document.getElementById(ActionEnum.UP_RIGHT);

	//upRightButton.innerText = "\u2197";

	upRightButton.disabled = true;
	upRightButton.innerText = "\u2BBE";
}

function checkLeft(row, col)
{
	var leftButton = document.getElementById(ActionEnum.LEFT);

	// If player has health, endurance, and not moving right...
	// ... and is on a tile right of a not solid tile and up-right a solid tile
	if (player.momentum.right === 0
	 && player.attributeMap.get(AttributeEnum.HEALTH) > 0
	 && player.attributeMap.get(AttributeEnum.ENDURANCE) > 0
	 && !getTileByTileType(mapTiles.children[row].children[col-1].type).solid
	 && getTileByTileType(mapTiles.children[row+1].children[col-1].type).solid)
	{
		leftButton.label = ActionEnum.RUN_LEFT;
		leftButton.innerText = "\u2190";
		leftButton.disabled = false;
	}
	else
	{
		leftButton.label = "";
		leftButton.disabled = true;
		leftButton.innerText = "\u2BBE";
	}
}

function checkCenter(row, col)
{
	var disableCenter = false;
	var centerButton = document.getElementById(ActionEnum.CENTER);

	// If player has health
	// and is on a not water tile above a solid tile
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0
	 && mapTiles.children[row].children[col].type !== TileTypeEnum.WATER
	 && getTileByTileType(mapTiles.children[row+1].children[col].type).solid)
	{
		if (playerIsMoving())
		{
			centerButton.label = ActionEnum.STOP;
			centerButton.innerText = "\u2BC3";
			centerButton.disabled = false;
		}
		else if (player.attributeMap.get(AttributeEnum.RECOVERY) > 0
			  && player.attributeMap.get(AttributeEnum.ENDURANCE)
			   < player.species.attributeMap.get(AttributeEnum.ENDURANCE))
		{
			centerButton.label = ActionEnum.REST;
			centerButton.innerText = "\u21BB";
			centerButton.disabled = false;
		}
		else
			disableCenter = true;

	}
	else
		disableCenter = true;

	if (disableCenter)
	{
		centerButton.label = "";
		centerButton.disabled = true;
		centerButton.innerText = "\u2BBE";
	}
}

function checkRight(row, col)
{
	var disableRight = false;
	var rightButton = document.getElementById(ActionEnum.RIGHT);

	// If player has health, endurance, and not moving left...
	// .. and is on a tile left of a not solid tile and up-left a solid tile
	if (player.momentum.left === 0
	 && player.attributeMap.get(AttributeEnum.HEALTH) > 0
	 && player.attributeMap.get(AttributeEnum.ENDURANCE) > 0
	 && !getTileByTileType(mapTiles.children[row].children[col+1].type).solid
	 && getTileByTileType(mapTiles.children[row+1].children[col+1].type).solid)
	{
		rightButton.label = ActionEnum.RUN_RIGHT;
		rightButton.innerText = "\u2192";
		rightButton.disabled = false;
	}
	else
	{
		rightButton.label = "";
		rightButton.disabled = true;
		rightButton.innerText = "\u2BBE";
	}
}

function checkDownLeft(row, col)
{
	var downLeftButton = document.getElementById(ActionEnum.DOWN_LEFT);

	//downLeftButton.innerText = "\u2199";

	downLeftButton.disabled = true;
	downLeftButton.innerText = "\u2BBE";
}

function checkDown(row, col)
{
	var downButton = document.getElementById(ActionEnum.DOWN);

	//downLeftButton.innerText = "\u2193";

	downButton.disabled = true;
	downButton.innerText = "\u2BBE";
}

function checkDownRight(row, col)
{
	var downRightButton = document.getElementById(ActionEnum.DOWN_RIGHT);

	//downLeftButton.innerText = "\u2198";

	downRightButton.disabled = true;
	downRightButton.innerText = "\u2BBE";
}
