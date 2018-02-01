function setPlayerDetails()
{
<<<<<<< HEAD
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
	
=======
	var species = document.getElementById("species");
	var playerSpecies = document.getElementById("playerSpecies");
	playerSpecies.src = "images/" + species.options[species.selectedIndex].value + ".png";
	playerSpecies.alt = species.options[species.selectedIndex].innerText;

	document.getElementById("playerName").innerText = document.getElementById("name").value;

	document.getElementById("playerTitle").style.display = "block";
>>>>>>> refs/remotes/origin/develop
}

function getAction(action)
{
	switch (action)
	{
		case "upLeft":
			var actionLabel = "Jump Left";
			setActionDetails("\u2196", actionLabel);
			document.getElementById("actionInfo").innerText = "You selected " + actionLabel + ".";
			break;
		case "up":
			var actionLabel = "Move Up";
			setActionDetails("\u2191", actionLabel);
			document.getElementById("actionInfo").innerText = "You selected " + actionLabel + ".";
			break;
		case "upRight":
			var actionLabel = "Jump Right";
			setActionDetails("\u2197", actionLabel);
			document.getElementById("actionInfo").innerText = "You selected " + actionLabel + ".";
			break;
		case "left":
			var actionLabel = "Move Left";
			setActionDetails("\u2190", actionLabel);
			document.getElementById("actionInfo").innerText = "You selected " + actionLabel + ".";
			break;
		case "center":
			var actionLabel = "Rest";
			setActionDetails("\u21BB", actionLabel);
			document.getElementById("actionInfo").innerText = "You selected " + actionLabel + ".";
			break;
		case "right":
			var actionLabel = "Move Right";
			setActionDetails("\u2192", actionLabel);
			document.getElementById("actionInfo").innerText = "You selected " + actionLabel + ".";
			break;
		case "downLeft":
			var actionLabel = "Swim Left";
			setActionDetails("\u2199", actionLabel);
			document.getElementById("actionInfo").innerText = "You selected " + actionLabel + ".";
			break;
		case "down":
			var actionLabel = "Move Down";
			setActionDetails("\u2193", actionLabel);
			document.getElementById("actionInfo").innerText = "You selected " + actionLabel + ".";
			break;
		case "downRight":
			var actionLabel = "Swim Left";
			setActionDetails("\u2198", actionLabel);
			document.getElementById("actionInfo").innerText = "You selected " + actionLabel + ".";
			break;
		default:
			resetAction();
	}
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
	var confirmAction = document.getElementById("confirmAction");
	confirmAction.innerText = "Choose Action";
	confirmAction.disabled = true;

	document.getElementById("actionTitle").style.display = "none";

	document.getElementById("actionInfo").innerText = "Select an action to get information.";
}
