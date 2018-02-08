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

function getAttributes(attributeTable, playerAttributeMap, speciesAttributeMap)
{
	attributeTable.innerHTML = "";
	for (var label of playerAttributeMap.keys())
	{
		var playerData = playerAttributeMap.get(label);
		if (speciesAttributeMap != null && speciesAttributeMap.has(label))
			attributeTable.appendChild(createAttribute(label,
					playerData, speciesAttributeMap.get(label)));
		else
			attributeTable.appendChild(createAttribute(label, playerData));
	}
}

function createAttribute(label, playerData, speciesData)
{
	var attribute = document.createElement("tr");

	// Attribute Label
	var attributeLabelData = document.createElement("td");
	attributeLabelData.innerText = label + ":";
	attribute.appendChild(attributeLabelData);

	// Attribute Data
	attributeLabelData = document.createElement("td");
	attributeLabelData.style.textAlign = "right";
	attributeLabelData.innerText = playerData;
	attribute.appendChild(attributeLabelData);

	if (speciesData != null)
	{
		attributeLabelData = document.createElement("td");
		attributeLabelData.innerText = " / ";
		attribute.appendChild(attributeLabelData);

		attributeLabelData = document.createElement("td");
		attributeLabelData.style.textAlign = "right";
		attributeLabelData.innerText = speciesData;
		attribute.appendChild(attributeLabelData);
	}

	return attribute;
}

function getRandomNumber(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
