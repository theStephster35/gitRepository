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
				getAction(ActionEnum.UP_LEFT);
				break;
			case "w":
			case "W":
			case "ArrowUp":
			case "8":
				getAction(ActionEnum.UP);
				break;
			case "e":
			case "E":
			case "9":
				getAction(ActionEnum.UP_RIGHT);
				break;
			case "a":
			case "A":
			case "ArrowLeft":
			case "4":
				getAction(ActionEnum.LEFT);
				break;
			case "r":
			case "R":
			case "0":
			case "5":
				getAction(ActionEnum.CENTER);
				break;
			case "d":
			case "D":
			case "ArrowRight":
			case "6":
				getAction(ActionEnum.RIGHT);
				break;
			case "z":
			case "Z":
			case "1":
				getAction(ActionEnum.DOWN_LEFT);
				break;
			case "s":
			case "S":
			case "ArrowDown":
			case "2":
				getAction(ActionEnum.DOWN);
				break;
			case "c":
			case "C":
			case "3":
				getAction(ActionEnum.DOWN_RIGHT);
				break;
			case "Space":
			case "Enter":
				if (action !== "")
					confirmAction();
				break;
			default:
				resetAction();
		}
	}
}

function showHideMenu()
{
	var menu = document.getElementById("menu");

	// Hide Menu
	if (menu.style.display === ""
	 || menu.style.display === "block")
		menu.style.display = "none";
	else // Show Menu
		menu.style.display = "block";

	adjustContents();
}

function startEndGame(event)
{
	var startMenu = document.getElementById("startMenu");
	var gameMenu = document.getElementById("gameMenu");

	// Start game
	if (startMenu.style.display === ""
	 || startMenu.style.display === "block")
	{
		initGame();

		startMenu.style.display = "none";
		gameMenu.style.display = "block";
	}
	else // End game
	{
		endGame();

		startMenu.style.display = "block";
		gameMenu.style.display = "none";
	}

	if (event != null)
		event.preventDefault();
}

function showHideDetails(value)
{
	var infoLink = document.getElementById(value + "Link");

	if (infoLink != null)
	{
		// Hide Details
		if (infoLink.innerText === "\u25BC Hide Details")
		{
			infoLink.innerText = "\u25BA Show Details";
			document.getElementById(value + "Details").style.display = "none";
		}
		else // Show Details
		{
			infoLink.innerText = "\u25BC Hide Details";
			document.getElementById(value + "Details").style.display = "block";
		}
	}
}

function getAttributes(attributeTable, attributes)
{
	attributeTable.innerHTML = "";
	attributeTable.appendChild(createAttribute(AttributeEnum.SIGHT, attributes.sight));
}

function createAttribute(label, data)
{
	var attribute = document.createElement("tr");

	// Attribute Label
	var attributeLabelData = document.createElement("td");
	attributeLabelData.innerText = label + ":";
	attribute.appendChild(attributeLabelData);

	// Attribute Data
	attributeLabelData = document.createElement("td");
	attributeLabelData.innerText = data;
	attribute.appendChild(attributeLabelData);

	return attribute;
}

function getRandomNumber(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
