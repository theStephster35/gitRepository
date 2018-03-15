var openNavLink;

var upLeftButton = document.getElementById(ActionEnum.UP_LEFT);
var upButton = document.getElementById(ActionEnum.UP);
var upRightButton = document.getElementById(ActionEnum.UP_RIGHT);
var leftButton = document.getElementById(ActionEnum.LEFT);
var centerButton = document.getElementById(ActionEnum.CENTER);
var rightButton = document.getElementById(ActionEnum.RIGHT);
var downLeftButton = document.getElementById(ActionEnum.DOWN_LEFT);
var downButton = document.getElementById(ActionEnum.DOWN);
var downRightButton	= document.getElementById(ActionEnum.DOWN_RIGHT);

var autoConfirm = document.getElementById("autoConfirm");

function showHideMenu()
{
	var navMenu = document.getElementById("navMenu");

	// Hide Menu
	if (navMenu.style.display === ""
	 || navMenu.style.display === "flex")
		navMenu.style.display = "none";
	else // Show Menu
		navMenu.style.display = "flex";

	adjustMapContents();
}

function openMenu(navLink)
{
	if (openNavLink != null)
	{
		var closeNavLink = openNavLink.id;
		if (navLink === closeNavLink)
			return;

		getMenuByNavLink(closeNavLink).style.display = "none";
		openNavLink.className = openNavLink.className.replace(" open", "");
	}

	getMenuByNavLink(navLink).style.display = "inline-block";
	openNavLink = document.getElementById(navLink);
	openNavLink.className += " open";

	// Get updated attributes/stats
	switch (openNavLink.id)
	{
		case MenuEnum.HOME:
			if (gameOn)
				getAttributes(document.getElementById("playerAttributes"),
						player.attributeMap, player.species.attributeMap);
			break;
		case MenuEnum.STATS:
			getStatistics();
			break;
	}
}

function getMenuByNavLink(navLink)
{
	var menu;

	switch (navLink)
	{
		case MenuEnum.HOME:
			menu = (gameOn ? MenuEnum.GAME_MENU : MenuEnum.START_MENU);
			break;
		case MenuEnum.STATS:
			menu = MenuEnum.STATS_MENU;
			break;
		case MenuEnum.SETTINGS:
			menu = MenuEnum.SETTINGS_MENU;
			break;
		default:
			if (openNavLink != null && openNavLink.id !== MenuEnum.HOME)
				menu = openNavLink.id;
			else
				menu = (gameOn ? MenuEnum.GAME_MENU : MenuEnum.START_MENU);
	}

	return document.getElementById(menu);
}

function startEndGame(event)
{
	var startMenu = document.getElementById(MenuEnum.START_MENU);
	var gameMenu = document.getElementById(MenuEnum.GAME_MENU);

	// Start game
	if (!gameOn)
	{
		startMenu.style.display = "none";
		gameMenu.style.display = "inline-block";

		initGame();
	}
	else if (player.attributeMap.get(AttributeEnum.HEALTH) === 0
		  || confirm("Are you sure you want to give up?"))
	{
		startMenu.style.display = "inline-block";
		gameMenu.style.display = "none";

		endGame();
	}

	if (event != null)
		event.preventDefault();
}

function showHideDetails(details)
{
	var infoLink = document.getElementById(details + "Link");

	if (infoLink != null)
	{
		var detailsDisplay = "";

		switch (details)
		{
			case MenuEnum.SPECIES:
				detailsDisplay = "Species ";
				break;
			case MenuEnum.ATTRIBUTE:
				detailsDisplay = "Attribute ";
				break;
			case MenuEnum.ACTION:
				detailsDisplay = "Action ";
				break;
			case MenuEnum.GAME_STATS:
				detailsDisplay = "Game Stats ";
				break;
			case MenuEnum.PLAYER_STATS:
				detailsDisplay = "Player Stats ";
				break;
		}

		// Hide Details
		if (infoLink.innerText === "\u25BC Hide " + detailsDisplay + "Details")
		{
			infoLink.innerText = "\u25BA Show " + detailsDisplay + "Details";
			document.getElementById(details + "Details").style.display = "none";
		}
		else // Show Details
		{
			infoLink.innerText = "\u25BC Hide " + detailsDisplay + "Details";
			document.getElementById(details + "Details").style.display = "block";
		}
	}
}

