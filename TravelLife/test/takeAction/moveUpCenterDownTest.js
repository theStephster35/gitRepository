function testMoveUpCenterDown()
{
	// Move Up
	runTest("Test Climb Up Left", testClimb_UpLeft);
	runTest("Test Climb Up Left - No Endurance/Climb", testClimb_UpLeft_NoEnduranceClimb);
	runTest("Test Climb Up Right", testClimb_UpRight);
	runTest("Test Climb Up Right - No Endurance/Climb", testClimb_UpRight_NoEnduranceClimb);
	runTest("Test Jump Up", testJump_Up);
	runTest("Test Jump Up Left", testJump_UpLeft);
	runTest("Test Jump Up Right", testJump_UpRight);
	runTest("Test Rise Up", testRise_Up);
	runTest("Test Rise Up Left", testRise_UpLeft);
	runTest("Test Rise Up Right", testRise_UpRight);
	runTest("Test Swim Up", testSwim_Up);
	runTest("Test Swim Up - No Swim", testSwim_Up_NoSwim);
	runTest("Test Swim Up - No Endurance", testSwim_Up_NoEndurance);
	runTest("Test Swim Up - No Endurance/Swim", testSwim_Up_NoEnduranceSwim);
	runTest("Test Dig Up - Left", testDig_Up_Left);
	runTest("Test Dig Up - Left, Climb", testDig_Up_LeftClimb);
	runTest("Test Dig Up - Left, Fall", testDig_Up_LeftFall);
	runTest("Test Dig Up - Left, No Endurance", testDig_Up_LeftNoEndurance);
	runTest("Test Dig Up - Right", testDig_Up_Right);
	runTest("Test Dig Up - Right, Climb", testDig_Up_RightClimb);
	runTest("Test Dig Up - Right, Fall", testDig_Up_RightFall);
	runTest("Test Dig Up - Right, No Endurance", testDig_Up_RightNoEndurance);

	// Stay Center
	runTest("Test Stop - Jump", testStop_Jump);
	runTest("Test Stop - Jump, No Endurance/Jump", testStop_Jump_NoEnduranceJump);
	runTest("Test Stop - Run", testStop_Run);
	runTest("Test Stop - Run, No Endurance/Run", testStop_Run_NoEnduranceRun);
	runTest("Test Stop - Dig", testStop_Dig);
	runTest("Test Stop - Dig, No Endurance/Dig", testStop_Dig_NoEnduranceDig);
	runTest("Test Rest", testRest);
	runTest("Test Float", testFloat);
	runTest("Test Collect - Small, Full", testCollect_Small_Full);
	runTest("Test Collect - Small, Health", testCollect_Small_Health);
	runTest("Test Collect - Small, Sight", testCollect_Small_Sight);
	runTest("Test Collect - Small, Recovery", testCollect_Small_Recovery);
	runTest("Test Collect - Small, Endurance", testCollect_Small_Endurance);
	runTest("Test Collect - Big", testCollect_Big);

	// Move Down
	runTest("Test Climb Down Left", testClimb_DownLeft);
	runTest("Test Climb Down Left - No Endurance/Climb", testClimb_DownLeft_NoEnduranceClimb);
	runTest("Test Climb Down Right", testClimb_DownRight);
	runTest("Test Climb Down Right - No Endurance/Climb", testClimb_DownRight_NoEnduranceClimb);
	runTest("Test Fall Down - Left", testFall_Down_Left);
	runTest("Test Fall Down - Left-Down", testFall_Down_LeftDown);
	runTest("Test Fall Down - Right", testFall_Down_Right);
	runTest("Test Fall Down - Right-Down", testFall_Down_RightDown);
	runTest("Test Land", testLand);
	runTest("Test Splash", testSplash);
	runTest("Test Swim Down", testSwim_Down);
	runTest("Test Swim Down - No Swim", testSwim_Down_NoSwim);
	runTest("Test Swim Down - No Endurance", testSwim_Down_NoEndurance);
	runTest("Test Swim Down - No Endurance/Swim", testSwim_Down_NoEnduranceSwim);
	runTest("Test Dig Down", testDig_Down);
	runTest("Test Dig Down - Stop", testDig_Down_Stop);
	runTest("Test Dig Down - Fall", testDig_Down_Fall);
	runTest("Test Dig Down - No Endurance/Dig", testDig_Down_NoEnduranceDig);
}

