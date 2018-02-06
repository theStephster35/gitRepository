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
	getAttributes(document.getElementById("playerAttributes"), player.species.attributes);
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

function getAction(selectedAction)
{
	switch (selectedAction)
	{
		case ActionEnum.UP_LEFT:
			action = ActionEnum.UP_LEFT;
			var actionLabel = "Jump Left";
			setActionDetails("\u2196", actionLabel);
			document.getElementById("actionInfo").innerText = "You selected " + actionLabel + ".";
			break;
		case ActionEnum.UP:
			action = ActionEnum.UP;
			var actionLabel = "Move Up";
			setActionDetails("\u2191", actionLabel);
			document.getElementById("actionInfo").innerText = "You selected " + actionLabel + ".";
			break;
		case ActionEnum.UP_RIGHT:
			action = ActionEnum.UP_RIGHT;
			var actionLabel = "Jump Right";
			setActionDetails("\u2197", actionLabel);
			document.getElementById("actionInfo").innerText = "You selected " + actionLabel + ".";
			break;
		case ActionEnum.LEFT:
			action = ActionEnum.LEFT;
			var actionLabel = "Move Left";
			setActionDetails("\u2190", actionLabel);
			document.getElementById("actionInfo").innerText = "You selected " + actionLabel + ".";
			break;
		case ActionEnum.CENTER:
			action = ActionEnum.CENTER;
			var actionLabel = "Rest";
			setActionDetails("\u21BB", actionLabel);
			document.getElementById("actionInfo").innerText = "You selected " + actionLabel + ".";
			break;
		case ActionEnum.RIGHT:
			action = ActionEnum.RIGHT;
			var actionLabel = "Move Right";
			setActionDetails("\u2192", actionLabel);
			document.getElementById("actionInfo").innerText = "You selected " + actionLabel + ".";
			break;
		case ActionEnum.DOWN_LEFT:
			action = ActionEnum.DOWN_LEFT;
			var actionLabel = "Swim Left";
			setActionDetails("\u2199", actionLabel);
			document.getElementById("actionInfo").innerText = "You selected " + actionLabel + ".";
			break;
		case ActionEnum.DOWN:
			action = ActionEnum.DOWN;
			var actionLabel = "Move Down";
			setActionDetails("\u2193", actionLabel);
			document.getElementById("actionInfo").innerText = "You selected " + actionLabel + ".";
			break;
		case ActionEnum.DOWN_RIGHT:
			action = ActionEnum.DOWN_RIGHT;
			var actionLabel = "Swim Right";
			setActionDetails("\u2198", actionLabel);
			document.getElementById("actionInfo").innerText = "You selected " + actionLabel + ".";
			break;
		default:
			resetAction();
	}

	if (autoConfirm.checked === true && action !== "")
		confirmAction();
}

function setActionDetails(actionImage, actionLabel)
{
	var confirmAction = document.getElementById("confirmAction");
	confirmAction.disabled = false;
	confirmAction.innerText = actionLabel;

	document.getElementById("actionLabel").innerText = actionImage + " " + actionLabel;

	document.getElementById("actionTitle").style.display = "block";
}

function resetAction()
{
	action = "";

	var confirmAction = document.getElementById("confirmAction");
	confirmAction.innerText = "Choose Action";
	confirmAction.disabled = true;

	document.getElementById("actionTitle").style.display = "none";

	document.getElementById("actionInfo").innerText = "Select an action to get information.";
}
