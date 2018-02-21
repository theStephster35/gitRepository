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
	var menu = document.getElementById("menu");

	// Hide Menu
	if (menu.style.display === ""
	 || menu.style.display === "block")
		menu.style.display = "none";
	else // Show Menu
		menu.style.display = "block";

	adjustContents();
}

function startEndGame(event)
{
	var startMenu = document.getElementById("startMenu");
	var gameMenu = document.getElementById("gameMenu");

	// Start game
	if (startMenu.style.display === ""
	 || startMenu.style.display === "block")
	{
		initGame();

		startMenu.style.display = "none";
		gameMenu.style.display = "block";
	}
	else // End game
	{
		endGame();

		startMenu.style.display = "block";
		gameMenu.style.display = "none";
	}

	if (event != null)
		event.preventDefault();
}

function showHideDetails(value)
{
	var infoLink = document.getElementById(value + "Link");

	if (infoLink != null)
	{
		// Hide Details
		if (infoLink.innerText === "\u25BC Hide Details")
		{
			infoLink.innerText = "\u25BA Show Details";
			document.getElementById(value + "Details").style.display = "none";
		}
		else // Show Details
		{
			infoLink.innerText = "\u25BC Hide Details";
			document.getElementById(value + "Details").style.display = "block";
		}
	}
}

function getSpecies()
{
	var species = document.getElementById("species");

	switch (species.options[species.selectedIndex].value)
	{
		case SpeciesEnum.HUMAN:
			setSpeciesDetails(new Human());
			break;
		default:
			resetSpecies(species);
	}
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
			attributeTable.appendChild(createAttribute(label,
					playerData, speciesAttributeMap.get(label)));
		else
			attributeTable.appendChild(createAttribute(label, playerData));
	}
}

function createAttribute(label, playerData, speciesData)
{
	var attribute = document.createElement("tr");

	// Attribute Label
	var attributeLabelData = document.createElement("td");
	attributeLabelData.innerText = label + ":";
	attribute.appendChild(attributeLabelData);

	// Attribute Data
	attributeLabelData = document.createElement("td");
	attributeLabelData.style.textAlign = "right";
	attributeLabelData.innerText = playerData;
	attribute.appendChild(attributeLabelData);

	if (speciesData != null)
	{
		attributeLabelData = document.createElement("td");
		attributeLabelData.innerText = " / ";
		attribute.appendChild(attributeLabelData);

		attributeLabelData = document.createElement("td");
		attributeLabelData.style.textAlign = "right";
		attributeLabelData.innerText = speciesData;
		attribute.appendChild(attributeLabelData);
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

	// If player has health and endurance...
	// ... and is on a tile right of a solid tile
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0
	 && player.attributeMap.get(AttributeEnum.ENDURANCE) > 0
	 && getTileByPosition(row, (col-1)).solid)
	{
		// If player is not moving on a tile above a solid tile
		if (playerIsInStatus(ActionEnum.STOP)
		 && getTileByPosition((row+1), col).solid)
		{
			upLeftButton.label = ActionEnum.CLIMB_LEFT;
			upLeftButton.innerText = "\u2B11";
			upLeftButton.disabled = false;
		}
		else if (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.LEFT)
			  && !getTileByPosition((row-1), col).solid
			  && !getTileByPosition((row-1), (col-1)).solid)
		{
			// If player is climbing left...
			// ... and on a tile below a not solid tile and down right of not a solid tile
			upLeftButton.label = ActionEnum.CLIMB_OVER;
			upLeftButton.innerText = "\u21B0";
			upLeftButton.disabled = false;
		}
	}

	//upLeftButton.innerText = "\u21B6"; // Jump?
	//upLeftButton.innerText = "\u2196"; // Swim?
}

