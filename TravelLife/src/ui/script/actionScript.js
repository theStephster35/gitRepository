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

		if (actionInfo === "")
			actionInfo = "You selected " + actionButton.label + ".";

		setActionDetails(actionButton.innerText, actionButton.label, actionInfo);
	}
	else
		resetAction();

	if (autoConfirm.checked === true && action !== "")
		confirmAction();
}

function setActionDetails(actionImage, actionLabel, actionInfo)
{
	var confirmAction = document.getElementById("confirmAction");
	confirmAction.disabled = false;
	confirmAction.innerText = actionLabel;

	document.getElementById("actionLabel").innerText = actionImage + " " + actionLabel;

	document.getElementById("actionTitle").style.display = "block";

	document.getElementById("actionInfo").innerText = actionInfo;
}

function run(direction, doUpdate)
{
	var actionInfo = "";

	var attributeValue = player.attributeMap.get(AttributeEnum.RUN);

	var min = 1
	var max = attributeValue;
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

		actionInfo += AttributeEnum.RUN + ": " + attributeValue + " - [" + min + "-" + max + "] "
					+ "= [" + (attributeValue - max) + "-" + (attributeValue - min) + "]\n\n";
	}

	attributeValue -= value;
	if (attributeValue === 0)
	{
		if (doUpdate)
		{
			(direction === ActionEnum.LEFT ? player.momentum.left = 0 : player.momentum.right = 0);
			player.attributeMap.set(AttributeEnum.RUN, player.species.attributeMap.get(AttributeEnum.RUN));
		}

		actionInfo = loseEndurance(AttributeEnum.RUN, actionInfo);

		if (!doUpdate && !actionInfo.includes("If you " + AttributeEnum.RUN + ", you risk "))
			actionInfo += "If you " + AttributeEnum.RUN + ", you risk losing " + AttributeEnum.ENDURANCE + ".";
	}
	else if (doUpdate)
	{
		(direction === ActionEnum.LEFT ? player.momentum.left++ : player.momentum.right++);
		player.attributeMap.set(AttributeEnum.RUN, attributeValue);
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
		  && (getTileByTileType(mapTiles.children[row].children[col-1].type).solid
		   || !getTileByTileType(mapTiles.children[row+1].children[col-1].type).solid))
		 || (player.momentum.right > 0
		  && (getTileByTileType(mapTiles.children[row].children[col+1].type).solid
		   || !getTileByTileType(mapTiles.children[row+1].children[col+1].type).solid)))
			stop(true);
	}

	return actionInfo;
}

function stop(doUpdate)
{
	var actionInfo = "";
	var attributes = [AttributeEnum.RUN];

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
		player.momentum.up = 0;
		player.momentum.left = 0;
		player.momentum.right = 0;
		player.momentum.down = 0;
	}

	return loseEndurance(ActionEnum.STOP, actionInfo);
}

function rest(doUpdate)
{
	actionInfo = "";

	var min = 1
	var max = (player.attributeMap.get(AttributeEnum.RECOVERY)
			 ? player.attributeMap.get(AttributeEnum.RECOVERY) : min);

	if (!doUpdate)
		actionInfo += ActionEnum.REST + " increases your " + AttributeEnum.ENDURANCE
					+ " based on your " + AttributeEnum.RECOVERY + ".\n"
					+ "\n";

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
		actionInfo += AttributeEnum.ENDURANCE + ": " + playerAttributeValue
					+ " + [" + min + "-" + max + "] "
					+ "= [" + (playerAttributeValue + min) + "-"
					+ ((playerAttributeValue + max) > speciesAttributeValue
					 ? speciesAttributeValue : (playerAttributeValue + max)) + "]\n"
					+ "\n"
					+ "If you " + ActionEnum.REST + ", you risk losing "
					+ AttributeEnum.SIGHT + " and " + AttributeEnum.RECOVERY + ".";

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