function getSpecies()
{
	var species = document.getElementById("species");

	var speciesType = getSpeciesByType(species.options[species.selectedIndex].value);
	if (speciesType == null)
		resetSpecies(species);
	else
		setSpeciesDetails(speciesType);
}

function setSpeciesDetails(species)
{
	// Species
	var speciesImage = document.getElementById("speciesImage");
	speciesImage.src = species.image;
	speciesImage.alt = species.type;
	document.getElementById("speciesLabel").innerText = species.type;
	document.getElementById("speciesTitle").style.display = "block";

	// Species Attributes
	document.getElementById("speciesInfo").innerText =
		species.description + "\n\n" + "Starting Attributes:";
	getAttributes(document.getElementById("speciesAttributes"), species.attributeMap);
}

function resetSpecies(species)
{
	if (species == null)
		species = document.getElementById("species");
	species.selectedIndex = 0;

	document.getElementById("speciesTitle").style.display = "none";

	document.getElementById("speciesInfo").innerText = "Select a species to get information.";

	document.getElementById("speciesAttributes").innerHTML = "";
}

function getAttributes(attributeTable, playerAttributeMap, speciesAttributeMap)
{
	attributeTable.innerHTML = "";
	for (var label of playerAttributeMap.keys())
	{
		var playerData = playerAttributeMap.get(label);
		if (speciesAttributeMap != null && speciesAttributeMap.has(label))
			attributeTable.appendChild(createTableData(label,
					playerData, speciesAttributeMap.get(label)));
		else
			attributeTable.appendChild(createTableData(label, playerData));
	}
}

function createTableData(label, playerData, speciesData)
{
	var attribute = document.createElement("tr");

	var color = "rgb(0, 0, 0)";
	if (speciesData != null)
		color = "rgb(" + (255-((playerData/speciesData)*255)) + ", 0, 0)";

	// Label
	var tableLabelData = document.createElement("td");
	tableLabelData.innerText = label + ":";
	tableLabelData.style.color = color;
	attribute.appendChild(tableLabelData);

	// Data
	tableLabelData = document.createElement("td");
	tableLabelData.style.textAlign = "right";
	tableLabelData.innerText = playerData;
	tableLabelData.style.color = color;
	attribute.appendChild(tableLabelData);

	if (speciesData != null)
	{
		tableLabelData = document.createElement("td");
		tableLabelData.innerText = " / ";
		attribute.appendChild(tableLabelData);

		tableLabelData = document.createElement("td");
		tableLabelData.style.textAlign = "right";
		tableLabelData.innerText = speciesData;
		attribute.appendChild(tableLabelData);
	}

	return attribute;
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
	disableButton(upLeftButton);

	// If player has health
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0)
	{
		// If player is swimming and is on a tile down-right a water tile
		if (playerIsInStatus(AttributeEnum.SWIM)
		 && getTileByPosition((row-1), (col-1)).type === TileTypeEnum.WATER)
		{
			// If player is on a tile below or right of a water tile
			if (getTileByPosition((row-1), col).type === TileTypeEnum.WATER
			 || getTileByPosition(row, (col-1)).type === TileTypeEnum.WATER)
			{
				upLeftButton.label = ActionEnum.SWIM_UP_LEFT;
				upLeftButton.innerText = "\u2196";
				upLeftButton.disabled = false;
			}
		}
		else if (player.attributeMap.get(AttributeEnum.ENDURANCE) > 0)
		{
			// If player has endurance...
			// ... and is not moving
			if (playerIsInStatus(ActionEnum.STOP))
			{
				// If player is on a tile right of a solid tile
				if (getTileByPosition(row, (col-1)).solid)
				{
					upLeftButton.label = ActionEnum.CLIMB_LEFT;
					upLeftButton.innerText = "\u2B11";
					upLeftButton.disabled = false;
				}
				else if (!getTileByPosition((row-1), (col-1)).solid
					  && (!getTileByPosition((row-1), col).solid
					   || !getTileByPosition(row, (col-1)).solid))
				{
					// If player is on a tile down-right a not solid tile...
					// ... and below or right of a not solid tile
					upLeftButton.label = ActionEnum.JUMP_LEFT;
					upLeftButton.innerText = "\u21B6";
					upLeftButton.disabled = false;
				}
			}
			else if (playerIsInStatus(AttributeEnum.SWIM))
			{
				// ... and is swimming
				// If player is on a tile below a not solid/water tile
				var aboveTile = getTileByPosition((row-1), col);
				if (!aboveTile.solid
				 && aboveTile.type !== TileTypeEnum.WATER)
				{
					// If player is on a tile down-right a solid tile
					if (getTileByPosition((row-1), (col-1)).solid)
					{
						upLeftButton.label = ActionEnum.CLIMB_OUT_LEFT;
						upLeftButton.innerText = "\u2923";
						upLeftButton.disabled = false;
					}
					else if (getTileByPosition(row, (col-1)).solid)
					{
						// If player is on a tile right of a solid tile
						upLeftButton.label = ActionEnum.CLIMB_OVER;
						upLeftButton.innerText = "\u21B0";
						upLeftButton.disabled = false;
					}
				}
			}
			else if (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.LEFT))
			{
				// ... and is climbing left
				// If player is on a tile below and down-right a not solid tile
				if (!getTileByPosition((row-1), col).solid
				 && !getTileByPosition((row-1), (col-1)).solid)
				{
					upLeftButton.label = ActionEnum.CLIMB_OVER;
					upLeftButton.innerText = "\u21B0";
					upLeftButton.disabled = false;
				}
			}
			if (!getTileByPosition((row-1), (col-1)).solid)
			{
				// ... and is on a tile below and down-right a not solid tile
				// If player is climbing right or running left
				if (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.RIGHT)
				 || playerIsInStatus(AttributeEnum.RUN, ActionEnum.LEFT))
				{
					// If player is on a tile below or right of a not solid tile
					if (!getTileByPosition((row-1), col).solid
					 || !getTileByPosition(row, (col-1)).solid)
					{
						upLeftButton.label = ActionEnum.JUMP_LEFT;
						upLeftButton.innerText = "\u21B6";
						upLeftButton.disabled = false;
					}
				}
				else if (playerIsInStatus(AttributeEnum.JUMP, ActionEnum.LEFT)
					  && (!getTileByPosition((row-1), col).solid
					   || !getTileByPosition(row, (col-1)).solid))
				{
					// ... and is jumping left on a tile below or right of a not solid tile
					upLeftButton.label = ActionEnum.RISE_LEFT;
					upLeftButton.innerText = "\u21D6";
					upLeftButton.disabled = false;
				}
			}
		}
	}
}

