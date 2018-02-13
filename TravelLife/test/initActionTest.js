function testInitAction()
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

	mapTiles = document.createElement("div");

	runTest("BBB BSB BGB", test_BBB_BSB_BGB);
	runTest("BBB BSB BGB No Endurance", test_BBB_BSB_BGB_NoEndurance);

	runTest("SBS BSB BGB Climb Left", test_SBS_BSB_BGB_ClimbLeft);
	runTest("SBS BSB BGB Climb Right", test_SBS_BSB_BGB_ClimbRight);

	runTest("BSB BSB BGB Climb Left", test_BSB_BSB_BGB_ClimbLeft);
	runTest("BSB BSB BGB Fall", test_BSB_BSB_BGB_Fall);

	runTest("BSB BSB BSB Climb Left", test_BSB_BSB_BSB_ClimbLeft);
	runTest("BSB BSB BSB Fall", test_BSB_BSB_BSB_Fall);

	runTest("SSS BSB BSB Climb Left", test_SSS_BSB_BSB_ClimbLeft);
	runTest("SSS BSB BSB Climb Right", test_SSS_BSB_BSB_ClimbRight);

	runTest("SSS SSS BGB", test_SSS_SSS_BGB);
	runTest("SSS SSS BGB Run Left", test_SSS_SSS_BGB_RunLeft);
	runTest("SSS SSS BGB Run Right", test_SSS_SSS_BGB_RunRight);
	runTest("SSS SSS BGB No Endurance", test_SSS_SSS_BGB_NoEndurance);

	runTest("SSS SSS SGS", test_SSS_SSS_SGS);

	runTest("SSS SSS WGW", test_SSS_SSS_WGW);
};

