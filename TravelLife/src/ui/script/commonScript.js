var userInput = document.getElementById("userInput");
userInput.addEventListener('submit', startEndGame);

window.onload = adjustContents;
window.onresize = adjustContents;

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

	var map = document.getElementById("map");
	map.style.maxHeight = (height - getHeightOffset(map)) + "px";
	map.style.minWidth = (window.innerWidth-map.offsetLeft) + "px";
	map.style.maxWidth = map.style.minWidth;
}

function getHeightOffset(element)
{
	var computedStyle = window.getComputedStyle(element, null);
	return element.offsetTop
	+ (computedStyle.getPropertyValue("margin-top").replace("px", "")
	 + computedStyle.getPropertyValue("padding-top").replace("px", ""))*2;
}

function startEndGame(event)
{
	var startMenu = document.getElementById("startMenu");
	var gameMenu = document.getElementById("gameMenu");

	// Start game
	if (startMenu.style.display === ""
	 || startMenu.style.display === "block")
	{
<<<<<<< HEAD
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
=======
		startMenu.style.display = "none";
		gameMenu.style.display = "block";

		setPlayerDetails();

		initMapTiles();
	}
	else // End game
	{
		name.value = "";

		resetSpecies();
		resetAction();
		resetMap();

		startMenu.style.display = "block";
		gameMenu.style.display = "none";
	}

	if (event != null)
		event.preventDefault();
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
>>>>>>> refs/remotes/origin/develop
