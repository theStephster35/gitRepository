window.onload = init;
window.onresize = adjustContents;
window.addEventListener("keypress", handleKeypress)

var userInput = document.getElementById("userInput");
userInput.addEventListener('submit', startEndGame);

function init()
{
	endGame();
	adjustContents();
	updateAutoConfirm();
}

function adjustContents()
{
	var height = window.innerHeight;

	var menu = document.getElementById("menu");
	if (menu.style.display === ""
	 || menu.style.display === "block")
	{
		menu.style.minHeight = (height - getHeightOffset(menu)) + "px";
		menu.style.maxHeight = menu.style.minHeight;
	}

	adjustMapContents(height);

	if (document.getElementById("gameMenu").style.display === "block")
		placePlayer();
}

function getHeightOffset(element)
{
	var computedStyle = window.getComputedStyle(element, null);
	return element.offsetTop
		+ parseInt(computedStyle.getPropertyValue("margin-top").replace("px", ""))
		+ parseInt(computedStyle.getPropertyValue("margin-bottom").replace("px", ""))
		+ parseInt(computedStyle.getPropertyValue("padding-top").replace("px", ""))
		+ parseInt(computedStyle.getPropertyValue("padding-bottom").replace("px", ""));
}

function getWidthOffset(element)
{
	var computedStyle = window.getComputedStyle(element, null);
	return element.offsetLeft
		+ parseInt(computedStyle.getPropertyValue("margin-left").replace("px", ""))
		+ parseInt(computedStyle.getPropertyValue("margin-right").replace("px", ""))
		+ parseInt(computedStyle.getPropertyValue("padding-left").replace("px", ""))
		+ parseInt(computedStyle.getPropertyValue("padding-right").replace("px", ""));
}

function handleKeypress(event)
{
	if (event.key === "Escape")
		showHideMenu();
	else if (document.getElementById("gameMenu").style.display === "block")
	{
		switch (event.key)
		{
			case "q":
			case "Q":
			case "7":
				if (!document.getElementById(ActionEnum.UP_LEFT).disabled)
					getAction(ActionEnum.UP_LEFT);
				break;
			case "w":
			case "W":
			case "ArrowUp":
			case "8":
				if (!document.getElementById(ActionEnum.UP).disabled)
					getAction(ActionEnum.UP);
				break;
			case "e":
			case "E":
			case "9":
				if (!document.getElementById(ActionEnum.UP_RIGHT).disabled)
					getAction(ActionEnum.UP_RIGHT);
				break;
			case "a":
			case "A":
			case "ArrowLeft":
			case "4":
				if (!document.getElementById(ActionEnum.LEFT).disabled)
					getAction(ActionEnum.LEFT);
				break;
			case "r":
			case "R":
			case "0":
			case "5":
				if (!document.getElementById(ActionEnum.CENTER).disabled)
					getAction(ActionEnum.CENTER);
				break;
			case "d":
			case "D":
			case "ArrowRight":
			case "6":
				if (!document.getElementById(ActionEnum.RIGHT).disabled)
					getAction(ActionEnum.RIGHT);
				break;
			case "z":
			case "Z":
			case "1":
				if (!document.getElementById(ActionEnum.DOWN_LEFT).disabled)
					getAction(ActionEnum.DOWN_LEFT);
				break;
			case "s":
			case "S":
			case "ArrowDown":
			case "2":
				if (!document.getElementById(ActionEnum.DOWN).disabled)
					getAction(ActionEnum.DOWN);
				break;
			case "c":
			case "C":
			case "3":
				if (!document.getElementById(ActionEnum.DOWN_RIGHT).disabled)
					getAction(ActionEnum.DOWN_RIGHT);
				break;
			case " ":
			case "Enter":
				if (action !== "")
					confirmAction();
				break;
			default:
				resetAction();
		}
	}
}

function initGame()
{
	initPlayer();
	initMapTiles();
	initAction();
}

function takeAction()
{
	var actionFunction = actionFunctionMap.get(confirmAction.label);
	if (actionFunction != null)
	{
		actionFunction(true);

		if (confirmAction.label !== ActionEnum.CENTER
		 && player.status !== ActionEnum.FALL)
			gainSightRecovery();
	}

	resetAction();

	// Get updated attributes
	getAttributes(document.getElementById("playerAttributes"),
			player.attributeMap, player.species.attributeMap);

	// Check if player is alive
	if (player.attributeMap.get(AttributeEnum.HEALTH) === 0)
	{
		if (getTileByPosition((player.position.row+1), player.position.col).solid)
			updatePlayerIcon("images/" + player.species.type + "/End.png");
		else
			updatePlayerIcon("images/" + player.species.type + "/SuspendedEnd.png");

		alert("The travels of " + player.name + " the "
			+ player.species.type + " have come to an end.");
	}
}

function endGame()
{
	resetAction();
	resetPlayer();
	resetMap();
}