function checkUp(row, col)
{
	disableButton(upButton);

	// If player has health
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0)
	{
		// If player is on a tile below a not solid tile
		if (!getTileByPosition((row-1), col).solid)
		{
			// If player is swimming
			if (playerIsInStatus(AttributeEnum.SWIM))
			{
				// If player is on a tile below a water tile
				if (getTileByPosition((row-1), col).type === TileTypeEnum.WATER)
				{
					upButton.label = ActionEnum.SWIM_UP;
					upButton.innerText = "\u2191";
					upButton.disabled = false;
				}
			}
			else if (player.attributeMap.get(AttributeEnum.ENDURANCE) > 0)
			{
				// If player has endurance...
				// If player is not moving or is running
				if (playerIsInStatus(ActionEnum.STOP)
				 || playerIsInStatus(AttributeEnum.RUN))
				{
					// If player is on a tile above a solid tile
					if (getTileByPosition((row+1), col).solid)
					{
						upButton.label = ActionEnum.JUMP_UP;
						upButton.innerText = "\u21A5";
						upButton.disabled = false;
					}
				}
				else if (playerIsInStatus(AttributeEnum.JUMP, ActionEnum.UP))
				{
					// ... and is jumping up
					upButton.label = ActionEnum.RISE_UP;
					upButton.innerText = "\u21D1";
					upButton.disabled = false;
				}
				else if (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.LEFT)
					  && getTileByPosition((row-1), (col-1)).solid)
				{
					// ... and is climbing left on a tile down-right a solid tile
					upButton.label = ActionEnum.CLIMB_UP;
					upButton.innerText = "\u21BE";
					upButton.disabled = false;
				}
				else if (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.RIGHT)
					  && getTileByPosition((row-1), (col+1)).solid)
				{
					// ... and is climbing right on a tile down-left a solid tile
					upButton.label = ActionEnum.CLIMB_UP;
					upButton.innerText = "\u21BF";
					upButton.disabled = false;
				}
			}
		}
		else if (getTileByPosition((row-1), col).durability > 0)
		{
			// Player is on a tile below a tile with durability
			// ... and is climbing
			if (playerIsInStatus(AttributeEnum.CLIMB))
			{
				upButton.label = ActionEnum.DIG_UP;
				upButton.innerText = "\u234F";
				upButton.disabled = false;
			}
		}
	}
}

