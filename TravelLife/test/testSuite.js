var userInput = document.getElementById("userInput");
userInput.addEventListener('submit', startTest);

var queue = [];
var results = null;

function startTest(event)
{
	document.getElementById("passFail").innerText = "Test Passed";

	results = document.getElementById("results");
	results.innerHTML = "";

	var test = document.getElementById("test").value;
	switch (test)
	{
		case "clearResults":
			break;
		case "initAction":
			testInitAction();
			break;
		case "takeAction":
			testTakeAction();
			break;
		case "moveUpLeftRight":
			testMoveUpLeftRight();
			break;
		case "moveCenterLeftRight":
			testMoveCenterLeftRight();
			break;
		case "moveDownLeftRight":
			testMoveDownLeftRight();
			break;
		default:
			document.getElementById("passFail").innerText = "Test Failed";
			assert(false, "Test");
	}

	if (event != null)
		event.preventDefault();
}

function runTest(testFunctionName, testFunction)
{
	results = document.getElementById("results");
	results = assert(true, testFunctionName)
		.appendChild(document.createElement("ul"));
	testFunction();
}

function assert(value, desc)
{
	var li = document.createElement("li");
	li.className = (value ? "pass" : "fail");
	li.appendChild(document.createTextNode(desc));
	results.appendChild(li);
	if (!value)
	{
		document.getElementById("passFail").innerText = "Test Failed";
		li.parentNode.parentNode.className = "fail";
	}
		
	return li;
}

function initData(tileTypes, playerData, actionData)
{
	upLeftButton	= document.createElement("button");
	upButton		= document.createElement("button");
	upRightButton	= document.createElement("button");
	leftButton		= document.createElement("button");
	centerButton	= document.createElement("button");
	rightButton		= document.createElement("button");
	downLeftButton	= document.createElement("button");
	downButton		= document.createElement("button");
	downRightButton	= document.createElement("button");

	map = document.createElement("div");
	mapTiles = document.createElement("div");
	for (var i = 0; i < tileTypes.length; i++)
	{
		for (var j = 0; j < tileTypes[i].length; j++)
			createMapTile(i, j, getTileByCode(tileTypes[i][j]));
	}

	playerIcon = document.createElement("img");
	player = new Player("Player", (playerData.species == null ? new Human() : playerData.species));
	if (playerData.image != null)
		player.image = playerData.image;
	if (playerData.row != null)
		player.position.row = playerData.row;
	if (playerData.col != null)
		player.position.col = playerData.col;
	if (playerData.status != null)
		player.status = playerData.status;
	if (playerData.up != null)
		player.momentum.up = playerData.up;
	if (playerData.left != null)
		player.momentum.left = playerData.left;
	if (playerData.right != null)
		player.momentum.right = playerData.right;
	if (playerData.down != null)
		player.momentum.down = playerData.down;
	if (playerData.health != null)
		player.attributeMap.set(AttributeEnum.HEALTH, playerData.health);
	if (playerData.sight != null)
		player.attributeMap.set(AttributeEnum.SIGHT, playerData.sight);
	if (playerData.recovery != null)
		player.attributeMap.set(AttributeEnum.RECOVERY, playerData.recovery);
	if (playerData.endurance != null)
		player.attributeMap.set(AttributeEnum.ENDURANCE, playerData.endurance);
	if (playerData.climb != null)
		player.attributeMap.set(AttributeEnum.CLIMB, playerData.climb);
	if (playerData.jump != null)
		player.attributeMap.set(AttributeEnum.JUMP, playerData.jump);
	if (playerData.run != null)
		player.attributeMap.set(AttributeEnum.RUN, playerData.run);

	confirmAction = document.createElement("button");
	if (actionData != null && actionData.innerText != null)
		confirmAction.innerText = actionData.innerText;
}

function getTileByCode(code)
{
	var tile;

	switch (code)
	{
		case "B":
			tile = new Barrier();
			break;
		case "D":
			tile = new Dirt();
			break;
		case "G":
			tile = new Ground();
			break;
		case "S":
			tile = new Sky();
			break;
		case "W":
			tile = new Water();
			break;
		default:
			tile = new Barrier();
	}

	return tile;
}
