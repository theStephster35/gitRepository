var confirmAction = document.getElementById("confirmAction");

function getRandomNumber(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initAction()
{
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
			actionInfo = "You selected " + actionButton.label + ".";

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
				actionInfo += "If you " + climbUpDown + ", you risk losing " + AttributeEnum.ENDURANCE + ".";
		}
		else if (doUpdate)
			player.attributeMap.set(AttributeEnum.CLIMB, climbValue);

		if (doUpdate)
		{
			(climbUpDown === ActionEnum.CLIMB_UP ? player.position.row-- : player.position.row++);
			exposeMapTiles();
			placePlayer();

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

	if (doUpdate)
	{
		player.status = AttributeEnum.CLIMB;

		if (climbLeftRight === ActionEnum.CLIMB_LEFT)
			player.momentum.left++;
		else
			player.momentum.right++;

		updatePlayerIcon("images/" + player.species.type + "/"
					   + climbLeftRight.replace(" ", "") + ".png");
	}
	else
		actionInfo += climbLeftRight + " allows you to " + AttributeEnum.CLIMB + ".";

	return actionInfo;
}

function climbOverOff(doUpdate)
{
	var actionInfo = "";
	var climbOverOffLeftRight = confirmAction.innerText;

	if (!doUpdate)
		actionInfo += climbOverOffLeftRight + " resets " + AttributeEnum.CLIMB + " "
					+ "and you lose " + AttributeEnum.ENDURANCE + ".\n"
					+ "When " + AttributeEnum.ENDURANCE + " "
					+ "reaches 0, you lose " + AttributeEnum.HEALTH + ".\n"
					+ "\n";

	actionInfo = resetAttribute(AttributeEnum.CLIMB, actionInfo);

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
			((left > 0) ? player.position.col-- : player.position.col++);
		}

		exposeMapTiles();
		placePlayer();
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
		player.status = ActionEnum.FALL;

		player.momentum.left = 0;
		player.momentum.right = 0;

		updatePlayerIcon("images/" + player.species.type + "/Suspended.png");
	}

	if (player.attributeMap.get(AttributeEnum.ENDURANCE) > 0)
		actionInfo = loseEndurance(letGoLeftRight, actionInfo);

	return actionInfo;
}

function jumpRise(doUpdate)
{
	var actionInfo = "";
	var jumpRiseUp = confirmAction.innerText;

	if (jumpRiseUp !== ActionEnum.JUMP_UP
	 && jumpRiseUp !== ActionEnum.RISE_UP)
		actionInfo = jumpRiseSide(doUpdate);
	else // Jump/Rise Up
	{
		var jumpValue = player.attributeMap.get(AttributeEnum.JUMP);
	
		var min = 1
		var max = jumpValue;
		var value = max;
	
		if (doUpdate)
			value = getRandomNumber(min, max);
		else // Get info, don't do update
			actionInfo += jumpRiseUp + " decreases " + AttributeEnum.JUMP + ".\n"
						+ "When " + AttributeEnum.JUMP + " reaches 0, " + AttributeEnum.JUMP + " resets, "
						+ "you " + ActionEnum.FALL + " and lose " + AttributeEnum.ENDURANCE + ".\n"
						+ "When " + AttributeEnum.ENDURANCE + " reaches 0, you lose " + AttributeEnum.HEALTH + ".\n"
						+ "\n"
						+ AttributeEnum.JUMP + ": " + jumpValue + " - [" + min + "-" + max + "] "
						+ "= [" + (jumpValue - max) + "-" + (jumpValue - min) + "]\n"
						+ "\n";
	
		jumpValue -= value;
		if (jumpValue === 0)
		{
			actionInfo = loseEndurance(jumpRiseUp, actionInfo);
	
			if (doUpdate)
			{
				resetAttribute(AttributeEnum.JUMP, actionInfo);
	
				player.status = ActionEnum.FALL;

				player.momentum.up = 0;
			}
			else if (!actionInfo.includes("If you " + jumpRiseUp + ", you risk "))
				actionInfo += "If you " + jumpRiseUp + ", you risk losing " + AttributeEnum.ENDURANCE + ".";
		}
		else if (doUpdate)
		{
			player.status = AttributeEnum.JUMP;

			player.attributeMap.set(AttributeEnum.JUMP, jumpValue);

			player.momentum.up = 1;
		}

		if (doUpdate)
		{
			player.momentum.left = 0;
			player.momentum.right = 0;

			updatePlayerIcon("images/" + player.species.type + "/Suspended.png");
	
			player.position.row--;
			exposeMapTiles();
			placePlayer();

			// Check if player must stop
			if (player.momentum.up > 0
			 && getTileByPosition((player.position.row-1), player.position.col).solid)
				stop(true);
		}
	}

	return actionInfo;
}