function checkUpRight(row, col)
{
	disableButton(upRightButton);


	// If player has health
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0)
	{
		// If player is swimming and is on a tile down-left a water tile
		if (playerIsInStatus(AttributeEnum.SWIM)
		 && getTileByPosition((row-1), (col+1)).type === TileTypeEnum.WATER)
		{
			// If player is on a tile below or left of a water tile
			if (getTileByPosition((row-1), col).type === TileTypeEnum.WATER
			 || getTileByPosition(row, (col+1)).type === TileTypeEnum.WATER)
			{
				upRightButton.label = ActionEnum.SWIM_UP_RIGHT;
				upRightButton.innerText = "\u2197";
				upRightButton.disabled = false;
			}
		}
		else if (player.attributeMap.get(AttributeEnum.ENDURANCE) > 0)
		{
			// If player has endurance...
			// ... and is not moving
			if (playerIsInStatus(ActionEnum.STOP))
			{
				// If player is on a tile left of a solid tile
				if (getTileByPosition(row, (col+1)).solid)
				{
					upRightButton.label = ActionEnum.CLIMB_RIGHT;
					upRightButton.innerText = "\u2B0F";
					upRightButton.disabled = false;
				}
				else if (!getTileByPosition((row-1), (col+1)).solid
					  && (!getTileByPosition((row-1), col).solid
					   || !getTileByPosition(row, (col+1)).solid))
				{
					// If player is on a tile down-left a not solid tile...
					// ... and below or left of a not solid tile
					upRightButton.label = ActionEnum.JUMP_RIGHT;
					upRightButton.innerText = "\u21B7";
					upRightButton.disabled = false;
				}
			}
			else if (playerIsInStatus(AttributeEnum.SWIM))
			{
				// ... and is swimming
				// If player is on a tile below a not solid/water tile
				var aboveTile = getTileByPosition((row-1), col);
				if (!aboveTile.solid
				 && aboveTile.type !== TileTypeEnum.WATER)
				{
					// If player is on a tile down-left a solid tile
					if (getTileByPosition((row-1), (col+1)).solid)
					{
						upRightButton.label = ActionEnum.CLIMB_OUT_RIGHT;
						upRightButton.innerText = "\u2924";
						upRightButton.disabled = false;
					}
					else if (getTileByPosition(row, (col+1)).solid)
					{
						// If player is on a tile left of a solid tile
						upRightButton.label = ActionEnum.CLIMB_OVER;
						upRightButton.innerText = "\u21B1";
						upRightButton.disabled = false;
					}
				}
			}
			else if (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.RIGHT))
			{
				// ... and is climbing right
				// If player is on a tile below and down-left a not solid tile
				if (!getTileByPosition((row-1), col).solid
				 && !getTileByPosition((row-1), (col+1)).solid)
				{
					upRightButton.label = ActionEnum.CLIMB_OVER;
					upRightButton.innerText = "\u21B1";
					upRightButton.disabled = false;
				}
			}
			if (!getTileByPosition((row-1), (col+1)).solid)
			{
				// ... and is on a tile below and down-left a not solid tile
				// If player is climbing left or running right
				if (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.LEFT)
				 || playerIsInStatus(AttributeEnum.RUN, ActionEnum.RIGHT))
				{
					// If player is on a tile below or right of a not solid tile
					if (!getTileByPosition((row-1), col).solid
					 || !getTileByPosition(row, (col+1)).solid)
					{
						upRightButton.label = ActionEnum.JUMP_RIGHT;
						upRightButton.innerText = "\u21B7";
						upRightButton.disabled = false;
					}
				}
				else if (playerIsInStatus(AttributeEnum.JUMP, ActionEnum.RIGHT)
					  && (!getTileByPosition((row-1), col).solid
					   || !getTileByPosition(row, (col+1)).solid))
				{
					// ... and is jumping right on a tile below or left of a not solid tile
					upRightButton.label = ActionEnum.RISE_RIGHT;
					upRightButton.innerText = "\u21D7";
					upRightButton.disabled = false;
				}
			}
		}
	}
}