function testClimb_UpLeft()
{
	var testImage = "images/Species/" + (new Human()).type + "/"
				  + ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png";
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["B", "S", "B"],
					 ["B", "S", "B"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  left: 1,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.CLIMB_UP});

	moveUp(true);

	var speciesClimb = player.species.attributeMap.get(AttributeEnum.CLIMB);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: StatusEnum.CLIMBING,
						left: 1,
						sight: testSight,
						endurance: (player.attributeMap.get(AttributeEnum.CLIMB) === speciesClimb
								  ? (testEndurance-1) : testEndurance),
						climb: {min: 0, max: speciesClimb},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testClimb_UpLeft_NoEnduranceClimb()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["B", "S", "B"],
					 ["B", "S", "B"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  left: 1,
			  health: testHealth, sight: testSight, endurance: 1, climb: 1},
			 {innerText: ActionEnum.CLIMB_UP});

	moveUp(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.FALLING,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testClimb_UpRight()
{
	var testImage = "images/Species/" + (new Human()).type + "/"
				  + ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png";
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["B", "S", "B"],
					 ["B", "S", "B"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  right: 1,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.CLIMB_UP});

	moveUp(true);

	var speciesClimb = player.species.attributeMap.get(AttributeEnum.CLIMB);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: StatusEnum.CLIMBING,
						right: 1,
						sight: testSight,
						endurance: (player.attributeMap.get(AttributeEnum.CLIMB) === speciesClimb
								  ? (testEndurance-1) : testEndurance),
						climb: {min: 0, max: speciesClimb},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testClimb_UpRight_NoEnduranceClimb()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["B", "S", "B"],
					 ["B", "S", "B"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  right: 1,
			  health: testHealth, sight: testSight, endurance: 1, climb: 1},
			 {innerText: ActionEnum.CLIMB_UP});

	moveUp(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.FALLING,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testJump_Up()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["B", "S", "B"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.JUMP_UP});

	moveUp(true);

	var speciesJump = player.species.attributeMap.get(AttributeEnum.JUMP);
	var falling = (player.attributeMap.get(AttributeEnum.JUMP) === speciesJump);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: (falling ? StatusEnum.FALLING : StatusEnum.JUMPING),
						up: (falling ? 0 : 1),
						sight: testSight,
						endurance: (falling ? (testEndurance-1) : testEndurance),
						jump: {min: 1, max: speciesJump},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testJump_UpLeft()
{
	var testRow = 1;
	var testCol = 1;
	var testLeft = 2;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "S"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  left: testLeft,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.JUMP_UP});

	moveUp(true);

	var speciesJump = player.species.attributeMap.get(AttributeEnum.JUMP);
	var falling = (player.attributeMap.get(AttributeEnum.JUMP) === speciesJump);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/" + ActionEnum.JUMP_LEFT.replace(" ", "") + ".png",
						row: testRow,
						col: testCol,
						status: (falling ? StatusEnum.FALLING : StatusEnum.JUMPING),
						up: (falling ? 0 : 1),
						left: (testLeft-1),
						sight: testSight,
						endurance: (falling ? (testEndurance-1) : testEndurance),
						jump: {min: 1, max: speciesJump},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testJump_UpRight()
{
	var testRow = 1;
	var testCol = 1;
	var testRight = 2;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  right: testRight,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.JUMP_UP});

	moveUp(true);

	var speciesJump = player.species.attributeMap.get(AttributeEnum.JUMP);
	var falling = (player.attributeMap.get(AttributeEnum.JUMP) === speciesJump);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/" + ActionEnum.JUMP_RIGHT.replace(" ", "") + ".png",
						row: testRow,
						col: testCol,
						status: (falling ? StatusEnum.FALLING : StatusEnum.JUMPING),
						up: (falling ? 0 : 1),
						right: (testRight-1),
						sight: testSight,
						endurance: (falling ? (testEndurance-1) : testEndurance),
						jump: {min: 1, max: speciesJump},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testRise_Up()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["B", "S", "B"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.RISE_UP});

	moveUp(true);

	var speciesJump = player.species.attributeMap.get(AttributeEnum.JUMP);
	var falling = (player.attributeMap.get(AttributeEnum.JUMP) === speciesJump);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: (falling ? StatusEnum.FALLING : StatusEnum.JUMPING),
						up: (falling ? 0 : 1),
						sight: testSight,
						endurance: (falling ? (testEndurance-1) : testEndurance),
						jump: {min: 1, max: speciesJump},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testRise_UpLeft()
{
	var testImage = "images/Species/" + (new Human()).type + "/" + ActionEnum.JUMP_LEFT.replace(" ", "") + ".png";
	var testRow = 1;
	var testCol = 1;
	var testLeft = 2;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "S"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  left: testLeft,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.RISE_UP});

	moveUp(true);

	var speciesJump = player.species.attributeMap.get(AttributeEnum.JUMP);
	var falling = (player.attributeMap.get(AttributeEnum.JUMP) === speciesJump);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: (falling ? StatusEnum.FALLING : StatusEnum.JUMPING),
						up: (falling ? 0 : 1),
						left: (testLeft-1),
						sight: testSight,
						endurance: (falling ? (testEndurance-1) : testEndurance),
						jump: {min: 1, max: speciesJump},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testRise_UpRight()
{
	var testImage = "images/Species/" + (new Human()).type + "/" + ActionEnum.JUMP_RIGHT.replace(" ", "") + ".png";
	var testRow = 1;
	var testCol = 1;
	var testRight = 2;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  right: testRight,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.RISE_UP});

	moveUp(true);

	var speciesJump = player.species.attributeMap.get(AttributeEnum.JUMP);
	var falling = (player.attributeMap.get(AttributeEnum.JUMP) === speciesJump);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: (falling ? StatusEnum.FALLING : StatusEnum.JUMPING),
						up: (falling ? 0 : 1),
						right: (testRight-1),
						sight: testSight,
						endurance: (falling ? (testEndurance-1) : testEndurance),
						jump: {min: 1, max: speciesJump},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testSwim_Up()
{
	var testImage = "images/Species/" + (new Human()).type + "/Suspended.png";
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["W", "W", "W"],
					 ["W", "W", "W"],
					 ["W", "W", "W"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.SWIM_UP});

	moveUp(true);

	var speciesSwim = player.species.attributeMap.get(AttributeEnum.SWIM);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: StatusEnum.SWIMMING,
						sight: testSight,
						endurance: (player.attributeMap.get(AttributeEnum.SWIM) === speciesSwim
									? (testEndurance-1) : testEndurance),
						swim: {min: 1, max: speciesSwim},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testSwim_Up_NoSwim()
{
	var testImage = "images/Species/" + (new Human()).type + "/Suspended.png";
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["W", "W", "W"],
					 ["W", "W", "W"],
					 ["W", "W", "W"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  health: testHealth, sight: testSight, endurance: 1, swim: 1},
			 {innerText: ActionEnum.SWIM_UP});

	moveUp(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: StatusEnum.SWIMMING,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: player.species.attributeMap.get(AttributeEnum.SWIM),
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testSwim_Up_NoEndurance()
{
	var testImage = "images/Species/" + (new Human()).type + "/Suspended.png";
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["W", "W", "W"],
					 ["W", "W", "W"],
					 ["W", "W", "W"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  health: testHealth, sight: testSight, endurance: 0},
			 {innerText: ActionEnum.SWIM_UP});

	moveUp(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: StatusEnum.SWIMMING,
						health: (player.attributeMap.get(AttributeEnum.SWIM) === 0
								 ? (testHealth-1) : testHealth),
						sight: testSight,
						endurance: 0,
						swim: {min: 0, max: (player.species.attributeMap.get(AttributeEnum.SWIM)-1)},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testSwim_Up_NoEnduranceSwim()
{
	var testImage = "images/Species/" + (new Human()).type + "/Suspended.png";
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["W", "W", "W"],
					 ["W", "W", "W"],
					 ["W", "W", "W"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  health: testHealth, sight: testSight, endurance: 0, swim: 0},
			 {innerText: ActionEnum.SWIM_UP});

	moveUp(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: StatusEnum.SWIMMING,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: 0,
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testDig_Up_Left()
{
	var testImage =  "images/Species/" + (new Human()).type + "/" + ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png";
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["G", "G", "G"],
					 ["G", "S", "G"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  left: 1,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.DIG_UP});

	var testDurability = 3;
	var row = 0;
	var col = 1;
	mapTiles.children[row].children[col].value = testDurability;

	moveUp(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: StatusEnum.CLIMBING,
						left: 1,
						sight: testSight,
						endurance: (testEndurance-1),
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 9,
						tilesTraveled: 1});

	validateTakeActionData("durability", mapTiles.children[row].children[col].value, -1, (testDurability-1));
}

function testDig_Up_LeftClimb()
{
	var testImage =  "images/Species/" + (new Human()).type + "/" + ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png";
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["G", "G", "G"],
					 ["G", "S", "G"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  left: 1,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.DIG_UP});

	var row = 0;
	var col = 1;
	mapTiles.children[row].children[col].value = 1;

	moveUp(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: StatusEnum.CLIMBING,
						left: 1,
						sight: testSight,
						endurance: (testEndurance-1),
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 12,
						tilesTraveled: 2});

	validateTakeActionData("durability", mapTiles.children[(row+1)].children[col].value, -1, -1);
}