function checkUp(row, col)
{
	disableButton(upButton);

	// If player has health, endurance...
	// ... and is on a tile below a not solid tile
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0
	 && player.attributeMap.get(AttributeEnum.ENDURANCE) > 0
	 && !getTileByPosition((row-1), col).solid)
	{
		// If player is not moving
		if (playerIsInStatus(ActionEnum.STOP))
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
			// If player is jumping up
			upButton.label = ActionEnum.RISE_UP;
			upButton.innerText = "\u21D1";
			upButton.disabled = false;
		}
		else if (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.LEFT)
			  && getTileByPosition((row-1), (col-1)).solid)
		{
			// If player is climbing left...
			// ... and is on a tile down right of a solid tile
			upButton.label = ActionEnum.CLIMB_UP;
			upButton.innerText = "\u21BE";
			upButton.disabled = false;
		}
		else if (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.RIGHT)
			  && getTileByPosition((row-1), (col+1)).solid)
		{
			// If player is climbing right...
			// ... and is on a tile down left of a solid tile
			upButton.label = ActionEnum.CLIMB_UP;
			upButton.innerText = "\u21BF";
			upButton.disabled = false;
		}
	}

	//upButton.innerText = "\u2191"; // Swim?
}

function checkUpRight(row, col)
{
	disableButton(upRightButton);

	// If player has health and endurance...
	// ... and is on a tile left of a solid tile
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0
	 && player.attributeMap.get(AttributeEnum.ENDURANCE) > 0
	 && getTileByPosition(row, (col+1)).solid)
	{
		// If player is not moving above a solid tile
		if (playerIsInStatus(ActionEnum.STOP)
		 && getTileByPosition((row+1), col).solid)
		{
			upRightButton.label = ActionEnum.CLIMB_RIGHT;
			upRightButton.innerText = "\u2B0F";
			upRightButton.disabled = false;
		}
		else if (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.RIGHT)
			  && !getTileByPosition((row-1), col).solid
			  && !getTileByPosition((row-1), (col+1)).solid)
		{
			// If player is climbing right...
			// ... and on a tile below a not solid tile and down left of not a solid tile
			upRightButton.label = ActionEnum.CLIMB_OVER;
			upRightButton.innerText = "\u21B1";
			upRightButton.disabled = false;
		}
	}

	//upRightButton.innerText = "\u21B7"; // Jump?
	//upRightButton.innerText = "\u2197"; // Swim?
}

function checkLeft(row, col)
{
	disableButton(leftButton);

	// If player has health
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0)
	{
		// If player is falling
		if (playerIsInStatus(ActionEnum.FALL))
		{
			// If player is on a tile right of a solid tile
			if (getTileByPosition(row, (col-1)).solid)
			{
				leftButton.label = ActionEnum.GRAB_LEFT;
				leftButton.innerText = "\u21E4";
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
		else if ((playerIsInStatus(ActionEnum.STOP)
			   || playerIsInStatus(AttributeEnum.RUN, ActionEnum.LEFT))
			  && player.attributeMap.get(AttributeEnum.ENDURANCE) > 0
			  && !getTileByPosition(row, (col-1)).solid
			  && getTileByPosition((row+1), (col-1)).solid)
		{
			// If player has endurance and is not moving or is running left...
			// ... and is on a tile right of a not solid tile and up-right a solid tile
			leftButton.label = ActionEnum.RUN_LEFT;
			leftButton.innerText = "\u21A4";
			leftButton.disabled = false;
		}
	}

	//leftButton.innerText = "\u2345"; // Dig?
	//leftButton.innerText = "\u2190"; // Swim?
}

function checkCenter(row, col)
{
	disableButton(centerButton);

	// If player has health and is on a not water tile above a solid tile
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0
	 && getTileByPosition(row, col).type !== TileTypeEnum.WATER)
	{
		// If player is jumping
		if (playerIsInStatus(AttributeEnum.JUMP))
		{
			centerButton.label = ActionEnum.STOP;
			centerButton.innerText = "\u2B1C";
			centerButton.disabled = false;
		}
		else if (getTileByPosition((row+1), col).solid)
		{
			// If player is above a solid tile...
			// ... and is running
			if (playerIsInStatus(AttributeEnum.RUN))
			{
				centerButton.label = ActionEnum.STOP;
				centerButton.innerText = "\u2B1B";
				centerButton.disabled = false;
			}
			else if (playerIsInStatus(ActionEnum.STOP)
				  && player.attributeMap.get(AttributeEnum.RECOVERY) > 0
				  && player.attributeMap.get(AttributeEnum.ENDURANCE)
				   < player.species.attributeMap.get(AttributeEnum.ENDURANCE))
			{
				// ... is not moving, has recovery, and not max endurance
				centerButton.label = ActionEnum.REST;
				centerButton.innerText = "\u21BB";
				centerButton.disabled = false;
			}
		}
	}

	//centerButton.innerText = "\u23D4"; // Float?
}

