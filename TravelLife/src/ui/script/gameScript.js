window.onload = init;
window.onresize = adjustContents;
window.addEventListener("keypress", handleKeypress)

var userInput = document.getElementById("userInput");
userInput.addEventListener('submit', startEndGame);

function init()
{
	if (window.opener != null
	 && window.opener.user != null)
		initUser();
	else // User signed in
		resetUser();

	endGame();
	adjustContents();
	updateAutoConfirm();

	openMenu(MenuEnum.HOME);
}

function adjustContents()
{
	var navMenu = document.getElementById("navMenu");
	if (navMenu.style.display === ""
	 || navMenu.style.display === "flex")
	{
		navMenu.style.minHeight = (window.innerHeight - getHeightOffset(navMenu)) + "px";
		navMenu.style.maxHeight = navMenu.style.minHeight;
	}

	adjustMapContents();
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
	else if (gameOn)
	{
		switch (event.key)
		{
			case "+":
			case "=":
				zoomMapInOut("zoomIn");
				break;
			case "-":
			case "_":
				zoomMapInOut("zoomOut");
				break;
			case "q":
			case "Q":
			case "7":
				resetAction();
				if (!document.getElementById(ActionEnum.UP_LEFT).disabled)
					getAction(ActionEnum.UP_LEFT);
				break;
			case "w":
			case "W":
			case "ArrowUp":
			case "8":
				resetAction();
				if (!document.getElementById(ActionEnum.UP).disabled)
					getAction(ActionEnum.UP);
				break;
			case "e":
			case "E":
			case "9":
				resetAction();
				if (!document.getElementById(ActionEnum.UP_RIGHT).disabled)
					getAction(ActionEnum.UP_RIGHT);
				break;
			case "a":
			case "A":
			case "ArrowLeft":
			case "4":
				resetAction();
				if (!document.getElementById(ActionEnum.LEFT).disabled)
					getAction(ActionEnum.LEFT);
				break;
			case "r":
			case "R":
			case "0":
			case "5":
				resetAction();
				if (!document.getElementById(ActionEnum.CENTER).disabled)
					getAction(ActionEnum.CENTER);
				break;
			case "d":
			case "D":
			case "ArrowRight":
			case "6":
				resetAction();
				if (!document.getElementById(ActionEnum.RIGHT).disabled)
					getAction(ActionEnum.RIGHT);
				break;
			case "z":
			case "Z":
			case "1":
				resetAction();
				if (!document.getElementById(ActionEnum.DOWN_LEFT).disabled)
					getAction(ActionEnum.DOWN_LEFT);
				break;
			case "s":
			case "S":
			case "ArrowDown":
			case "2":
				resetAction();
				if (!document.getElementById(ActionEnum.DOWN).disabled)
					getAction(ActionEnum.DOWN);
				break;
			case "c":
			case "C":
			case "3":
				resetAction();
				if (!document.getElementById(ActionEnum.DOWN_RIGHT).disabled)
					getAction(ActionEnum.DOWN_RIGHT);
				break;
			case " ":
			case "Enter":
				if (!confirmAction.disabled)
					takeAction();
				break;
			default:
				resetAction();
		}
	}
}

function initGame()
{
	gameOn = true;

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
		 && player.status !== ActionEnum.FALL_DOWN)
			gainSightRecovery();
	}

	resetAction();

	// Get updated attributes/stats
	switch (openNavLink.id)
	{
		case MenuEnum.HOME:
			getAttributes(document.getElementById("playerAttributes"),
					player.attributeMap, player.species.attributeMap);
			break;
		case MenuEnum.STATS:
			getStatistics();
			break;
	}

	if (document.getElementById("autoLocatePlayer").checked)
		locatePlayer();

	// Check if player is alive
	if (player.attributeMap.get(AttributeEnum.HEALTH) === 0)
	{
		if (getTileByPosition(player.position.row, player.position.col).type !== TileTypeEnum.WATER
		 && getTileByPosition((player.position.row+1), player.position.col).solid)
			updatePlayerIcon("images/Species/" + player.species.type + "/End.png");
		else
			updatePlayerIcon("images/Species/" + player.species.type + "/SuspendedEnd.png");

		alert("The travels of " + player.name + " the " + player.species.type + " have come to an end.\n"
			+ "\n"
			+ "You traveled " + player.statsMap.get(StatsEnum.TILES_TRAVELED) + " of the "
			+ player.statsMap.get(StatsEnum.TILES_EXPOSED) + " tiles you exposed.\n"
			+ "\n"
			+ "Thank you for playing!");
	}
}

function endGame()
{
	resetTreasures();
	resetAction();
	resetPlayer();
	resetMap();

	gameOn = false;
	getStatistics();
	document.getElementById(MenuEnum.GAME_STATS).style.display = "none";
}