function testDig_Up_LeftFall()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "G", "S"],
					 ["G", "S", "G"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  left: 1,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.DIG_UP});

	var row = 0;
	var col = 1;
	mapTiles.children[row].children[col].value = 1;

	moveUp(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.FALLING,
						left: 0,
						sight: testSight,
						endurance: (testEndurance-1),
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 12,
						tilesTraveled: 2});

	validateTakeActionData("durability", mapTiles.children[(row+1)].children[col].value, -1, -1);
}

function testDig_Up_LeftNoEndurance()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["S", "G", "S"],
					 ["G", "S", "G"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  left: 1,
			  health: testHealth, sight: testSight, endurance: 1},
			 {innerText: ActionEnum.DIG_UP});

	var testDurability = 3;
	var row = 0;
	var col = 1;
	mapTiles.children[row].children[col].value = testDurability;

	moveUp(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.FALLING,
						left: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 9,
						tilesTraveled: 1});

	validateTakeActionData("durability", mapTiles.children[row].children[col].value, -1, (testDurability-1));
}

function testDig_Up_Right()
{
	var testImage =  "images/Species/" + (new Human()).type + "/" + ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png";
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["G", "G", "G"],
					 ["G", "S", "G"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  right: 1,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.DIG_UP});

	var testDurability = 3;
	var row = 0;
	var col = 1;
	mapTiles.children[row].children[col].value = testDurability;

	moveUp(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: StatusEnum.CLIMBING,
						right: 1,
						sight: testSight,
						endurance: (testEndurance-1),
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 9,
						tilesTraveled: 1});

	validateTakeActionData("durability", mapTiles.children[row].children[col].value, -1, (testDurability-1));
}