function checkLeft(row, col)
{
	disableButton(leftButton);

	// If player has health
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0)
	{
		// If player is falling
		if (playerIsInStatus(ActionEnum.FALL_DOWN))
		{
			// If player is on a tile right of a solid tile
			if (getTileByPosition(row, (col-1)).solid)
			{
				leftButton.label = ActionEnum.GRAB_LEFT;
				leftButton.innerText = "\u21E4";
				leftButton.disabled = false;
			}
		}
		else if (playerIsInStatus(AttributeEnum.SWIM))
		{
			// If player is swimming...
			// ... and is on a tile right of a water tile
			if (getTileByPosition(row, (col-1)).type === TileTypeEnum.WATER)
			{
				leftButton.label = ActionEnum.SWIM_LEFT;
				leftButton.innerText = "\u2190";
				leftButton.disabled = false;
			}
		}
		else if (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.RIGHT))
		{
			// If player is climbing right
			leftButton.label = ActionEnum.LET_GO;
			leftButton.innerText = "\u21A9";
			leftButton.disabled = false;
		}
		else if (playerIsInStatus(AttributeEnum.JUMP, ActionEnum.LEFT))
		{
			// If player is jumping left...
			// ... and is on a tile right of a not solid tile
			if (!getTileByPosition(row, (col-1)).solid)
			{
				leftButton.label = ActionEnum.DRIFT;
				leftButton.innerText = "\u21D0";
				leftButton.disabled = false;
			}
		}
		else if (player.attributeMap.get(AttributeEnum.ENDURANCE) > 0)
		{
			// If player has endurance...
			// ... and is not moving or is digging/climbing left...
			// ... and is on a tile right of a tile with durability
			if ((playerIsInStatus(ActionEnum.STOP)
			  || playerIsInStatus(AttributeEnum.DIG, ActionEnum.LEFT)
			  || playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.LEFT))
			 && getTileByPosition(row, (col-1)).durability > 0)
			{
				leftButton.label = ActionEnum.DIG_LEFT;
				leftButton.innerText = "\u2345";
				leftButton.disabled = false;
			}
			else if ((playerIsInStatus(ActionEnum.STOP)
				   || playerIsInStatus(AttributeEnum.RUN, ActionEnum.LEFT))
				  && !getTileByPosition(row, (col-1)).solid
				  && getTileByPosition((row+1), (col-1)).solid)
			{
				// ... and is not moving or is running left...
				// ... and is on a tile right of a not solid tile and up-right a solid tile
				leftButton.label = ActionEnum.RUN_LEFT;
				leftButton.innerText = "\u21A4";
				leftButton.disabled = false;
			}
		}
	}
}