function initData(tileTypes, playerData)
{
	mapTiles.innerHTML = "";

	for (var i = 0; i < tileTypes.length; i++)
	{
		for (var j = 0; j < tileTypes[i].length; j++)
			createMapTile(i, j, getTileByCode(tileTypes[i][j]));
	}

	player = new Player("Player", (playerData.species == null ? new Human() : playerData.species));

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
	if (playerData.endurance != null)
		player.attributeMap.set(AttributeEnum.ENDURANCE, playerData.endurance);
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

function test_BBB_BSB_BGB()
{
	initData([["B", "B", "B"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1});

	initAction();

	assert((upLeftButton.label === ActionEnum.CLIMB_LEFT), "upLeftButton: " + upLeftButton.label);
	assert(upButton.disabled, "upButton: " + upButton.label);
	assert((upRightButton.label === ActionEnum.CLIMB_RIGHT), "upRightButton: " + upRightButton.label);
	assert(leftButton.disabled, "leftButton: " + leftButton.label);
	assert(centerButton.disabled, "centerButton: " + centerButton.label);
	assert(rightButton.disabled, "rightButton: " + rightButton.label);
	assert(downLeftButton.disabled, "downLeftButton: " + downLeftButton.label);
	assert(downButton.disabled, "downButton: " + downButton.label);
	assert(downRightButton.disabled, "downRightButton: " + downRightButton.label);
}

function test_BBB_BSB_BGB_NoEndurance()
{
	initData([["B", "B", "B"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  endurance: 0});

	initAction();

	assert(upLeftButton.disabled, "upLeftButton: " + upLeftButton.label);
	assert(upButton.disabled, "upButton: " + upButton.label);
	assert(upRightButton.disabled, "upRightButton: " + upRightButton.label);
	assert(leftButton.disabled, "leftButton: " + leftButton.label);
	assert((centerButton.label === ActionEnum.REST), "centerButton: " + centerButton.label);
	assert(rightButton.disabled, "rightButton: " + rightButton.label);
	assert(downLeftButton.disabled, "downLeftButton: " + downLeftButton.label);
	assert(downButton.disabled, "downButton: " + downButton.label);
	assert(downRightButton.disabled, "downRightButton: " + downRightButton.label);
}

function test_SBS_BSB_BGB_ClimbLeft()
{
	initData([["S", "B", "S"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  left: 1});

	initAction();

	assert(upLeftButton.disabled, "upLeftButton: " + upLeftButton.label);
	assert(upButton.disabled, "upButton: " + upButton.label);
	assert(upRightButton.disabled, "upRightButton: " + upRightButton.label);
	assert(leftButton.disabled, "leftButton: " + leftButton.label);
	assert(centerButton.disabled, "centerButton: " + centerButton.label);
	assert((rightButton.label === ActionEnum.LET_GO), "rightButton: " + rightButton.label);
	assert(downLeftButton.disabled, "downLeftButton: " + downLeftButton.label);
	assert(downButton.disabled, "downButton: " + downButton.label);
	assert((downRightButton.label === ActionEnum.CLIMB_OFF), "downRightButton: " + downRightButton.label);
}

function test_SBS_BSB_BGB_ClimbRight()
{
	initData([["S", "B", "S"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  right: 1});

	initAction();

	assert(upLeftButton.disabled, "upLeftButton: " + upLeftButton.label);
	assert(upButton.disabled, "upButton: " + upButton.label);
	assert(upRightButton.disabled, "upRightButton: " + upRightButton.label);
	assert((leftButton.label === ActionEnum.LET_GO), "leftButton: " + leftButton.label);
	assert(centerButton.disabled, "centerButton: " + centerButton.label);
	assert(rightButton.disabled, "rightButton: " + rightButton.label);
	assert((downLeftButton.label === ActionEnum.CLIMB_OFF), "downLeftButton: " + downLeftButton.label);
	assert(downButton.disabled, "downButton: " + downButton.label);
	assert(downRightButton.disabled, "downRightButton: " + downRightButton.label);
}

function test_BSB_BSB_BGB_ClimbLeft()
{
	initData([["B", "S", "B"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  left: 1});

	initAction();

	assert(upLeftButton.disabled, "upLeftButton: " + upLeftButton.label);
	assert((upButton.label === ActionEnum.CLIMB_UP), "upButton: " + upButton.label);
	assert(upRightButton.disabled, "upRightButton: " + upRightButton.label);
	assert(leftButton.disabled, "leftButton: " + leftButton.label);
	assert(centerButton.disabled, "centerButton: " + centerButton.label);
	assert((rightButton.label === ActionEnum.LET_GO), "rightButton: " + rightButton.label);
	assert(downLeftButton.disabled, "downLeftButton: " + downLeftButton.label);
	assert(downButton.disabled, "downButton: " + downButton.label);
	assert((downRightButton.label === ActionEnum.CLIMB_OFF), "downRightButton: " + downRightButton.label);
}

function test_BSB_BSB_BGB_Fall()
{
	initData([["B", "S", "B"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: ActionEnum.FALL});

	initAction();

	assert(upLeftButton.disabled, "upLeftButton: " + upLeftButton.label);
	assert(upButton.disabled, "upButton: " + upButton.label);
	assert(upRightButton.disabled, "upRightButton: " + upRightButton.label);
	assert(leftButton.disabled, "leftButton: " + leftButton.label);
	assert(centerButton.disabled, "centerButton: " + centerButton.label);
	assert(rightButton.disabled, "rightButton: " + rightButton.label);
	assert(downLeftButton.disabled, "downLeftButton: " + downLeftButton.label);
	assert((downButton.label === ActionEnum.LAND), "downButton: " + downButton.label);
	assert(downRightButton.disabled, "downRightButton: " + downRightButton.label);
}

function test_BSB_BSB_BSB_ClimbLeft()
{
	initData([["B", "S", "B"],
			  ["B", "S", "B"],
			  ["B", "S", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  left: 1});

	initAction();

	assert(upLeftButton.disabled, "upLeftButton: " + upLeftButton.label);
	assert((upButton.label === ActionEnum.CLIMB_UP), "upButton: " + upButton.label);
	assert(upRightButton.disabled, "upRightButton: " + upRightButton.label);
	assert(leftButton.disabled, "leftButton: " + leftButton.label);
	assert(centerButton.disabled, "centerButton: " + centerButton.label);
	assert((rightButton.label === ActionEnum.LET_GO), "rightButton: " + rightButton.label);
	assert(downLeftButton.disabled, "downLeftButton: " + downLeftButton.label);
	assert((downButton.label === ActionEnum.CLIMB_DOWN), "downButton: " + downButton.label);
	assert(downRightButton.disabled, "downRightButton: " + downRightButton.label);
}

function test_BSB_BSB_BSB_Fall()
{
	initData([["B", "S", "B"],
			  ["B", "S", "B"],
			  ["B", "S", "B"]],
			 {row: 1, col: 1,
			  status: ActionEnum.FALL});

	initAction();

	assert(upLeftButton.disabled, "upLeftButton: " + upLeftButton.label);
	assert(upButton.disabled, "upButton: " + upButton.label);
	assert(upRightButton.disabled, "upRightButton: " + upRightButton.label);
	assert(leftButton.disabled, "leftButton: " + leftButton.label);
	assert(centerButton.disabled, "centerButton: " + centerButton.label);
	assert(rightButton.disabled, "rightButton: " + rightButton.label);
	assert(downLeftButton.disabled, "downLeftButton: " + downLeftButton.label);
	assert((downButton.label === ActionEnum.FALL), "downButton: " + downButton.label);
	assert(downRightButton.disabled, "downRightButton: " + downRightButton.label);
}

function test_SSS_BSB_BSB_ClimbLeft()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "S", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  left: 1});

	initAction();

	assert((upLeftButton.label === ActionEnum.CLIMB_OVER), "upLeftButton: " + upLeftButton.label);
	assert(upButton.disabled, "upButton: " + upButton.label);
	assert(upRightButton.disabled, "upRightButton: " + upRightButton.label);
	assert(leftButton.disabled, "leftButton: " + leftButton.label);
	assert(centerButton.disabled, "centerButton: " + centerButton.label);
	assert((rightButton.label === ActionEnum.LET_GO), "rightButton: " + rightButton.label);
	assert(downLeftButton.disabled, "downLeftButton: " + downLeftButton.label);
	assert((downButton.label === ActionEnum.CLIMB_DOWN), "downButton: " + downButton.label);
	assert(downRightButton.disabled, "downRightButton: " + downRightButton.label);
}

function test_SSS_BSB_BSB_ClimbRight()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "S", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  right: 1});

	initAction();

	assert(upLeftButton.disabled, "upLeftButton: " + upLeftButton.label);
	assert(upButton.disabled, "upButton: " + upButton.label);
	assert((upRightButton.label === ActionEnum.CLIMB_OVER), "upRightButton: " + upRightButton.label);
	assert((leftButton.label === ActionEnum.LET_GO), "leftButton: " + leftButton.label);
	assert(centerButton.disabled, "centerButton: " + centerButton.label);
	assert(rightButton.disabled, "rightButton: " + rightButton.label);
	assert(downLeftButton.disabled, "downLeftButton: " + downLeftButton.label);
	assert((downButton.label === ActionEnum.CLIMB_DOWN), "downButton: " + downButton.label);
	assert(downRightButton.disabled, "downRightButton: " + downRightButton.label);
}

function test_SSS_SSS_BGB()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1});

	initAction();

	assert(upLeftButton.disabled, "upLeftButton: " + upLeftButton.label);
	assert(upButton.disabled, "upButton: " + upButton.label);
	assert(upRightButton.disabled, "upRightButton: " + upRightButton.label);
	assert((leftButton.label === ActionEnum.RUN_LEFT), "leftButton: " + leftButton.label);
	assert(centerButton.disabled, "centerButton: " + centerButton.label);
	assert((rightButton.label === ActionEnum.RUN_RIGHT), "rightButton: " + rightButton.label);
	assert(downLeftButton.disabled, "downLeftButton: " + downLeftButton.label);
	assert(downButton.disabled, "downButton: " + downButton.label);
	assert(downRightButton.disabled, "downRightButton: " + downRightButton.label);
}