function testDig_Up_RightClimb()
{
	var testImage =  "images/Species/" + (new Human()).type + "/" + ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png";
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["G", "G", "G"],
					 ["G", "S", "G"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  right: 1,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.DIG_UP});

	var row = 0;
	var col = 1;
	mapTiles.children[row].children[col].value = 1;

	moveUp(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: StatusEnum.CLIMBING,
						right: 1,
						sight: testSight,
						endurance: (testEndurance-1),
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 12,
						tilesTraveled: 2});

	validateTakeActionData("durability", mapTiles.children[(row+1)].children[col].value, -1, -1);
}

function testDig_Up_RightFall()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "G", "S"],
					 ["G", "S", "G"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  right: 1,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.DIG_UP});

	var row = 0;
	var col = 1;
	mapTiles.children[row].children[col].value = 1;

	moveUp(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.FALLING,
						right: 0,
						sight: testSight,
						endurance: (testEndurance-1),
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 12,
						tilesTraveled: 2});

	validateTakeActionData("durability", mapTiles.children[(row+1)].children[col].value, -1, -1);
}

function testDig_Up_RightNoEndurance()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["S", "G", "S"],
					 ["G", "S", "G"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  right: 1,
			  health: testHealth, sight: testSight, endurance: 1},
			 {innerText: ActionEnum.DIG_UP});

	var testDurability = 3;
	var row = 0;
	var col = 1;
	mapTiles.children[row].children[col].value = testDurability;

	moveUp(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.FALLING,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						tilesExposed: 9,
						tilesTraveled: 1});

	validateTakeActionData("durability", mapTiles.children[row].children[col].value, -1, (testDurability-1));
}

function testStop_Jump()
{
	var testImage = "images/Species/" + (new Human()).type + "/Suspended.png";
	var testRow = 1;
	var testCol = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1, down: 1,
			  endurance: testEndurance, jump: 0},
			 {innerText: ActionEnum.STOP});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: StatusEnum.FALLING,
						up: 0,
						down: 0,
						endurance: (testEndurance-1),
						jump: player.species.attributeMap.get(AttributeEnum.JUMP),
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testStop_Jump_NoEnduranceJump()
{
	var testImage = "images/Species/" + (new Human()).type + "/Suspended.png";
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1, down: 1,
			  health: testHealth, endurance: 1, jump: 0},
			 {innerText: ActionEnum.STOP});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: StatusEnum.FALLING,
						up: 0,
						down: 0,
						health: (testHealth-1),
						endurance: 0,
						jump: player.species.attributeMap.get(AttributeEnum.JUMP),
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testStop_Run()
{
	var testRow = 1;
	var testCol = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  left: 1, right: 1,
			  endurance: testEndurance, run: 0},
			 {innerText: ActionEnum.STOP});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.STOPPED,
						left: 0,
						right: 0,
						endurance: (testEndurance-1),
						run: player.species.attributeMap.get(AttributeEnum.RUN),
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testStop_Run_NoEnduranceRun()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  left: 1, right: 1,
			  health: testHealth, endurance: 1, run: 0},
			 {innerText: ActionEnum.STOP});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.STOPPED,
						left: 0,
						right: 0,
						health: (testHealth-1),
						endurance: 0,
						run: player.species.attributeMap.get(AttributeEnum.RUN),
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testStop_Dig()
{
	var testRow = 1;
	var testCol = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["G", "S", "G"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  left: 1, right: 1, down: 1,
			  endurance: testEndurance, dig: 0},
			 {innerText: ActionEnum.STOP});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.STOPPED,
						left: 0,
						right: 0,
						down: 0,
						endurance: (testEndurance-1),
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testStop_Dig_NoEnduranceDig()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var tileTypes = [["S", "S", "S"],
					 ["G", "S", "G"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  left: 1, right: 1, down: 1,
			  health: testHealth, endurance: 1, dig: 0},
			 {innerText: ActionEnum.STOP});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.STOPPED,
						left: 0,
						right: 0,
						down: 0,
						health: (testHealth-1),
						endurance: 0,
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testRest()
{
	var testRow = 1;
	var testCol = 1;
	var testRecovery = 3;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  recovery: testRecovery, endurance: 0},
			 {innerText: ActionEnum.REST});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						row: testRow,
						col: testCol,
						sight: {min: 1, max: player.species.attributeMap.get(AttributeEnum.SIGHT)},
						recovery: {min: 0, max: testRecovery},
						endurance: {min: 1, max: testRecovery},
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testFloat()
{
	var testRow = 1;
	var testCol = 1;
	var testRecovery = 3;
	var tileTypes = [["S", "S", "S"],
					 ["B", "W", "B"],
					 ["B", "B", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  recovery: testRecovery, endurance: 0},
			 {innerText: ActionEnum.FLOAT});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						row: testRow,
						col: testCol,
						sight: {min: 1, max: player.species.attributeMap.get(AttributeEnum.SIGHT)},
						recovery: {min: 0, max: testRecovery},
						endurance: {min: 1, max: (Math.ceil(testRecovery/2))},
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testCollect_Small_Full()
{
	var testRow = 1;
	var testCol = 1;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["G", "G", "G"]];

	initData(tileTypes,
			 {row: testRow, col: testCol},
			 {innerText: ActionEnum.COLLECT},
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						row: testRow,
						col: testCol,
						tilesExposed: 9,
						tilesTraveled: 1});

	validateTakeActionData("treasure", treasureMap.get(testRow).get(testCol).attribute,
			null, {option: (new SmallTreasure(1, testRow, testCol)).probabilityMap.keys()});
	validateTakeActionData("treasures", treasureMap.size, -1, 1);
}