function checkCenter(row, col)
{
	disableButton(centerButton);

	// If player has health
	var playerHealth = player.attributeMap.get(AttributeEnum.HEALTH);
	if (playerHealth > 0)
	{
		var playerRecovery = player.attributeMap.get(AttributeEnum.RECOVERY);
		var playerEndurance = player.attributeMap.get(AttributeEnum.ENDURANCE);
		var speciesEndurance = player.species.attributeMap.get(AttributeEnum.ENDURANCE);

		var treasureTile;
		if (treasureMap.has(row) && treasureMap.get(row).has(col))
			treasureTile = treasureMap.get(row).get(col);

		// If player is on a tile with a treasure (and needs it)
		if (treasureTile != null
		 && (treasureTile.attribute == null
		  || ((treasureTile.attribute === AttributeEnum.HEALTH
			&& playerHealth
			 < player.species.attributeMap.get(AttributeEnum.HEALTH))
		   || (treasureTile.attribute === AttributeEnum.SIGHT
			&& player.attributeMap.get(AttributeEnum.SIGHT)
			 < player.species.attributeMap.get(AttributeEnum.SIGHT))
		   || (treasureTile.attribute === AttributeEnum.RECOVERY
		   	&& playerRecovery
		   	 < player.species.attributeMap.get(AttributeEnum.RECOVERY))
		   || (treasureTile.attribute === AttributeEnum.ENDURANCE
			&& playerEndurance < speciesEndurance))))
		{
			// Player can collect treasure
			centerButton.label = ActionEnum.COLLECT;
			centerButton.innerText = "\u27E1";
			centerButton.disabled = false;
		}
		else if (playerIsInStatus(AttributeEnum.JUMP))
		{
			// If player is jumping
			centerButton.label = ActionEnum.STOP;
			centerButton.innerText = "\u2B1C";
			centerButton.disabled = false;
		}
		else if (playerIsInStatus(AttributeEnum.RUN))
		{
			// If player is running
			centerButton.label = ActionEnum.STOP;
			centerButton.innerText = "\u2B1B";
			centerButton.disabled = false;
		}
		else if (playerIsInStatus(AttributeEnum.DIG))
		{
			// If player is digging
			centerButton.label = ActionEnum.STOP;
			centerButton.innerText = "\u229E";
			centerButton.disabled = false;
		}
		else if (playerRecovery > 0
			  && playerEndurance < speciesEndurance)
		{
			// If player has recovery and not max endurance...
			// ... and is not moving
			if (playerIsInStatus(ActionEnum.STOP))
			{
				centerButton.label = ActionEnum.REST;
				centerButton.innerText = "\u21BB";
				centerButton.disabled = false;
			}
			else if (playerIsInStatus(AttributeEnum.SWIM))
			{
				// ... and is swimming
				// If player is on a tile below a not solid/water tile
				var aboveTile = getTileByPosition((row-1), col);
				if (!aboveTile.solid
				 && aboveTile.type !== TileTypeEnum.WATER)
				{
					centerButton.label = ActionEnum.FLOAT;
					centerButton.innerText = "\u23D4";
					centerButton.disabled = false;
				}
			}
		}
	}
}

function checkRight(row, col)
{
	disableButton(rightButton);

	// If player has health
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0)
	{
		// If player is falling
		if (playerIsInStatus(ActionEnum.FALL_DOWN))
		{
			// If player is on a tile left of a solid tile
			if (getTileByPosition(row, (col+1)).solid)
			{
				rightButton.label = ActionEnum.GRAB_RIGHT;
				rightButton.innerText = "\u21E5";
				rightButton.disabled = false;
			}
		}
		else if (playerIsInStatus(AttributeEnum.SWIM))
		{
			// If player is swimming...
			// ... and is on a tile left of a water tile
			if (getTileByPosition(row, (col+1)).type === TileTypeEnum.WATER)
			{
				rightButton.label = ActionEnum.SWIM_RIGHT;
				rightButton.innerText = "\u2192";
				rightButton.disabled = false;
			}
		}
		else if (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.LEFT))
		{
			// If player is climbing left
			rightButton.label = ActionEnum.LET_GO;
			rightButton.innerText = "\u21AA";
			rightButton.disabled = false;
		}
		else if (playerIsInStatus(AttributeEnum.JUMP, ActionEnum.RIGHT))
		{
			// If player is jumping right...
			// ... and is on a tile left of a not solid tile
			if (!getTileByPosition(row, (col+1)).solid)
			{
				rightButton.label = ActionEnum.DRIFT;
				rightButton.innerText = "\u21D2";
				rightButton.disabled = false;
			}
		}
		else if (player.attributeMap.get(AttributeEnum.ENDURANCE) > 0)
		{
			// If player has endurance...
			// ... and is not moving or is digging/climbing right...
			// ... and is on a tile left of a tile with durability
			if ((playerIsInStatus(ActionEnum.STOP)
			  || playerIsInStatus(AttributeEnum.DIG, ActionEnum.RIGHT)
			  || playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.RIGHT))
			 && getTileByPosition(row, (col+1)).durability > 0)
			{
				rightButton.label = ActionEnum.DIG_RIGHT;
				rightButton.innerText = "\u2346";
				rightButton.disabled = false;
			}
			else if ((playerIsInStatus(ActionEnum.STOP)
				   || playerIsInStatus(AttributeEnum.RUN, ActionEnum.RIGHT))
				  && !getTileByPosition(row, (col+1)).solid
				  && getTileByPosition((row+1), (col+1)).solid)
			{
				// ... and is not moving or is running right...
				// ... and is on a tile left of a not solid tile and up-left a solid tile
				rightButton.label = ActionEnum.RUN_RIGHT;
				rightButton.innerText = "\u21A6";
				rightButton.disabled = false;
			}
		}
	}
}