function test_SSS_SSS_BGB_RunLeft()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.RUN,
			  left: 1});

	initAction();

	assert(upLeftButton.disabled, "upLeftButton: " + upLeftButton.label);
	assert(upButton.disabled, "upButton: " + upButton.label);
	assert(upRightButton.disabled, "upRightButton: " + upRightButton.label);
	assert((leftButton.label === ActionEnum.RUN_LEFT), "leftButton: " + leftButton.label);
	assert((centerButton.label === ActionEnum.STOP), "centerButton: " + centerButton.label);
	assert(rightButton.disabled, "rightButton: " + rightButton.label);
	assert(downLeftButton.disabled, "downLeftButton: " + downLeftButton.label);
	assert(downButton.disabled, "downButton: " + downButton.label);
	assert(downRightButton.disabled, "downRightButton: " + downRightButton.label);
}

function test_SSS_SSS_BGB_RunRight()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.RUN,
			  right: 1});

	initAction();

	assert(upLeftButton.disabled, "upLeftButton: " + upLeftButton.label);
	assert(upButton.disabled, "upButton: " + upButton.label);
	assert(upRightButton.disabled, "upRightButton: " + upRightButton.label);
	assert(leftButton.disabled, "leftButton: " + leftButton.label);
	assert((centerButton.label === ActionEnum.STOP), "centerButton: " + centerButton.label);
	assert((rightButton.label === ActionEnum.RUN_RIGHT), "rightButton: " + rightButton.label);
	assert(downLeftButton.disabled, "downLeftButton: " + downLeftButton.label);
	assert(downButton.disabled, "downButton: " + downButton.label);
	assert(downRightButton.disabled, "downRightButton: " + downRightButton.label);
}