function testCollect_Small_Health()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 1;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["G", "G", "G"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  health: testHealth},
			 {innerText: ActionEnum.COLLECT},
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						row: testRow,
						col: testCol,
						health: (testHealth+1),
						tilesExposed: 9,
						tilesTraveled: 1,
						treasuresCollected: 1});

	validateTakeActionData("treasures", treasureMap.size, -1, 0);
}

function testCollect_Small_Sight()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["G", "G", "G"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  sight: testSight},
			 {innerText: ActionEnum.COLLECT},
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	stayCenter(true);

	validateTakeAction({rows: (tileTypes.length+2),
						cols: (tileTypes[0].length+2),
						row: (testRow+1),
						col: (testCol+1),
						sight: (testSight+1),
						tilesExposed: 25,
						tilesTraveled: 1,
						treasuresCollected: 1});

	validateTakeActionData("treasures", treasureMap.size, -1, {min: 0, max: 14});
}

function testCollect_Small_Recovery()
{
	var testRow = 1;
	var testCol = 1;
	var testRecovery = 1;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["G", "G", "G"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  recovery: testRecovery},
			 {innerText: ActionEnum.COLLECT},
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						row: testRow,
						col: testCol,
						recovery: (testRecovery+1),
						tilesExposed: 9,
						tilesTraveled: 1,
						treasuresCollected: 1});

	validateTakeActionData("treasures", treasureMap.size, -1, 0);
}

function testCollect_Small_Endurance()
{
	var testRow = 1;
	var testCol = 1;
	var testEndurance = 1;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["G", "G", "G"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  endurance: testEndurance},
			 {innerText: ActionEnum.COLLECT},
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						row: testRow,
						col: testCol,
						endurance: (testEndurance+1),
						tilesExposed: 9,
						tilesTraveled: 1,
						treasuresCollected: 1});

	validateTakeActionData("treasures", treasureMap.size, -1, 0);
}

function testCollect_Big()
{
	var testRow = 1;
	var testCol = 1;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["G", "G", "G"]];

	initData(tileTypes,
			 {row: testRow, col: testCol},
			 {innerText: ActionEnum.COLLECT},
			 {type: TreasureTypeEnum.BIG,
			  row: testRow, col: testCol});

	stayCenter(true);

	var result = "";
	var attribute = "None";
	var human = new Human();
	if (player.species.attributeMap.get(AttributeEnum.HEALTH) === (human.attributeMap.get(AttributeEnum.HEALTH)+1))
	{
		result += AttributeEnum.HEALTH;
		attribute = AttributeEnum.HEALTH;
	}
	if (player.species.attributeMap.get(AttributeEnum.SIGHT) === (human.attributeMap.get(AttributeEnum.SIGHT)+1))
	{
		result += AttributeEnum.SIGHT;
		attribute = AttributeEnum.SIGHT;
	}
	if (player.species.attributeMap.get(AttributeEnum.RECOVERY) === (human.attributeMap.get(AttributeEnum.RECOVERY)+1))
	{
		result += AttributeEnum.RECOVERY;
		attribute = AttributeEnum.RECOVERY;
	}
	if (player.species.attributeMap.get(AttributeEnum.ENDURANCE) === (human.attributeMap.get(AttributeEnum.ENDURANCE)+1))
	{
		result += AttributeEnum.ENDURANCE;
		attribute = AttributeEnum.ENDURANCE;
	}
	if (player.species.attributeMap.get(AttributeEnum.CLIMB) === (human.attributeMap.get(AttributeEnum.CLIMB)+1))
	{
		result += AttributeEnum.CLIMB;
		attribute = AttributeEnum.CLIMB;
	}
	if (player.species.attributeMap.get(AttributeEnum.JUMP) === (human.attributeMap.get(AttributeEnum.JUMP)+1))
	{
		result += AttributeEnum.JUMP;
		attribute = AttributeEnum.JUMP;
	}
	if (player.species.attributeMap.get(AttributeEnum.RUN) === (human.attributeMap.get(AttributeEnum.RUN)+1))
	{
		result += AttributeEnum.RUN;
		attribute = AttributeEnum.RUN;
	}
	if (player.species.attributeMap.get(AttributeEnum.SWIM) === (human.attributeMap.get(AttributeEnum.SWIM)+1))
	{
		result += AttributeEnum.SWIM;
		attribute = AttributeEnum.SWIM;
	}
	if (player.species.attributeMap.get(AttributeEnum.DIG) === (human.attributeMap.get(AttributeEnum.DIG)+1))
	{
		result += AttributeEnum.DIG;
		attribute = AttributeEnum.DIG;
	}

	player.attributeMap.set(attribute, (player.attributeMap.get(attribute)+1));

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						row: testRow,
						col: testCol,
						tilesExposed: 9,
						tilesTraveled: 1,
						treasuresCollected: 1});

	validateTakeActionData("attribute", attribute, "", result);
}

