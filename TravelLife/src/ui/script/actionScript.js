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
	action = selectedAction;

	var actionButton = document.getElementById(action);
	if (actionButton != null)
	{
		var actionInfo = "";
		var actionFunction = actionFunctionMap.get(action);
		if (actionFunction != null)
			actionInfo = actionFunction(actionButton.label, false);

		if (actionInfo == null || actionInfo === "")
			actionInfo = "You selected " + actionButton.label + ".";

		setActionDetails(actionButton.innerText, actionButton.label, actionInfo);
	}
	else
		resetAction();

	if (autoConfirm.checked === true && action !== "")
		confirmAction();
}

function setActionDetails(actionSymbol, actionLabel, actionInfo)
{
	var confirmAction = document.getElementById("confirmAction");
	confirmAction.disabled = false;
	confirmAction.innerText = actionLabel;

	document.getElementById("actionSymbol").innerText = actionSymbol;

	document.getElementById("actionLabel").innerText = actionLabel;

	document.getElementById("actionTitle").style.display = "block";

	document.getElementById("actionInfo").innerText = actionInfo;
}

function climbOverOff(climbOverOff, direction, doUpdate)
{
	var actionInfo = "";

	if (doUpdate)
	{
		player.status = ActionEnum.STOP;

		player.momentum.left = 0;
		player.momentum.right = 0;

		updatePlayerIcon("images/" + player.species.type + "/Species.png");

		player.attributeMap.set(AttributeEnum.CLIMB, player.species.attributeMap.get(AttributeEnum.CLIMB));
	}
	else
		actionInfo += climbOverOff + " resets spent attributes and you lose " + AttributeEnum.ENDURANCE + ".\n"
					+ "When " + AttributeEnum.ENDURANCE + " reaches 0, you lose " + AttributeEnum.HEALTH + ".\n"
					+ "\n";

	actionInfo = loseEndurance(AttributeEnum.CLIMB, actionInfo);

	if (doUpdate)
	{
		if (climbOverOff === ActionEnum.CLIMB_OVER)
		{
			player.position.row--;
			(direction === ActionEnum.LEFT ? player.position.col-- : player.position.col++);
		}

		exposeMapTiles();
		placePlayer();
	}

	return actionInfo;
}

function climb(direction, doUpdate)
{
	var actionInfo = "";

	if (direction === ActionEnum.LEFT || direction === ActionEnum.RIGHT)
		actionInfo = climbSide(direction, doUpdate);
	else
	{
		var climbValue = player.attributeMap.get(AttributeEnum.CLIMB);

		var min = 1
		var max = climbValue;
		var value = max;

		if (doUpdate)
			value = getRandomNumber(min, max);
		else // Get info, don't do update
			actionInfo += AttributeEnum.CLIMB + " decreases " + AttributeEnum.CLIMB + ".\n"
						+ "When " + AttributeEnum.CLIMB + " reaches 0, "
						+ AttributeEnum.CLIMB + " resets and you lose " + AttributeEnum.ENDURANCE + ".\n"
						+ "When " + AttributeEnum.ENDURANCE + " reaches 0, you lose "
						+ AttributeEnum.HEALTH + " and " + ActionEnum.LET_GO + ".\n"
						+ "\n"
						+ AttributeEnum.CLIMB + ": " + climbValue + " - [" + min + "-" + max + "] "
						+ "= [" + (climbValue - max) + "-" + (climbValue - min) + "]\n\n";

		climbValue -= value;
		if (climbValue === 0)
		{
			if (doUpdate)
				player.attributeMap.set(AttributeEnum.CLIMB, player.species.attributeMap.get(AttributeEnum.CLIMB));

			actionInfo = loseEndurance(AttributeEnum.CLIMB, actionInfo);

			if (!doUpdate && !actionInfo.includes("If you " + AttributeEnum.CLIMB + ", you risk "))
				actionInfo += "If you " + AttributeEnum.CLIMB + ", you risk losing " + AttributeEnum.ENDURANCE + ".";
		}
		else if (doUpdate)
			player.attributeMap.set(AttributeEnum.CLIMB, climbValue);

		if (doUpdate)
		{
			(direction === ActionEnum.UP ? player.position.row-- : player.position.row++);
			exposeMapTiles();
			placePlayer();
		}

		// Check if player let go
		if (player.attributeMap.get(AttributeEnum.ENDURANCE) === 0)
			letGo(true);
	}

	return actionInfo;
}

