window.onload = init;
window.onresize = adjustContents;
window.addEventListener("keypress", handleKeypress)

var userInput = document.getElementById("userInput");
userInput.addEventListener('submit', startEndGame);

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
				if (!document.getElementById(DirectionEnum.UP_LEFT).disabled)
					getAction(DirectionEnum.UP_LEFT);
				break;
			case "w":
			case "W":
			case "ArrowUp":
			case "8":
				resetAction();
				if (!document.getElementById(DirectionEnum.UP).disabled)
					getAction(DirectionEnum.UP);
				break;
			case "e":
			case "E":
			case "9":
				resetAction();
				if (!document.getElementById(DirectionEnum.UP_RIGHT).disabled)
					getAction(DirectionEnum.UP_RIGHT);
				break;
			case "a":
			case "A":
			case "ArrowLeft":
			case "4":
				resetAction();
				if (!document.getElementById(DirectionEnum.LEFT).disabled)
					getAction(DirectionEnum.LEFT);
				break;
			case "r":
			case "R":
			case "0":
			case "5":
				resetAction();
				if (!document.getElementById(DirectionEnum.CENTER).disabled)
					getAction(DirectionEnum.CENTER);
				break;
			case "d":
			case "D":
			case "ArrowRight":
			case "6":
				resetAction();
				if (!document.getElementById(DirectionEnum.RIGHT).disabled)
					getAction(DirectionEnum.RIGHT);
				break;
			case "z":
			case "Z":
			case "1":
				resetAction();
				if (!document.getElementById(DirectionEnum.DOWN_LEFT).disabled)
					getAction(DirectionEnum.DOWN_LEFT);
				break;
			case "s":
			case "S":
			case "ArrowDown":
			case "2":
				resetAction();
				if (!document.getElementById(DirectionEnum.DOWN).disabled)
					getAction(DirectionEnum.DOWN);
				break;
			case "c":
			case "C":
			case "3":
				resetAction();
				if (!document.getElementById(DirectionEnum.DOWN_RIGHT).disabled)
					getAction(DirectionEnum.DOWN_RIGHT);
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

// Server functions
function saveGame()
{
	if (user == null || player == null)
		return;

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function()
	{
		if (this.readyState === 4 && this.status === 200
		 && player != null)
			player._id = JSON.parse(this.responseText).playerId;
	};

	xhttp.open("POST", ConfigEnum.API_ROOT + "/api/saveGame", true);
	xhttp.setRequestHeader("Content-Type", "application/json");

	var playerData = {userId: user._id,
					  playerId: player._id,
					  player: getPlayerDataToSave(),
					  attributes: getAttributeDataToSave(),
					  statistics: getStatisticDataToSave()};
	xhttp.send(JSON.stringify(playerData));
}

function loadGame(playerId)
{
	if (playerId == null)
		return;

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function()
	{
		if (this.readyState === 4 && this.status === 200)
		{
			var gameData = JSON.parse(this.responseText);

			initGame(gameData);
		}
	};

	xhttp.open("GET", ConfigEnum.API_ROOT + "/api/loadGame/" + playerId, true);
	xhttp.setRequestHeader("Content-Type", "application/json");

	xhttp.send();
}
// Server functions end

// Uses server functions
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

	loadActivePlayer();
}

function initGame(gameData)
{
	document.getElementById(MenuEnum.START_MENU).style.display = "none";
	document.getElementById(MenuEnum.GAME_MENU).style.display = "inline-block";

	gameOn = true;

	initPlayer(gameData);

	if (gameData == null)
	{
		initMapTiles();

		saveGame();
	}
	else // Loading game
		initMapTiles(gameData.player.map);

	initAction();
}

function takeAction()
{
	var actionFunction = actionFunctionMap.get(confirmAction.label);
	if (actionFunction != null)
	{
		actionFunction(true);

		if (confirmAction.label !== DirectionEnum.CENTER
		 && player.status !== StatusEnum.FALLING)
			gainSightRecovery();
	}

	resetAction();

	// Get updated attributes/statistics
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
		player.status = StatusEnum.EXPIRED;

		if (getTileByPosition(player.position.row, player.position.col).type !== TileTypeEnum.WATER
		 && getTileByPosition((player.position.row+1), player.position.col).solid)
			updatePlayerIcon("images/Species/" + player.species.type + "/End.png");
		else
			updatePlayerIcon("images/Species/" + player.species.type + "/SuspendedEnd.png");

		alert("The travels of " + player.name + " the " + player.species.type + " have come to an end.\n"
			+ "\n"
			+ "You traveled " + player.statisticsMap.get(StatsEnum.TILES_TRAVELED) + " of the "
			+ player.statisticsMap.get(StatsEnum.TILES_EXPOSED) + " tiles you exposed.\n"
			+ "\n"
			+ "Thank you for playing!");
	}

	saveGame();
}

function endGame()
{
	if (player != null)
	{
		player.status = StatusEnum.EXPIRED;
		saveGame();
	}

	resetTreasures();
	resetAction();
	resetPlayer();
	resetMap();

	gameOn = false;
	getStatistics();
	document.getElementById(MenuEnum.GAME_STATS).style.display = "none";
}
// Uses server functions end