function checkDownLeft(row, col)
{
	disableButton(downLeftButton);

	// If player has health
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0)
	{
		// If player is falling left
		if (playerIsInStatus(ActionEnum.FALL_DOWN, ActionEnum.LEFT))
		{
			// If player is on a tile up-right a not solid/water tile...
			// ... and right of or above a not solid tile
			var downLeftTile = getTileByPosition((row+1), (col-1));
			if (!downLeftTile.solid
			 && downLeftTile.type !== TileTypeEnum.WATER
			 && (!getTileByPosition((row+1), col).solid
			  || !getTileByPosition(row, (col-1)).solid))
			{
				downLeftButton.label = ActionEnum.FALL_LEFT;
				downLeftButton.innerText = "\u21D9";
				downLeftButton.disabled = false;
			}
		}
		else if (playerIsInStatus(AttributeEnum.SWIM))
		{
			// ... and is swimming
			// If player is on a tile up-right a water tile, and right of or above a water tile
			if (getTileByPosition((row+1), (col-1)).type === TileTypeEnum.WATER
			 && (getTileByPosition((row+1), col).type === TileTypeEnum.WATER
			  || getTileByPosition(row, (col-1)).type === TileTypeEnum.WATER))
			{
				downLeftButton.label = ActionEnum.SWIM_DOWN_LEFT;
				downLeftButton.innerText = "\u2199";
				downLeftButton.disabled = false;
			}
		}
		else if (player.attributeMap.get(AttributeEnum.ENDURANCE) > 0)
		{
			// If player has endurance...
			// ... and is not moving
			if (playerIsInStatus(ActionEnum.STOP))
			{
				// If player is on a tile right and up-right a not solid tile
				if (!getTileByPosition(row, (col-1)).solid
				 && !getTileByPosition((row+1), (col-1)).solid)
				{
					downLeftButton.label = ActionEnum.CLIMB_LEFT;
					downLeftButton.innerText = "\u2B10";
					downLeftButton.disabled = false;
				}
			}
			else if (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.RIGHT)
				  && getTileByPosition((row+1), col).solid)
			{
				// ... and is climbing right on a tile above a solid tile
				downLeftButton.label = ActionEnum.CLIMB_OFF;
				downLeftButton.innerText = "\u21B2";
				downLeftButton.disabled = false;
			}
		}
	}
}

function checkDown(row, col)
{
	disableButton(downButton);

	// If player has health
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0)
	{
		// If player is falling
		if (playerIsInStatus(ActionEnum.FALL_DOWN))
		{
			// If player is on a tile above a solid tile
			if (getTileByPosition((row+1), col).solid)
			{
				downButton.label = ActionEnum.LAND;
				downButton.innerText = "\u2913";
			}
			else if (getTileByPosition((row+1), col).type === TileTypeEnum.WATER)
			{
				// If player is on a tile above a water tile...
				downButton.label = ActionEnum.SPLASH;
				downButton.innerText = "\u297F";
			}
			else // Player is on a tile above a not solid tile
			{
				downButton.label = ActionEnum.FALL_DOWN;
				downButton.innerText = "\u21D3";
			}

			downButton.disabled = false;
		}
		else if (playerIsInStatus(AttributeEnum.SWIM))
		{
			// If player is swimming...
			// ... and is on a tile above a water tile
			if (getTileByPosition((row+1), col).type === TileTypeEnum.WATER)
			{
				downButton.label = ActionEnum.SWIM_DOWN;
				downButton.innerText = "\u2193";
				downButton.disabled = false;
			}
		}
		else if (!getTileByPosition((row+1), col).solid
			  && getTileByPosition((row+1), col).type !== TileTypeEnum.WATER)
		{
			// If player is on a tile above a not solid/water tile
			// ... and is climbing left on a tile up-right a solid tile
			if (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.LEFT)
			 && getTileByPosition((row+1), (col-1)).solid)
			{
				downButton.label = ActionEnum.CLIMB_DOWN;
				downButton.innerText = "\u21C2";
				downButton.disabled = false;
			}
			else if (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.RIGHT)
				  && getTileByPosition((row+1), (col+1)).solid)
			{
				// ... and is climbing right on a tile up-left a solid tile
				downButton.label = ActionEnum.CLIMB_DOWN;
				downButton.innerText = "\u21C3";
				downButton.disabled = false;
			}
		}
		else if (player.attributeMap.get(AttributeEnum.ENDURANCE) > 0)
		{
			// If player has endurance...
			// ... and is digging down or not moving above a tile with durability
			if (playerIsInStatus(AttributeEnum.DIG, ActionEnum.DOWN)
			 || (playerIsInStatus(ActionEnum.STOP)
			  && getTileByPosition((row+1), col).durability > 0))
			{
				downButton.label = ActionEnum.DIG_DOWN;
				downButton.innerText = "\u2356";
				downButton.disabled = false;
			}
		}
	}
}