function climbSide(direction, doUpdate)
{
	var actionInfo = "";

	if (doUpdate)
	{
		player.status = AttributeEnum.CLIMB;

		if (direction === ActionEnum.LEFT)
		{
			player.momentum.left++;
			updatePlayerIcon("images/" + player.species.type + "/"
				+ ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png");
		}
		else if (direction === ActionEnum.RIGHT)
		{
			player.momentum.right++;
			updatePlayerIcon("images/" + player.species.type + "/"
				+ ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png");
		}
	}
	else
		actionInfo += AttributeEnum.CLIMB + " allows you to " + AttributeEnum.CLIMB + ".";

	return actionInfo;
}

function letGo(doUpdate)
{
	var actionInfo = "";

	if (doUpdate)
	{
		player.status = ActionEnum.FALL;

		player.momentum.up = 0;
		player.momentum.left = 0;
		player.momentum.right = 0;
		player.momentum.down = 0;

		updatePlayerIcon("images/" + player.species.type + "/Suspended.png");
	}
	else
		actionInfo += ActionEnum.LET_GO + " allows you to " + ActionEnum.FALL + ".";

	return actionInfo;
}

function run(direction, doUpdate)
{
	var actionInfo = "";

	var runValue = player.attributeMap.get(AttributeEnum.RUN);

	var min = 1
	var max = runValue;
	var value = max;

	if (doUpdate)
		value = getRandomNumber(min, max);
	else // Get info, don't do update
	{
		actionInfo += AttributeEnum.RUN + " decreases " + AttributeEnum.RUN + ".\n"
					+ "When " + AttributeEnum.RUN + " reaches 0 or you " + ActionEnum.STOP + ", "
					+ AttributeEnum.RUN + " resets and you lose " + AttributeEnum.ENDURANCE + ".\n"
					+ "When " + AttributeEnum.ENDURANCE + " reaches 0, you lose " + AttributeEnum.HEALTH + ".\n"
					+ "\n";

		actionInfo += AttributeEnum.RUN + ": " + runValue + " - [" + min + "-" + max + "] "
					+ "= [" + (runValue - max) + "-" + (runValue - min) + "]\n\n";
	}

	runValue -= value;
	if (runValue === 0)
	{
		if (doUpdate)
		{
			player.status = ActionEnum.STOP;

			player.momentum.left = 0;
			player.momentum.right = 0;

			updatePlayerIcon("images/" + player.species.type + "/Species.png");

			player.attributeMap.set(AttributeEnum.RUN, player.species.attributeMap.get(AttributeEnum.RUN));
		}

		actionInfo = loseEndurance(AttributeEnum.RUN, actionInfo);

		if (!doUpdate && !actionInfo.includes("If you " + AttributeEnum.RUN + ", you risk "))
			actionInfo += "If you " + AttributeEnum.RUN + ", you risk losing " + AttributeEnum.ENDURANCE + ".";
	}
	else if (doUpdate)
	{
		player.status = AttributeEnum.RUN;

		if (direction === ActionEnum.LEFT)
		{
			player.momentum.left++;
			updatePlayerIcon("images/" + player.species.type + "/"
				+ ActionEnum.RUN_LEFT.replace(" ", "") + ".png");
		}
		else
		{
			player.momentum.right++;
			updatePlayerIcon("images/" + player.species.type + "/"
				+ ActionEnum.RUN_RIGHT.replace(" ", "") + ".png");
		}

		player.attributeMap.set(AttributeEnum.RUN, runValue);
	}

	if (doUpdate)
	{
		(direction === ActionEnum.LEFT ? player.position.col-- : player.position.col++);
		exposeMapTiles();
		placePlayer();

		// Check if player has to stop
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
	var attributes = [AttributeEnum.CLIMB, AttributeEnum.RUN];

	if (!doUpdate)
		actionInfo += ActionEnum.STOP + " resets spent attributes and you lose " + AttributeEnum.ENDURANCE + ".\n"
					+ "When " + AttributeEnum.ENDURANCE + " reaches 0, you lose " + AttributeEnum.HEALTH + ".\n"
					+ "\n";

	for (var attribute of attributes)
	{
		var playerAttributeValue = player.attributeMap.get(attribute);
		var speciesAttributeValue = player.species.attributeMap.get(attribute);
		if (playerAttributeValue < speciesAttributeValue)
		{
			if (doUpdate)
				player.attributeMap.set(attribute, speciesAttributeValue);
			else // Get info, don't do update
				actionInfo += attribute + ": " + playerAttributeValue
					+ " => " + speciesAttributeValue + "\n";
		}
	}

	if (doUpdate)
	{
		player.status = ActionEnum.STOP;

		player.momentum.up = 0;
		player.momentum.left = 0;
		player.momentum.right = 0;
		player.momentum.down = 0;

		updatePlayerIcon("images/" + player.species.type + "/Species.png");
	}

	return loseEndurance(ActionEnum.STOP, actionInfo);
}

function rest(doUpdate)
{
	actionInfo = "";

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
		actionInfo += ActionEnum.REST + " increases " + AttributeEnum.ENDURANCE
					+ " based on " + AttributeEnum.RECOVERY + ".\n"
					+ "\n";
					+ AttributeEnum.ENDURANCE + ": " + playerAttributeValue
					+ " + [" + min + "-" + max + "] "
					+ "= [" + (playerAttributeValue + min) + "-"
					+ ((playerAttributeValue + max) > speciesAttributeValue
					 ? speciesAttributeValue : (playerAttributeValue + max)) + "]\n"
					+ "\n"
					+ "If you " + ActionEnum.REST + ", you risk losing "
					+ AttributeEnum.SIGHT + " and " + AttributeEnum.RECOVERY + ".";

	return actionInfo;
}

function fall(doUpdate)
{
	var actionInfo = "";

	if (doUpdate)
	{
		player.status = ActionEnum.FALL;

		playerAttributeValue = player.attributeMap.get(AttributeEnum.SIGHT);
		playerAttributeValue -= getRandomNumber(0, playerAttributeValue-1);
		player.attributeMap.set(AttributeEnum.SIGHT, playerAttributeValue);

		player.momentum.up = 0;
		player.momentum.left = 0;
		player.momentum.right = 0;
		player.momentum.down++;

		updatePlayerIcon("images/" + player.species.type + "/Suspended.png");

		if (!getTileByPosition((player.position.row+1), player.position.col).solid)
			player.position.row++;
		exposeMapTiles();
		placePlayer();

		// Check if player hit a solid tile
		if (getTileByPosition((player.position.row+1), player.position.col).solid)
		{
			var playerAttributeValue = player.attributeMap.get(AttributeEnum.JUMP);
			var maxDamage = player.momentum.down - getRandomNumber(0, playerAttributeValue);
			if (maxDamage > 0)
			{
				playerAttributeValue = player.attributeMap.get(AttributeEnum.HEALTH);
				playerAttributeValue -= getRandomNumber(1, maxDamage);
				player.attributeMap.set(AttributeEnum.HEALTH,
						(playerAttributeValue < 0 ? 0 : playerAttributeValue));
			}

			player.status = ActionEnum.STOP;

			player.momentum.down = 0;

			updatePlayerIcon("images/" + player.species.type + "/Species.png");
		}
	}
	else
		actionInfo += ActionEnum.FALL + " resets " + AttributeEnum.JUMP + ", increases downward momentum, "
					+ "and risks losing " + AttributeEnum.SIGHT + ".\n"
					+ "If you impact a solid block, you risk losing " + AttributeEnum.HEALTH + " "
					+ "based on your downward momentum reduced by " + AttributeEnum.JUMP + ".\n"
					+ "\n";

	return actionInfo;
}

function resetAction()
{
	action = "";

	var confirmAction = document.getElementById("confirmAction");
	confirmAction.innerText = "Choose Action";
	confirmAction.disabled = true;

	document.getElementById("actionTitle").style.display = "none";

	document.getElementById("actionInfo").innerText = "Select an action to get information.";

	if (document.getElementById("gameMenu").style.display === "block")
		initAction();
}
