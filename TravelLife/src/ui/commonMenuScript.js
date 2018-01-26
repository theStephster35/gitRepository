var gameStarted = false;

var userInput = document.getElementById("userInput");
userInput.addEventListener('submit', startEndGame);

function startEndGame(event)
{
	var startMenu = document.getElementById("startMenu");
	var gameMenu = document.getElementById("gameMenu");

	if (startMenu.style.display === ""
	 || startMenu.style.display === "block")
	{
		gameStarted = true;

		startMenu.style.display = "none";
		gameMenu.style.display = "block";
	}
	else // Game ended
	{
		gameStarted = false;
		
		resetAction();

		startMenu.style.display = "block";
		gameMenu.style.display = "none";
	}

	if (event != null)
		event.preventDefault();
}

function showHideMenu()
{
	var startMenu = document.getElementById("startMenu");
	var gameMenu = document.getElementById("gameMenu");

	if (startMenu.style.display === ""
	 || startMenu.style.display === "block"
	 || gameMenu.style.display === "block")
	{
		startMenu.style.display = "none";
		gameMenu.style.display = "none";
	}
	else // Show Menu
	{
		if (gameStarted)
			gameMenu.style.display = "block";
		else // Game not started
			startMenu.style.display = "block";
	}
}

function showHideInfo(value)
{
	var info = document.getElementById(value + "Info");
	var infoLink = document.getElementById(value + "Link");

	if (infoLink != null)
	{
		if (infoLink.innerText === "\u25BC Hide Details")
		{
			infoLink.innerText = "\u25BA Show Details";
			if (info != null)
				info.style.display = "none";
		}
		else // Show Details
		{
			infoLink.innerText = "\u25BC Hide Details";
			if (info != null)
				info.style.display = "block";
		}
	}
}