function checkDownRight(row, col)
{
	disableButton(downRightButton);

	// If player has health
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0)
	{
		// If player is falling right
		if (playerIsInStatus(ActionEnum.FALL_DOWN, ActionEnum.RIGHT))
		{
			// If player is on a tile up-left a not solid/water tile...
			// ... and left of or above a not solid tile
			var downRightTile = getTileByPosition((row+1), (col+1));
			if (!downRightTile.solid
			 && downRightTile.type !== TileTypeEnum.WATER
			 && (!getTileByPosition((row+1), col).solid
			  || !getTileByPosition(row, (col+1)).solid))
			{
				downRightButton.label = ActionEnum.FALL_RIGHT;
				downRightButton.innerText = "\u21D8";
				downRightButton.disabled = false;
			}
		}
		else if (playerIsInStatus(AttributeEnum.SWIM))
		{
			// ... and is swimming
			// If player is on a tile up-left a water tile, and left of or above a water tile
			if (getTileByPosition((row+1), (col+1)).type === TileTypeEnum.WATER
			 && (getTileByPosition((row+1), col).type === TileTypeEnum.WATER
			  || getTileByPosition(row, (col+1)).type === TileTypeEnum.WATER))
			{
				downRightButton.label = ActionEnum.SWIM_DOWN_RIGHT;
				downRightButton.innerText = "\u2198";
				downRightButton.disabled = false;
			}
		}
		else if (player.attributeMap.get(AttributeEnum.ENDURANCE) > 0)
		{
			// If player has endurance...
			// ... and is not moving
			if (playerIsInStatus(ActionEnum.STOP))
			{
				// If player is on a tile left and up-left a not solid tile
				if (!getTileByPosition(row, (col+1)).solid
				 && !getTileByPosition((row+1), (col+1)).solid)
				{
					downRightButton.label = ActionEnum.CLIMB_RIGHT;
					downRightButton.innerText = "\u2B0E";
					downRightButton.disabled = false;
				}
			}
			else if (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.LEFT)
				  && getTileByPosition((row+1), col).solid)
			{
				// ... and is climbing left on a tile above a solid tile
				downRightButton.label = ActionEnum.CLIMB_OFF;
				downRightButton.innerText = "\u21B3";
				downRightButton.disabled = false;
			}
		}
	}
}

function disableButton(button)
{
	button.label = "";
	button.disabled = true;
	button.innerText = "\u2BBE";
}

function getStatistics()
{
	var statsTable;

	if (gameOn)
	{
		statsTable = document.getElementById("gameStatsData");
		statsTable.innerHTML = "";
		for (var label of player.statsMap.keys())
		{
			var playerData = player.statsMap.get(label);
			if (playerStatsMap.get(label) < playerData)
				playerStatsMap.set(label, playerData);

			statsTable.appendChild(createTableData(label, player.statsMap.get(label)));
		}

		document.getElementById(MenuEnum.GAME_STATS).style.display = "block";
	}

	statsTable = document.getElementById("playerStatsData");
	statsTable.innerHTML = "";
	for (var label of playerStatsMap.keys())
		statsTable.appendChild(createTableData(label, playerStatsMap.get(label)));
}