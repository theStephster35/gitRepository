var confirmAction = document.getElementById("confirmAction");

function getRandomNumber(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initAction()
{
	placePlayer();

	var row = player.position.row;
	var col = player.position.col;

	checkUpLeft(row, col);
	checkUp(row, col);
	checkUpRight(row, col);
	checkLeft(row, col);
	checkCenter(row, col);
	checkRight(row, col);
	checkDownLeft(row, col);
	checkDown(row, col);
	checkDownRight(row, col);
}

function getAction(selectedAction)
{
	var actionButton = document.getElementById(selectedAction);
	if (actionButton != null)
	{
		confirmAction.disabled = false;
		confirmAction.label = actionButton.id;
		confirmAction.innerText = actionButton.label;
		confirmAction.symbol = actionButton.innerText;

		var actionInfo = "";
		var actionFunction = actionFunctionMap.get(selectedAction);
		if (actionFunction != null)
			actionInfo = actionFunction(false);

		if (actionInfo == null || actionInfo === "")
			actionInfo = "You selected " + actionButton.label + ".\n";

		setActionDetails(actionButton, actionInfo);
	}
	else
		resetAction();

	if (autoConfirm.checked === true && confirmAction.label !== "")
		takeAction();
}

function setActionDetails(actionButton, actionInfo)
{
	document.getElementById("actionSymbol").innerText = confirmAction.symbol;

	document.getElementById("actionLabel").innerText = confirmAction.innerText;

	document.getElementById("actionTitle").style.display = "block";

	document.getElementById("actionInfo").innerText = actionInfo;
}

function climb(doUpdate)
{
	var actionInfo = "";
	var climbUpDown = confirmAction.innerText;

	if (climbUpDown === ActionEnum.CLIMB_LEFT
	 || climbUpDown === ActionEnum.CLIMB_RIGHT)
		actionInfo = climbSide(doUpdate);
	else // Climb Up/Down
	{
		var climbValue = player.attributeMap.get(AttributeEnum.CLIMB);

		var min = 1
		var max = climbValue;
		var value = max;

		if (doUpdate)
			value = getRandomNumber(min, max);
		else // Get info, don't do update
			actionInfo += climbUpDown + " decreases " + AttributeEnum.CLIMB + ".\n"
						+ "When " + AttributeEnum.CLIMB + " reaches 0, "
						+ AttributeEnum.CLIMB + " resets and you lose " + AttributeEnum.ENDURANCE + ".\n"
						+ "When " + AttributeEnum.ENDURANCE + " reaches 0, you lose "
						+ AttributeEnum.HEALTH + " and " + ActionEnum.LET_GO + ".\n"
						+ "\n"
						+ AttributeEnum.CLIMB + ": " + climbValue + " - [" + min + "-" + max + "] "
						+ "= [" + (climbValue - max) + "-" + (climbValue - min) + "]\n"
						+ "\n";

		climbValue -= value;
		if (climbValue === 0)
		{
			actionInfo = loseEndurance(climbUpDown, actionInfo);

			if (doUpdate)
				resetAttribute(AttributeEnum.CLIMB, actionInfo);
			else if (!actionInfo.includes("If you " + climbUpDown + ", you risk "))
				actionInfo += "If you " + climbUpDown + ", you risk losing " + AttributeEnum.ENDURANCE + ".\n";
		}
		else if (doUpdate)
			player.attributeMap.set(AttributeEnum.CLIMB, climbValue);

		if (doUpdate)
		{
			if (climbUpDown === ActionEnum.CLIMB_UP)
				player.position.row--;
			else
				player.position.row++;

			exposeMapTiles();

			// Check if player must let go
			if (player.attributeMap.get(AttributeEnum.ENDURANCE) === 0)
				letGo(true);
		}
	}

	return actionInfo;
}

function climbSide(doUpdate)
{
	var actionInfo = "";
	var climbLeftRight = confirmAction.innerText;

	if (!doUpdate)
		actionInfo += climbLeftRight + " allows you to ";

	// Check if player is climbing up
	if ((climbLeftRight === ActionEnum.CLIMB_LEFT
	  && getTileByPosition(player.position.row, (player.position.col-1)).solid)
	 || (climbLeftRight === ActionEnum.CLIMB_RIGHT
	  && getTileByPosition(player.position.row, (player.position.col+1)).solid))
	{
		if (doUpdate)
		{
			player.status = AttributeEnum.CLIMB;

			if (climbLeftRight === ActionEnum.CLIMB_LEFT)
				player.momentum.left = 1;
			else
				player.momentum.right = 1;

			updatePlayerIcon("images/" + player.species.type + "/"
					+ climbLeftRight.replace(" ", "") + ".png");
		}
		else // Get info, don't do update
			actionInfo += AttributeEnum.CLIMB + ".\n";
	}
	else // Player is climbing down
	{
		// Check if player is climbing
		if ((climbLeftRight === ActionEnum.CLIMB_LEFT
		  && getTileByPosition((player.position.row+1), (player.position.col-1)).type !== TileTypeEnum.WATER)
		 || (climbLeftRight === ActionEnum.CLIMB_RIGHT
		  && getTileByPosition((player.position.row+1), (player.position.col+1)).type !== TileTypeEnum.WATER))
		{
			if (doUpdate)
			{
				player.status = AttributeEnum.CLIMB;
	
				if (climbLeftRight === ActionEnum.CLIMB_LEFT)
				{
					player.momentum.right = 1;

					updatePlayerIcon("images/" + player.species.type + "/"
							+ ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png");
				}
				else
				{
					player.momentum.left = 1;

					updatePlayerIcon("images/" + player.species.type + "/"
							+ ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png");
				}
			}
			else // Get info, don't do update
				actionInfo += AttributeEnum.CLIMB + ".\n";
		}
		else // Player is swimming
		{
			if (doUpdate)
			{
				player.status = AttributeEnum.SWIM;

				updatePlayerIcon("images/" + player.species.type + "/Suspended.png");
			}
			else // Get info, don't do update
				actionInfo += AttributeEnum.SWIM + ".\n";
		}

		if (doUpdate)
		{
			player.position.row++;
			if (climbLeftRight === ActionEnum.CLIMB_LEFT)
				player.position.col--;
			else
				player.position.col++;

			exposeMapTiles();
		}
	}

	return actionInfo;
}

function climbOverOff(doUpdate)
{
	var actionInfo = "";
	var climbOverOffLeftRight = confirmAction.innerText;

	if (!doUpdate)
		actionInfo += climbOverOffLeftRight + " resets " + player.status + " "
					+ "and you lose " + AttributeEnum.ENDURANCE + ".\n"
					+ "When " + AttributeEnum.ENDURANCE + " "
					+ "reaches 0, you lose " + AttributeEnum.HEALTH + ".\n"
					+ "\n";

	actionInfo = resetAttribute(player.status, actionInfo);

	actionInfo = loseEndurance(climbOverOffLeftRight, actionInfo);

	if (doUpdate)
	{
		player.status = ActionEnum.STOP;

		var left = player.momentum.left;
		player.momentum.left = 0;
		player.momentum.right = 0;

		updatePlayerIcon("images/" + player.species.type + "/Species.png");

		if (climbOverOffLeftRight === ActionEnum.CLIMB_OVER)
		{
			player.position.row--;
			if (left > 0)
				player.position.col--;
			else
				player.position.col++;
		}

		exposeMapTiles();
	}

	return actionInfo;
}

function resetAttribute(attribute, actionInfo)
{
	var playerAttributeValue = player.attributeMap.get(attribute);
	var speciesAttributeValue = player.species.attributeMap.get(attribute);
	if (playerAttributeValue < speciesAttributeValue)
	{
		if (actionInfo == null || actionInfo === "")
			player.attributeMap.set(attribute, speciesAttributeValue);
		else // Get info, don't do update
			actionInfo += attribute + ": " + playerAttributeValue
				+ " => " + speciesAttributeValue + "\n";
	}

	return actionInfo;
}

function climbOut(doUpdate)
{
	var actionInfo = "";
	var climbOutLeftRight = confirmAction.innerText;

	if (!doUpdate)
		actionInfo += climbOutLeftRight + " resets " + AttributeEnum.SWIM + ", "
					+ "allows you to " + AttributeEnum.CLIMB + ", "
					+ "and you lose " + AttributeEnum.ENDURANCE + ".\n"
					+ "When " + AttributeEnum.ENDURANCE + " reaches 0, "
					+ "you lose " + AttributeEnum.HEALTH + " and " + ActionEnum.LET_GO + ".\n"
					+ "\n";

	actionInfo = resetAttribute(AttributeEnum.SWIM, actionInfo);

	actionInfo = loseEndurance(climbOutLeftRight, actionInfo);

	if (doUpdate)
	{
		player.status = AttributeEnum.CLIMB;

		if (climbOutLeftRight === ActionEnum.CLIMB_OUT_LEFT)
		{
			player.momentum.left = 1;

			updatePlayerIcon("images/" + player.species.type + "/"
					+ ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png");
		}
		else
		{
			player.momentum.right = 1;

			updatePlayerIcon("images/" + player.species.type + "/"
					+ ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png");
		}

		player.position.row--;

		exposeMapTiles();

		// Check if player must let go
		if (player.attributeMap.get(AttributeEnum.ENDURANCE) === 0)
			letGo(true);
	}

	return actionInfo;
}

function jumpRise(doUpdate)
{
	var actionInfo = "";
	var jumpRiseDriftDirection = confirmAction.innerText;

	var jumpValue = player.attributeMap.get(AttributeEnum.JUMP);
	
	var min = 1
	var max = jumpValue;
	var value = max;
	
	if (doUpdate)
		value = getRandomNumber(min, max);
	else // Get info, don't do update
		actionInfo += jumpRiseDriftDirection + " decreases sideways momentum and " + AttributeEnum.JUMP + ".\n"
					+ "When " + AttributeEnum.JUMP + " reaches 0, " + AttributeEnum.JUMP + " resets, "
					+ "you " + ActionEnum.FALL_DOWN + " and lose " + AttributeEnum.ENDURANCE + ".\n"
					+ "When " + AttributeEnum.ENDURANCE + " reaches 0, you lose " + AttributeEnum.HEALTH + ".\n"
					+ "\n"
					+ AttributeEnum.JUMP + ": " + jumpValue + " - [" + min + "-" + max + "] "
					+ "= [" + (jumpValue - max) + "-" + (jumpValue - min) + "]\n"
					+ "\n";

	jumpValue -= value;
	if (jumpValue === 0)
	{
		actionInfo = loseEndurance(jumpRiseDriftDirection, actionInfo);

		if (doUpdate)
		{
			resetAttribute(AttributeEnum.JUMP, actionInfo);

			player.status = ActionEnum.FALL_DOWN;

			player.momentum.up = 0;
		}
		else if (!actionInfo.includes("If you " + jumpRiseDriftDirection + ", you risk "))
			actionInfo += "If you " + jumpRiseDriftDirection + ", "
						+ "you risk losing " + AttributeEnum.ENDURANCE + ".\n";
	}
	else if (doUpdate)
	{
		player.status = AttributeEnum.JUMP;

		player.attributeMap.set(AttributeEnum.JUMP, jumpValue);

		player.momentum.up = 1;
	}

	if (doUpdate)
	{
		switch(jumpRiseDriftDirection)
		{
			case ActionEnum.JUMP_LEFT:
				player.momentum.left += max;
				updatePlayerIcon("images/" + player.species.type + "/"
						   + jumpRiseDriftDirection.replace(" ", "") + ".png");
			case ActionEnum.RISE_LEFT:
				player.position.row--;
				player.position.col--;
				break;
			case ActionEnum.JUMP_UP:
				if (player.momentum.left > 0)
					updatePlayerIcon("images/" + player.species.type + "/"
							   + ActionEnum.JUMP_LEFT.replace(" ", "") + ".png");
				else if (player.momentum.right > 0)
					updatePlayerIcon("images/" + player.species.type + "/"
							   + ActionEnum.JUMP_RIGHT.replace(" ", "") + ".png");
			case ActionEnum.RISE_UP:
				player.position.row--;
				break
			case ActionEnum.JUMP_RIGHT:
				player.momentum.right += max;
				updatePlayerIcon("images/" + player.species.type + "/"
							   + jumpRiseDriftDirection.replace(" ", "") + ".png");
			case ActionEnum.RISE_RIGHT:
				player.position.row--;
				player.position.col++;
				break;
		}

		if (player.momentum.left > 0)
		{
			player.momentum.left--;

			if (jumpRiseDriftDirection === ActionEnum.DRIFT)
				player.position.col--;
		}
		else if (player.momentum.right > 0)
		{
			player.momentum.right--;

			if (jumpRiseDriftDirection === ActionEnum.DRIFT)
				player.position.col++;
		}

		if (player.momentum.left === 0
		 && player.momentum.right === 0)
			updatePlayerIcon("images/" + player.species.type + "/Suspended.png");
			
		exposeMapTiles();

		// Check if player must stop
		if (player.momentum.up > 0
		 && getTileByPosition((player.position.row-1), player.position.col).solid)
			stop(true);
	}

	return actionInfo;
}

function swim(doUpdate)
{
	var actionInfo = "";
	var swimDirection = confirmAction.innerText;

	var swimValue = player.attributeMap.get(AttributeEnum.SWIM);

	var min = 1
	var max = swimValue;
	var value = max;

	if (!doUpdate)
		actionInfo += swimDirection + " decreases " + AttributeEnum.SWIM + ".\n"
					+ "When " + AttributeEnum.SWIM + " reaches 0, "
					+ AttributeEnum.SWIM + " resets and you lose " + AttributeEnum.ENDURANCE + " "
					+ "if you have " + AttributeEnum.ENDURANCE + " to lose.\n"
					+ "When " + AttributeEnum.ENDURANCE + " reaches 0, you lose " + AttributeEnum.HEALTH + ".\n"
					+ "If you have no " + AttributeEnum.ENDURANCE + ", " + AttributeEnum.SWIM + " "
					+ "does not reset and you lose " + AttributeEnum.HEALTH + ".\n"
					+ "When " + AttributeEnum.HEALTH + " reaches 0, your travels end.\n"
					+ "\n";

	if (swimValue > 0)
	{
		if (doUpdate)
			value = getRandomNumber(min, max);
		else // Get info, don't do update
			actionInfo += AttributeEnum.SWIM + ": " + swimValue + " - [" + min + "-" + max + "] "
						+ "= [" + (swimValue - max) + "-" + (swimValue - min) + "]\n"
						+ "\n";
	}

	swimValue -= value;
	if (swimValue === 0)
	{
		if (player.attributeMap.get(AttributeEnum.ENDURANCE) > 0)
		{
			actionInfo = loseEndurance(swimDirection, actionInfo);

			if (doUpdate)
				resetAttribute(AttributeEnum.SWIM, actionInfo);
			else if (!actionInfo.includes("If you " + swimDirection + ", you risk "))
				actionInfo += "If you " + swimDirection + ", you risk losing " + AttributeEnum.ENDURANCE + ".\n";
		}
		else // Player has no endurance
		{
			var playerHealthValue = player.attributeMap.get(AttributeEnum.HEALTH)-1;

			if (doUpdate)
			{
				player.attributeMap.set(AttributeEnum.SWIM, swimValue);

				player.attributeMap.set(AttributeEnum.HEALTH, playerHealthValue);
			}
			else // Get info, don't do update
				actionInfo += AttributeEnum.HEALTH + ": " + (playerHealthValue+1)
							+ " - 1 = " + playerHealthValue + "\n";
		}
	}
	else if (doUpdate)
		player.attributeMap.set(AttributeEnum.SWIM, swimValue);

	if (doUpdate)
	{
		switch (swimDirection)
		{
			case ActionEnum.SWIM_UP_LEFT:
				player.position.col--;
			case ActionEnum.SWIM_UP:
				player.position.row--;
				break;
			case ActionEnum.SWIM_UP_RIGHT:
				player.position.row--;
				player.position.col++;
				break;
			case ActionEnum.SWIM_LEFT:
				player.position.col--;
				break;
			case ActionEnum.SWIM_RIGHT:
				player.position.col++;
				break;
			case ActionEnum.SWIM_DOWN_LEFT:
				player.position.col--;
			case ActionEnum.SWIM_DOWN:
				player.position.row++;
				break;
			case ActionEnum.SWIM_DOWN_RIGHT:
				player.position.row++;
				player.position.col++;
				break;
		}

		exposeMapTiles();
	}

	return actionInfo;
}

function letGo(doUpdate)
{
	var actionInfo = "";
	var letGoLeftRight = confirmAction.innerText;

	if (!doUpdate)
		actionInfo += letGoLeftRight + " resets " + AttributeEnum.CLIMB + " "
					+ "and you lose " + AttributeEnum.ENDURANCE + ".\n"
					+ "\n";

	actionInfo = resetAttribute(AttributeEnum.CLIMB, actionInfo);

	if (doUpdate)
	{
		player.status = ActionEnum.FALL_DOWN;

		player.momentum.left = 0;
		player.momentum.right = 0;

		updatePlayerIcon("images/" + player.species.type + "/Suspended.png");
	}

	if (player.attributeMap.get(AttributeEnum.ENDURANCE) > 0)
		actionInfo = loseEndurance(letGoLeftRight, actionInfo);

	return actionInfo;
}

function grab(doUpdate)
{
	var actionInfo = "";
	var grabLeftRight = confirmAction.innerText;

	if (!doUpdate)
		actionInfo += grabLeftRight + " resets " + AttributeEnum.CLIMB + ", "
					+ "reduces downward momentum based on " + AttributeEnum.CLIMB + ", "
					+ "and you lose " + AttributeEnum.HEALTH + " if you have no "
					+ AttributeEnum.ENDURANCE + " to lose.\n"
					+ "When downward momentum reaches 0, " + AttributeEnum.ENDURANCE + " resets if "
					+ AttributeEnum.ENDURANCE + " reaches 0, and you " + AttributeEnum.CLIMB + "; otherwise, you "
					+ (getTileByPosition((player.position.row+1), player.position.col).solid
					   ? ActionEnum.LAND : ActionEnum.FALL_DOWN) + ".\n"
					+ "When " + AttributeEnum.ENDURANCE + " reaches 0, "
					+ "you lose " + AttributeEnum.HEALTH + ".\n"
					+ "When " + AttributeEnum.HEALTH + " reaches 0, your travels end.\n"
					+ "\n";

	actionInfo = resetAttribute(AttributeEnum.CLIMB, actionInfo);

	var playerEnduranceValue = player.attributeMap.get(AttributeEnum.ENDURANCE);
	var playerHealthValue = player.attributeMap.get(AttributeEnum.HEALTH);
	var playerClimbValue = player.attributeMap.get(AttributeEnum.CLIMB);
	var downValue = player.momentum.down;

	if (playerEnduranceValue > 0)
		actionInfo = loseEndurance(grabLeftRight, actionInfo);
	else // Player has no endurance
	{
		playerHealthValue--;

		if (doUpdate)
			player.attributeMap.set(AttributeEnum.HEALTH, playerHealthValue);
		else // Get info, don't do update
			actionInfo += AttributeEnum.HEALTH + ": " + (playerHealthValue+1)
						+ " - 1 = " + playerHealthValue + "\n";
	}

	var value = playerClimbValue;
	if (doUpdate)
		value = getRandomNumber(Math.ceil(playerClimbValue/2), playerClimbValue);

	downValue -= value;
	if (downValue <= 0)
	{
		downValue = 0;

		if (doUpdate)
		{
			if (playerEnduranceValue <= 1)
				actionInfo = resetAttribute(AttributeEnum.ENDURANCE, actionInfo);

			player.status = AttributeEnum.CLIMB;

			player.momentum.down = downValue;

			if (grabLeftRight === ActionEnum.GRAB_LEFT)
			{
				player.momentum.left = 1;
				player.momentum.right = 0;

				updatePlayerIcon("images/" + player.species.type + "/"
						+ ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png");
			}
			else
			{
				player.momentum.left = 0;
				player.momentum.right = 1;

				updatePlayerIcon("images/" + player.species.type + "/"
						+ ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png");
			}
		}
		else if ((playerEnduranceValue === 1 && playerHealthValue > 1)
			  || (playerEnduranceValue === 0 && playerHealthValue > 0))
		{
			if (actionInfo.includes("If you " + grabLeftRight + ", you risk "))
				actionInfo = actionInfo.slice(0, -2) + ", and ";
			else
				actionInfo += "\n"
							+ "If you " + grabLeftRight + ", ";
			actionInfo += "you stand to gain " + AttributeEnum.ENDURANCE + ".\n";
		}
	}
	else if (doUpdate)
	{
		player.momentum.down = downValue;

		// Check if player must land/fall
		if (getTileByPosition((player.position.row+1), player.position.col).solid)
			land(true);
		else
			fall(true);
	}

	return actionInfo;
}

function run(doUpdate)
{
	var actionInfo = "";
	var runLeftRight = confirmAction.innerText;

	var runValue = player.attributeMap.get(AttributeEnum.RUN);

	var min = 1
	var max = runValue;
	var value = max;

	if (doUpdate)
		value = getRandomNumber(min, max);
	else // Get info, don't do update
	{
		actionInfo += runLeftRight + " increases " + (runLeftRight === ActionEnum.RUN_LEFT ? "leftward " : "rightward ")
					+ "momentum and decreases " + AttributeEnum.RUN + ".\n"
					+ "When " + AttributeEnum.RUN + " reaches 0 or you " + ActionEnum.STOP + ", "
					+ AttributeEnum.RUN + " resets and you lose " + AttributeEnum.ENDURANCE + ".\n"
					+ "When " + AttributeEnum.ENDURANCE + " reaches 0, you lose " + AttributeEnum.HEALTH + ".\n"
					+ "\n"
					+ AttributeEnum.RUN + ": " + runValue + " - [" + min + "-" + max + "] "
					+ "= [" + (runValue - max) + "-" + (runValue - min) + "]\n\n";
	}

	runValue -= value;
	if (runValue === 0)
	{
		actionInfo = loseEndurance(runLeftRight, actionInfo);

		if (doUpdate)
		{
			resetAttribute(AttributeEnum.RUN, actionInfo);

			player.status = ActionEnum.STOP;

			player.momentum.left = 0;
			player.momentum.right = 0;

			updatePlayerIcon("images/" + player.species.type + "/Species.png");
		}
		else if (!actionInfo.includes("If you " + runLeftRight + ", you risk "))
			actionInfo += "If you " + runLeftRight + ", you risk losing " + AttributeEnum.ENDURANCE + ".\n";
	}
	else if (doUpdate)
	{
		player.status = AttributeEnum.RUN;

		player.attributeMap.set(AttributeEnum.RUN, runValue);

		if (runLeftRight === ActionEnum.RUN_LEFT)
			player.momentum.left++;
		else
			player.momentum.right++;

		updatePlayerIcon("images/" + player.species.type + "/"
				+ runLeftRight.replace(" ", "") + ".png");
	}

	if (doUpdate)
	{
		if (runLeftRight === ActionEnum.RUN_LEFT)
			player.position.col--;
		else
			player.position.col++;

		exposeMapTiles();

		// Check if player must stop
		if ((player.momentum.left > 0
		  && (getTileByPosition(player.position.row, (player.position.col-1)).solid
		   || !getTileByPosition((player.position.row+1), (player.position.col-1)).solid))
		 || (player.momentum.right > 0
		  && (getTileByPosition(player.position.row, (player.position.col+1)).solid
		   || !getTileByPosition((player.position.row+1), (player.position.col+1)).solid)))
			stop(true);
	}

	return actionInfo;
}

function stop(doUpdate)
{
	var actionInfo = "";
	var stopAction = confirmAction.innerText;

	if (!doUpdate)
	{
		actionInfo += stopAction + " ";
		if (player.status === AttributeEnum.JUMP)
			actionInfo += "allows you to " + ActionEnum.FALL_DOWN + ", ";
		actionInfo += "resets " + player.status + ", and you lose " + AttributeEnum.ENDURANCE + ".\n"
					+ "When " + AttributeEnum.ENDURANCE + " reaches 0, you lose " + AttributeEnum.HEALTH + ".\n"
					+ "\n";
	}

	actionInfo = resetAttribute(player.status, actionInfo);

	if (doUpdate)
	{
		if (player.status === AttributeEnum.RUN)
		{
			player.status = ActionEnum.STOP;

			player.momentum.left = 0;
			player.momentum.right = 0;

			updatePlayerIcon("images/" + player.species.type + "/Species.png");
		}
		else // Player is jumping
		{
			player.status = ActionEnum.FALL_DOWN;

			player.momentum.up = 0;
			player.momentum.down = 0;
		}
	}

	return loseEndurance(stopAction, actionInfo);
}

function restFloat(doUpdate)
{
	actionInfo = "";
	var restFloatAction = confirmAction.innerText;

	var min = 1;
	var max = (restFloatAction === ActionEnum.REST
			   ? player.attributeMap.get(AttributeEnum.RECOVERY)
			   : Math.ceil(player.attributeMap.get(AttributeEnum.RECOVERY)/2));

	var playerAttributeValue = player.attributeMap.get(AttributeEnum.ENDURANCE);
	var speciesAttributeValue = player.species.attributeMap.get(AttributeEnum.ENDURANCE);
	if (doUpdate)
	{
		playerAttributeValue += getRandomNumber(min, max);
		if (playerAttributeValue > speciesAttributeValue)
			playerAttributeValue = speciesAttributeValue;
		player.attributeMap.set(AttributeEnum.ENDURANCE, playerAttributeValue);

		playerAttributeValue = player.attributeMap.get(AttributeEnum.SIGHT);
		playerAttributeValue -= getRandomNumber(0, playerAttributeValue-1);
		player.attributeMap.set(AttributeEnum.SIGHT, playerAttributeValue);

		playerAttributeValue = player.attributeMap.get(AttributeEnum.RECOVERY);
		playerAttributeValue -= getRandomNumber(0, playerAttributeValue);
		player.attributeMap.set(AttributeEnum.RECOVERY, playerAttributeValue);
	}
	else // Get info, don't do update
		actionInfo += restFloatAction + " increases " + AttributeEnum.ENDURANCE
					+ " based on " + AttributeEnum.RECOVERY + ".\n"
					+ "\n"
					+ AttributeEnum.ENDURANCE + ": " + playerAttributeValue
					+ " + [" + min + "-" + max + "] "
					+ "= [" + (playerAttributeValue + min) + "-"
					+ ((playerAttributeValue + max) > speciesAttributeValue
					   ? speciesAttributeValue : (playerAttributeValue + max)) + "]\n"
					+ "\n"
					+ "If you " + restFloatAction + ", you risk losing "
					+ AttributeEnum.SIGHT + " and " + AttributeEnum.RECOVERY + ".\n";

	return actionInfo;
}

function fall(doUpdate)
{
	var actionInfo = "";
	var fallAction = confirmAction.innerText;

	if (!doUpdate)
		actionInfo += fallAction + " increases downward momentum, decreases sideways momentum, "
					+ "and resets " + AttributeEnum.JUMP + ".\n"
					+ "\n";

	actionInfo = resetAttribute(AttributeEnum.JUMP, actionInfo);

	if (doUpdate)
	{
		player.status = ActionEnum.FALL_DOWN;

		var playerSightValue = player.attributeMap.get(AttributeEnum.SIGHT);
		playerSightValue -= getRandomNumber(0, playerSightValue-1);
		player.attributeMap.set(AttributeEnum.SIGHT, playerSightValue);

		player.momentum.down++;

		updatePlayerIcon("images/" + player.species.type + "/Suspended.png");

		player.position.row++;

		exposeMapTiles();
	}
	else // Get info, don't do update
	{
		if (actionInfo.includes(" => "))
			actionInfo += "\n";

		actionInfo += "If you " + fallAction + ", you risk losing " + AttributeEnum.SIGHT + ".\n";
	}

	return actionInfo;
}

function land(doUpdate)
{
	var actionInfo = "";
	var landAction = confirmAction.innerText;

	if (!doUpdate)
		actionInfo += landAction + " loses you " + AttributeEnum.HEALTH + " "
					+ "based on downward momentum reduced by " + AttributeEnum.JUMP + ".\n"
					+ "When " + AttributeEnum.HEALTH + " reaches 0, your travels end.\n"
					+ "\n";

	var playerHealthValue = player.attributeMap.get(AttributeEnum.HEALTH);
	var playerJumpValue = player.attributeMap.get(AttributeEnum.JUMP);
	var minPlayerJumpValue = Math.ceil(playerJumpValue/2);

	if (doUpdate)
	{
		var max = player.momentum.down - getRandomNumber(minPlayerJumpValue, playerJumpValue);
		if (max > 0)
		{
			playerHealthValue -= getRandomNumber(1, max);
			player.attributeMap.set(AttributeEnum.HEALTH,
				(playerHealthValue < 0 ? 0 : playerHealthValue));
		}

		player.status = ActionEnum.STOP;

		player.momentum.left = 0;
		player.momentum.right = 0;
		player.momentum.down = 0;

		updatePlayerIcon("images/" + player.species.type + "/Species.png");
	}
	else // Get info, don't do update
	{
		var max = (player.momentum.down - minPlayerJumpValue);
		if (max < 0)
			max = 0;

		var min = (player.momentum.down - playerJumpValue);
		if (min < 0)
			min = 0;

		var minHealth = (playerHealthValue - max);
		if (minHealth < 0)
			minHealth = 0;

		actionInfo += AttributeEnum.HEALTH + ": " + playerHealthValue + " "
					+ "- (" + player.momentum.down + " - " + "[" + minPlayerJumpValue + "-" + playerJumpValue + "]) "
					+ "= [" + minHealth + "-" + ((playerHealthValue - min) < 0 ? 0 : (playerHealthValue - min)) + "]\n";

		if (minHealth === 0)
			actionInfo += "\n"
						+ "If you " + landAction + ", you risk death.";
	}

	return actionInfo;
}

function splash(doUpdate)
{
	var actionInfo = "";
	var splashAction = confirmAction.innerText;

	if (doUpdate)
	{
		player.status = AttributeEnum.SWIM;

		player.momentum.left = 0;
		player.momentum.right = 0;
		player.momentum.down = 0;

		updatePlayerIcon("images/" + player.species.type + "/Suspended.png");

		player.position.row++;

		exposeMapTiles();
	}
	else // Get info, don't do update
		actionInfo += splashAction + " allows you to " + AttributeEnum.SWIM + ".\n";

	return actionInfo;
}

function resetAction()
{
	confirmAction.innerText = "Choose Action";
	confirmAction.disabled = true;
	confirmAction.label = "";

	document.getElementById("actionTitle").style.display = "none";

	document.getElementById("actionInfo").innerText = "Select an action to get information.";

	if (document.getElementById("gameMenu").style.display === "block")
		initAction();
}