function testClimb_DownLeft()
{
	var testImage = "images/Species/" + (new Human()).type + "/"
				  + ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png";
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["B", "S", "B"],
					 ["B", "S", "B"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  left: 1,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.CLIMB_DOWN});

	moveDown(true);

	var speciesClimb = player.species.attributeMap.get(AttributeEnum.CLIMB);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: (testRow+1),
						col: testCol,
						status: StatusEnum.CLIMBING,
						left: 1,
						sight: testSight,
						endurance: (player.attributeMap.get(AttributeEnum.CLIMB) === speciesClimb
									? (testEndurance-1) : testEndurance),
						climb: {min: 0, max: speciesClimb},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testClimb_DownLeft_NoEnduranceClimb()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["B", "S", "B"],
					 ["B", "S", "B"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  left: 1,
			  health: testHealth, sight: testSight, endurance: 1, climb: 1},
			 {innerText: ActionEnum.CLIMB_DOWN});

	moveDown(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: (testRow+1),
						col: testCol,
						status: StatusEnum.FALLING,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testClimb_DownRight()
{
	var testImage = "images/Species/" + (new Human()).type + "/"
				  + ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png";
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["B", "S", "B"],
					 ["B", "S", "B"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  right: 1,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.CLIMB_DOWN});

	moveDown(true);

	var speciesClimb = player.species.attributeMap.get(AttributeEnum.CLIMB);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: (testRow+1),
						col: testCol,
						status: StatusEnum.CLIMBING,
						right: 1,
						sight: testSight,
						endurance: (player.attributeMap.get(AttributeEnum.CLIMB) === speciesClimb
									? (testEndurance-1) : testEndurance),
						climb: {min: 0, max: speciesClimb},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testClimb_DownRight_NoEnduranceClimb()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["B", "S", "B"],
					 ["B", "S", "B"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  right: 1,
			  health: testHealth, sight: testSight, endurance: 1, climb: 1},
			 {innerText: ActionEnum.CLIMB_DOWN});

	moveDown(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: (testRow+1),
						col: testCol,
						status: StatusEnum.FALLING,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testFall_Down_Left()
{
	var testImage = "images/Species/" + (new Human()).type + "/" + ActionEnum.JUMP_LEFT.replace(" ", "") + ".png";
	var testRow = 2;
	var testCol = 2;
	var testLeft = 2;
	var testDown = 0;
	var testSight = 2;
	var tileTypes = [["B", "B", "B", "B", "B"],
					 ["B", "B", "S", "B", "B"],
					 ["B", "B", "S", "B", "B"],
					 ["B", "B", "S", "B", "B"],
					 ["B", "B", "B", "B", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  left: testLeft, down: testDown,
			  sight: testSight, jump: 0},
			 {innerText: ActionEnum.FALL_DOWN});

	moveDown(true);
	var sightRetained = player.attributeMap.get(AttributeEnum.SIGHT) === testSight;

	validateTakeAction({rows: (tileTypes.length + (sightRetained ? 1 : 0)),
						cols: tileTypes[0].length,
						image: testImage,
						row: (testRow+1),
						col: testCol,
						status: StatusEnum.FALLING,
						left: (testLeft-1),
						down: (testDown+1),
						sight: {min: 1, max: player.species.attributeMap.get(AttributeEnum.SIGHT)},
						jump: player.species.attributeMap.get(AttributeEnum.JUMP),
						tilesExposed: 25 + (sightRetained  ? 5 : 0),
						tilesTraveled: 2});
}

function testFall_Down_LeftDown()
{
	var testRow = 2;
	var testCol = 2;
	var testDown = 0;
	var testSight = 2;
	var tileTypes = [["B", "B", "B", "B", "B"],
					 ["B", "B", "S", "B", "B"],
					 ["B", "B", "S", "B", "B"],
					 ["B", "B", "S", "B", "B"],
					 ["B", "B", "B", "B", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  left: 1, down: testDown,
			  sight: testSight, jump: 0},
			 {innerText: ActionEnum.FALL_DOWN});

	moveDown(true);
	var sightRetained = player.attributeMap.get(AttributeEnum.SIGHT) === testSight;

	validateTakeAction({rows: (tileTypes.length + (sightRetained ? 1 : 0)),
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: (testRow+1),
						col: testCol,
						status: StatusEnum.FALLING,
						left: 0,
						down: (testDown+1),
						sight: {min: 1, max: player.species.attributeMap.get(AttributeEnum.SIGHT)},
						jump: player.species.attributeMap.get(AttributeEnum.JUMP),
						tilesExposed: 25 + (sightRetained  ? 5 : 0),
						tilesTraveled: 2});
}

function testFall_Down_Right()
{
	var testImage = "images/Species/" + (new Human()).type + "/" + ActionEnum.JUMP_LEFT.replace(" ", "") + ".png";
	var testRow = 2;
	var testCol = 2;
	var testRight = 2;
	var testDown = 0;
	var testSight = 2;
	var tileTypes = [["B", "B", "B", "B", "B"],
					 ["B", "B", "S", "B", "B"],
					 ["B", "B", "S", "B", "B"],
					 ["B", "B", "S", "B", "B"],
					 ["B", "B", "B", "B", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  right: testRight, down: testDown,
			  sight: testSight, jump: 0},
			 {innerText: ActionEnum.FALL_DOWN});

	moveDown(true);
	var sightRetained = player.attributeMap.get(AttributeEnum.SIGHT) === testSight;

	validateTakeAction({rows: (tileTypes.length + (sightRetained ? 1 : 0)),
						cols: tileTypes[0].length,
						image: testImage,
						row: (testRow+1),
						col: testCol,
						status: StatusEnum.FALLING,
						right: (testRight-1),
						down: (testDown+1),
						sight: {min: 1, max: player.species.attributeMap.get(AttributeEnum.SIGHT)},
						jump: player.species.attributeMap.get(AttributeEnum.JUMP),
						tilesExposed: 25 + (sightRetained  ? 5 : 0),
						tilesTraveled: 2});
}

function testFall_Down_RightDown()
{
	var testRow = 2;
	var testCol = 2;
	var testDown = 0;
	var testSight = 2;
	var tileTypes = [["B", "B", "B", "B", "B"],
					 ["B", "B", "S", "B", "B"],
					 ["B", "B", "S", "B", "B"],
					 ["B", "B", "S", "B", "B"],
					 ["B", "B", "B", "B", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  right: 1, down: testDown,
			  sight: testSight, jump: 0},
			 {innerText: ActionEnum.FALL_DOWN});

	moveDown(true);
	var sightRetained = player.attributeMap.get(AttributeEnum.SIGHT) === testSight;

	validateTakeAction({rows: (tileTypes.length + (sightRetained ? 1 : 0)),
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: (testRow+1),
						col: testCol,
						status: StatusEnum.FALLING,
						right: 0,
						down: (testDown+1),
						sight: {min: 1, max: player.species.attributeMap.get(AttributeEnum.SIGHT)},
						jump: player.species.attributeMap.get(AttributeEnum.JUMP),
						tilesExposed: 25 + (sightRetained  ? 5 : 0),
						tilesTraveled: 2});
}

function testLand()
{
	var testRow = 1;
	var testCol = 1;
	var testDown = 2;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["B", "S", "B"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: StatusEnum.FALLING,
			  left: 1, right: 1, down: testDown,
			  health: testHealth, sight: testSight},
			 {innerText: ActionEnum.LAND});

	moveDown(true);

	var speciesJump = player.attributeMap.get(AttributeEnum.JUMP);
	var minHealth = (testHealth - ((testDown - Math.floor(speciesJump/2)) < 0 
								   ? 0 : (testDown - Math.floor(speciesJump/2))));
	if (minHealth < 0)
		minHealth = 0;

	var maxHealth = (testHealth - ((testDown - speciesJump) < 0
								   ? 0 : (testDown - speciesJump)));
	if (maxHealth < 0)
		maxHealth = 0;

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.STOPPED,
						left: 0,
						right: 0,
						down: 0,
						health: {min: minHealth, max: maxHealth},
						sight: testSight,
						jump: player.species.attributeMap.get(AttributeEnum.JUMP),
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testSplash()
{
	var testRow = 1;
	var testCol = 1;
	var testDown = 2;
	var testSight = 1;
	var tileTypes = [["B", "S", "B"],
					 ["B", "S", "B"],
					 ["B", "W", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  left: 1, right: 1, down: testDown,
			  sight: testSight},
			 {innerText: ActionEnum.SPLASH});

	moveDown(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: (testRow+1),
						col: testCol,
						status: StatusEnum.SWIMMING,
						left: 0,
						right: 0,
						down: 0,
						sight: testSight,
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testSwim_Down()
{
	var testImage = "images/Species/" + (new Human()).type + "/Suspended.png";
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["W", "W", "W"],
					 ["W", "W", "W"],
					 ["W", "W", "W"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.SWIM_DOWN});

	moveDown(true);

	var speciesSwim = player.species.attributeMap.get(AttributeEnum.SWIM);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: (testRow+1),
						col: testCol,
						status: StatusEnum.SWIMMING,
						sight: testSight,
						endurance: (player.attributeMap.get(AttributeEnum.SWIM) === speciesSwim
									? (testEndurance-1) : testEndurance),
						swim: {min: 1, max: speciesSwim},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testSwim_Down_NoSwim()
{
	var testImage = "images/Species/" + (new Human()).type + "/Suspended.png";
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["W", "W", "W"],
					 ["W", "W", "W"],
					 ["W", "W", "W"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  health: testHealth, sight: testSight, endurance: 1, swim: 1},
			 {innerText: ActionEnum.SWIM_DOWN});

	moveDown(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: (testRow+1),
						col: testCol,
						status: StatusEnum.SWIMMING,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: player.species.attributeMap.get(AttributeEnum.SWIM),
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testSwim_Down_NoEndurance()
{
	var testImage = "images/Species/" + (new Human()).type + "/Suspended.png";
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["W", "W", "W"],
					 ["W", "W", "W"],
					 ["W", "W", "W"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  health: testHealth, sight: testSight, endurance: 0},
			 {innerText: ActionEnum.SWIM_DOWN});

	moveDown(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: (testRow+1),
						col: testCol,
						status: StatusEnum.SWIMMING,
						health: (player.attributeMap.get(AttributeEnum.SWIM) === 0
								 ? (testHealth-1) : testHealth),
						sight: testSight,
						endurance: 0,
						swim: {min: 0, max: (player.species.attributeMap.get(AttributeEnum.SWIM)-1)},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testSwim_Down_NoEnduranceSwim()
{
	var testImage = "images/Species/" + (new Human()).type + "/Suspended.png";
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["W", "W", "W"],
					 ["W", "W", "W"],
					 ["W", "W", "W"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  health: testHealth, sight: testSight, endurance: 0, swim: 0},
			 {innerText: ActionEnum.SWIM_DOWN});

	moveDown(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: (testRow+1),
						col: testCol,
						status: StatusEnum.SWIMMING,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: 0,
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testDig_Down()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var testDig = 3;
	var tileTypes = [["S", "S", "S"],
					 ["G", "S", "G"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: "",
			  sight: testSight, endurance: testEndurance, dig: testDig},
			 {innerText: ActionEnum.DIG_DOWN});

	var testDurability = 3;
	var row = 2;
	var col = 1;
	mapTiles.children[row].children[col].value = testDurability;

	moveDown(true);

	var speciesDig = player.species.attributeMap.get(AttributeEnum.DIG);
	var stopped = (player.attributeMap.get(AttributeEnum.DIG) === speciesDig);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: (stopped
								? "images/Species/" + player.species.type + "/Species.png"
								: "images/Species/" + player.species.type + "/" + ActionEnum.DIG_DOWN.replace(" ", "") + ".png"),
						row: testRow,
						col: testCol,
						status: (stopped ? StatusEnum.STOPPED : StatusEnum.DIGGING),
						down: (stopped ? 0 : 1),
						sight: testSight,
						endurance: (stopped ? (testEndurance-1) : testEndurance),
						dig: {min: 1, max: speciesDig},
						tilesExposed: 9,
						tilesTraveled: 1});

	validateTakeActionData("durability", mapTiles.children[row].children[col].value, -1, (testDurability-1));
}

function testDig_Down_Stop()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["G", "S", "G"],
					 ["B", "G", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: "",
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.DIG_DOWN});

	var row = 2;
	var col = 1;
	mapTiles.children[row].children[col].value = 1;

	moveDown(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Species.png",
						row: (testRow+1),
						col: testCol,
						status: StatusEnum.STOPPED,
						sight: testSight,
						endurance: (testEndurance-1),
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 12,
						tilesTraveled: 2});

	validateTakeActionData("durability", mapTiles.children[row].children[col].value, -1, -1);
}

function testDig_Down_Fall()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["G", "S", "G"],
					 ["B", "G", "B"],
					 ["B", "D", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.DIG_DOWN});

	var row = 2;
	var col = 1;
	mapTiles.children[row].children[col].value = 1;

	moveDown(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: (testRow+1),
						col: testCol,
						status: StatusEnum.FALLING,
						sight: testSight,
						endurance: (testEndurance-1),
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 12,
						tilesTraveled: 2});

	validateTakeActionData("durability", mapTiles.children[row].children[col].value, -1, -1);
}

function testDig_Down_NoEnduranceDig()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["G", "S", "G"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: "",
			  health: testHealth, sight: testSight, endurance: 1, dig: 1},
			 {innerText: ActionEnum.DIG_DOWN});

	var testDurability = 3;
	var row = 2;
	var col = 1;
	mapTiles.children[row].children[col].value = testDurability;

	moveDown(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.STOPPED,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 9,
						tilesTraveled: 1});

	validateTakeActionData("durability", mapTiles.children[row].children[col].value, -1, (testDurability-1));
}