// TODO
function jumpRiseSide(doUpdate)
{
	var actionInfo = "";
	var jumpRiseLeftRight = confirmAction.innerText;

	return actionInfo;
}

function grab(doUpdate)
{
	var actionInfo = "";
	var grabLeftRight = confirmAction.innerText;

	if (!doUpdate)
	{
		actionInfo += grabLeftRight + " resets " + AttributeEnum.CLIMB + ", "
					+ "reduces downward momentum based on " + AttributeEnum.CLIMB + ", "
					+ "and loses you " + AttributeEnum.HEALTH + " if you have no "
					+ AttributeEnum.ENDURANCE + " to lose.\n"
					+ "When downward momentum reaches 0, " + AttributeEnum.ENDURANCE + " resets if "
					+ AttributeEnum.ENDURANCE + " reaches 0, and you " + AttributeEnum.CLIMB + "; otherwise, you "
					+ (getTileByPosition((player.position.row+1), player.position.col).solid
							? ActionEnum.LAND : ActionEnum.FALL) + ".\n"
					+ "When " + AttributeEnum.ENDURANCE + " reaches 0, "
					+ "you lose " + AttributeEnum.HEALTH + ".\n"
					+ "When " + AttributeEnum.HEALTH + " reaches 0, your travels end.\n"
					+ "\n";
	}

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
			actionInfo += "you stand to gain " + AttributeEnum.ENDURANCE + ".";
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
			actionInfo += "If you " + runLeftRight + ", you risk losing " + AttributeEnum.ENDURANCE + ".";
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
		placePlayer();

		// Check if player must stop
		var row = player.position.row;
		var col = player.position.col;
		if ((player.momentum.left > 0
		  && (getTileByPosition(row, (col-1)).solid
		   || !getTileByPosition((row+1), (col-1)).solid))
		 || (player.momentum.right > 0
		  && (getTileByPosition(row, (col+1)).solid
		   || !getTileByPosition((row+1), (col+1)).solid)))
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
			actionInfo += "allows you to " + ActionEnum.FALL + ", ";
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
			player.status = ActionEnum.FALL;

			player.momentum.up = 0;
			player.momentum.down = 0;

			updatePlayerIcon("images/" + player.species.type + "/Suspended.png");
		}
	}

	return loseEndurance(stopAction, actionInfo);
}

function rest(doUpdate)
{
	actionInfo = "";
	var restAction = confirmAction.innerText;

	var min = 1;
	var max = player.attributeMap.get(AttributeEnum.RECOVERY);

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
		actionInfo += restAction + " increases " + AttributeEnum.ENDURANCE
					+ " based on " + AttributeEnum.RECOVERY + ".\n"
					+ "\n"
					+ AttributeEnum.ENDURANCE + ": " + playerAttributeValue
					+ " + [" + min + "-" + max + "] "
					+ "= [" + (playerAttributeValue + min) + "-"
					+ ((playerAttributeValue + max) > speciesAttributeValue
					 ? speciesAttributeValue : (playerAttributeValue + max)) + "]\n"
					+ "\n"
					+ "If you " + restAction + ", you risk losing "
					+ AttributeEnum.SIGHT + " and " + AttributeEnum.RECOVERY + ".";

	return actionInfo;
}

function fall(doUpdate)
{
	var actionInfo = "";
	var fallAction = confirmAction.innerText;

	if (!doUpdate)
		actionInfo += fallAction + " increases downward momentum and resets " + AttributeEnum.JUMP + ".\n"
					+ "\n";

	actionInfo = resetAttribute(AttributeEnum.JUMP, actionInfo);

	if (doUpdate)
	{
		player.status = ActionEnum.FALL;

		var playerSightValue = player.attributeMap.get(AttributeEnum.SIGHT);
		playerSightValue -= getRandomNumber(0, playerSightValue-1);
		player.attributeMap.set(AttributeEnum.SIGHT, playerSightValue);

		player.momentum.down++;

		updatePlayerIcon("images/" + player.species.type + "/Suspended.png");

		player.position.row++;
		exposeMapTiles();
		placePlayer();
	}
	else // Get info, don't do update
	{
		if (actionInfo.includes(" => "))
			actionInfo += "\n";

		actionInfo += "If you " + fallAction + ", you risk losing " + AttributeEnum.SIGHT + ".";
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
