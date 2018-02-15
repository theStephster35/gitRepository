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
	var disableUpLeft = false;

	// If player has health and endurance
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
			// ... and on a tile below a not solid tile and down right of not a solid tile)
			upLeftButton.label = ActionEnum.CLIMB_OVER;
			upLeftButton.innerText = "\u21B0";
			upLeftButton.disabled = false;
		}
		else
			disableUpLeft = true;
	}
	else
		disableUpLeft = true;

	if (disableUpLeft)
		disableButton(upLeftButton);

	//upLeftButton.innerText = "\u21B6"; // Jump?
	//upLeftButton.innerText = "\u2196"; // Swim?
}

function checkUp(row, col)
{
	var disableUp = false;

	// If player has health, endurance, and is climbing
	// ... and is on a tile below a not a solid tile
	if (playerIsInStatus(AttributeEnum.CLIMB)
	 && player.attributeMap.get(AttributeEnum.HEALTH) > 0
	 && player.attributeMap.get(AttributeEnum.ENDURANCE) > 0
	 && !getTileByPosition((row-1), col).solid)
	{
		// If player is climbing left/right and is on a tile down right/left of a solid tile
		if ((playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.LEFT)
		  && getTileByPosition((row-1), (col-1)).solid)
		 || (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.RIGHT)
		  && getTileByPosition((row-1), (col+1)).solid))
		{
			upButton.label = ActionEnum.CLIMB_UP;
			upButton.innerText = "\u21A5";
			upButton.disabled = false;
		}
		else
			disableUp = true;
	}
	else
		disableUp = true;

	if (disableUp)
		disableButton(upButton);

	//upButton.innerText = "\u21E1"; // Jump?
	//upButton.innerText = "\u2191"; // Swim?
}

function checkUpRight(row, col)
{
	var disableUpRight = false;

	// If player has health and endurance
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
		else
			disableUpRight = true;
	}
	else
		disableUpRight = true;

	if (disableUpRight)
		disableButton(upRightButton);

	//upRightButton.innerText = "\u21B7"; // Jump?
	//upRightButton.innerText = "\u2197"; // Swim?
}

function checkLeft(row, col)
{
	var disableLeft = false;

	// If player has health
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0)
	{
		// If player is climbing right
		if (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.RIGHT))
		{
			leftButton.label = ActionEnum.LET_GO;
			leftButton.innerText = "\u21E0";
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
		else
			disableLeft = true;
	}
	else
		disableLeft = true;
	
	if (disableLeft)
		disableButton(leftButton);

	//leftButton.innerText = "\u21E4"; // Grab?
	//leftButton.innerText = "\u2345"; // Dig?
	//leftButton.innerText = "\u2190"; // Swim?
}

function checkCenter(row, col)
{
	var disableCenter = false;

	// If player has health and is on a not water tile above a solid tile
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0
	 && getTileByPosition(row, col).type !== TileTypeEnum.WATER
	 && getTileByPosition((row+1), col).solid)
	{
		// If player is not moving
		if (playerIsInStatus(ActionEnum.STOP))
		{
			// If player has recovery and not max endurance
			if (player.attributeMap.get(AttributeEnum.RECOVERY) > 0
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
		else if (playerIsInStatus(AttributeEnum.RUN))
		{
			centerButton.label = ActionEnum.STOP;
			centerButton.innerText = "\u23F9";
			centerButton.disabled = false;
		}
		else
			disableCenter = true;
	}
	else
		disableCenter = true;

	if (disableCenter)
		disableButton(centerButton);
}

function checkRight(row, col)
{
	var disableRight = false;

	// If player has health
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0)
	{
		// If player is climbing left
		if (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.LEFT))
		{
			rightButton.label = ActionEnum.LET_GO;
			rightButton.innerText = "\u21E2";
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
		else
			disableRight = true;
	}
	else
		disableRight = true;

	if (disableRight)
		disableButton(rightButton);

	//rightButton.innerText = "\u21E5"; // Grab?
	//rightButton.innerText = "\u2346"; // Dig?
	//rightButton.innerText = "\u2192"; // Swim?
}

function checkDownLeft(row, col)
{
	// If player has health, endurance, and climbing right...
	// .. and is above a solid tile
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0
	 && player.attributeMap.get(AttributeEnum.ENDURANCE) > 0
	 && playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.RIGHT)
	 && getTileByPosition((row+1), col).solid)
	{
		downLeftButton.label = ActionEnum.CLIMB_OFF;
		downLeftButton.innerText = "\u21B2";
		downLeftButton.disabled = false;
	}
	else
		disableButton(downLeftButton);

	//downLeftButton.innerText = "\u2199"; // Swim?
	//downLeftButton.innerText = "\u2BA6"; // Climb Over?
}

function checkDown(row, col)
{
	var disableDown = false;

	// If player has health
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0)
	{
		// If player is falling
		if (playerIsInStatus(ActionEnum.FALL))
		{
			// If player is on a tile above a solid tile...
			if (getTileByPosition((row+1), col).solid)
			{
				downButton.label = ActionEnum.LAND;
				downButton.innerText = "\u2913";
			}
			else
			{
				downButton.label = ActionEnum.FALL;
				downButton.innerText = "\u21E3";
			}

			downButton.disabled = false;
		}
		else if (!getTileByPosition((row+1), col).solid
			  && ((playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.LEFT)
				&& getTileByPosition((row+1), (col-1)).solid)
			   || (playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.RIGHT)
				&& getTileByPosition((row+1), (col+1)).solid)))
		{
			// If player is on a tile above a not solid tile...
			// and is climbing left/right and is on a tile up right/left of a solid tile
			downButton.label = ActionEnum.CLIMB_DOWN;
			downButton.innerText = "\u21A7";
			downButton.disabled = false;
		}
		else
			disableDown = true;
	}
	else
		disableDown = true;

	if (disableDown)
		disableButton(downButton);

	//downButton.innerText = "\u2356"; // Dig?
	//downButton.innerText = "\u2193"; // Swim?
}

function checkDownRight(row, col)
{
	// If player has health, endurance, and climbing left...
	// .. and is above a solid tile
	if (player.attributeMap.get(AttributeEnum.HEALTH) > 0
	 && player.attributeMap.get(AttributeEnum.ENDURANCE) > 0
	 && playerIsInStatus(AttributeEnum.CLIMB, ActionEnum.LEFT)
	 && getTileByPosition((row+1), col).solid)
	{
		downRightButton.label = ActionEnum.CLIMB_OFF;
		downRightButton.innerText = "\u21B3";
		downRightButton.disabled = false;
	}
	else
		disableButton(downRightButton);

	//downRightButton.innerText = "\u2198"; // Swim?
	//downRightButton.innerText = "\u2B0E"; // Climb Over?
}

function disableButton(button)
{
	button.label = "";
	button.disabled = true;
	button.innerText = "\u2BBE";
}