function checkRight(row, col)
{
	disableButton(rightButton);

	// If player has health
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0)
	{
		// If player is falling
		if (playerIsInStatus(ActionEnum.FALL))
		{
			// If player is on a tile left of a solid tile
			if (getTileByPosition(row, (col+1)).solid)
			{
				rightButton.label = ActionEnum.GRAB_RIGHT;
				rightButton.innerText = "\u21E5";
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
		else if ((playerIsInStatus(ActionEnum.STOP)
			   || playerIsInStatus(AttributeEnum.RUN, ActionEnum.RIGHT))
			  && player.attributeMap.get(AttributeEnum.ENDURANCE) > 0
			  && !getTileByPosition(row, (col+1)).solid
			  && getTileByPosition((row+1), (col+1)).solid)
		{
			// If player has endurance and is not moving or is running right...
			// .. and is on a tile left of a not solid tile and up-left a solid tile
			rightButton.label = ActionEnum.RUN_RIGHT;
			rightButton.innerText = "\u21A6";
			rightButton.disabled = false;
		}
	}

	//rightButton.innerText = "\u2346"; // Dig?
	//rightButton.innerText = "\u2192"; // Swim?
}

function checkDownLeft(row, col)
{
	disableButton(downLeftButton);

	// If player has health and endurance
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0
	 && player.attributeMap.get(AttributeEnum.ENDURANCE) > 0)
	{
		// If player is not moving
		if (playerIsInStatus(ActionEnum.STOP))
		{
			// If player is on a tile right of a not solid tile and up right of not a solid tile
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
			// If player is climbing right and is above a solid tile
			downLeftButton.label = ActionEnum.CLIMB_OFF;
			downLeftButton.innerText = "\u21B2";
			downLeftButton.disabled = false;
		}
	}

	//downLeftButton.innerText = "\u2199"; // Swim?
}

function checkDown(row, col)
{
	disableButton(downButton);

	// If player has health
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0)
	{
		// If player is falling
		if (playerIsInStatus(ActionEnum.FALL))
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
				downButton.label = ActionEnum.FALL;
				downButton.innerText = "\u21D3";
			}

			downButton.disabled = false;
		}
		else if (!getTileByPosition((row+1), col).solid
			  && getTileByPosition((row+1), col).type !== TileTypeEnum.WATER)
		{
			// If player is on a tile above a not solid/water tile...
			// ... and is climbing left and is on a tile up right of a solid tile
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
				// ... and is climbing right and is on a tile up left of a solid tile
				downButton.label = ActionEnum.CLIMB_DOWN;
				downButton.innerText = "\u21C3";
				downButton.disabled = false;
			}
		}
	}

	//downButton.innerText = "\u2356"; // Dig?
	//downButton.innerText = "\u2193"; // Swim?
}

function checkDownRight(row, col)
{
	disableButton(downRightButton);

	// If player has health and endurance
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0
	 && player.attributeMap.get(AttributeEnum.ENDURANCE) > 0)
	{
		// If player is not moving
		if (playerIsInStatus(ActionEnum.STOP))
		{
			// If player is on a tile left of a not solid tile and up left of not a solid tile
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
			// If player is climbing left and is above a solid tile
			downRightButton.label = ActionEnum.CLIMB_OFF;
			downRightButton.innerText = "\u21B3";
			downRightButton.disabled = false;
		}
	}

	//downRightButton.innerText = "\u2198"; // Swim?
}

function disableButton(button)
{
	button.label = "";
	button.disabled = true;
	button.innerText = "\u2BBE";
}