function test_SSS_SSS_BGB_NoEndurance()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  endurance: 0});

	initAction();

	assert(upLeftButton.disabled, "upLeftButton: " + upLeftButton.label);
	assert(upButton.disabled, "upButton: " + upButton.label);
	assert(upRightButton.disabled, "upRightButton: " + upRightButton.label);
	assert(leftButton.disabled, "leftButton: " + leftButton.label);
	assert((centerButton.label === ActionEnum.REST), "centerButton: " + centerButton.label);
	assert(rightButton.disabled, "rightButton: " + rightButton.label);
	assert(downLeftButton.disabled, "downLeftButton: " + downLeftButton.label);
	assert(downButton.disabled, "downButton: " + downButton.label);
	assert(downRightButton.disabled, "downRightButton: " + downRightButton.label);
}

function test_SSS_SSS_SGS()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: 1, col: 1});

	initAction();

	assert(upLeftButton.disabled, "upLeftButton: " + upLeftButton.label);
	assert(upButton.disabled, "upButton: " + upButton.label);
	assert(upRightButton.disabled, "upRightButton: " + upRightButton.label);
	assert(leftButton.disabled, "leftButton: " + leftButton.label);
	assert(centerButton.disabled, "centerButton: " + centerButton.label);
	assert(rightButton.disabled, "rightButton: " + rightButton.label);
	assert(downLeftButton.disabled, "downLeftButton: " + downLeftButton.label);
	assert(downButton.disabled, "downButton: " + downButton.label);
	assert(downRightButton.disabled, "downRightButton: " + downRightButton.label);
}

function test_SSS_SSS_WGW()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["W", "G", "W"]],
			 {row: 1, col: 1});

	initAction();

	assert(upLeftButton.disabled, "upLeftButton: " + upLeftButton.label);
	assert(upButton.disabled, "upButton: " + upButton.label);
	assert(upRightButton.disabled, "upRightButton: " + upRightButton.label);
	assert(leftButton.disabled, "leftButton: " + leftButton.label);
	assert(centerButton.disabled, "centerButton: " + centerButton.label);
	assert(rightButton.disabled, "rightButton: " + rightButton.label);
	assert(downLeftButton.disabled, "downLeftButton: " + downLeftButton.label);
	assert(downButton.disabled, "downButton: " + downButton.label);
	assert(downRightButton.disabled, "downRightButton: " + downRightButton.label);
}