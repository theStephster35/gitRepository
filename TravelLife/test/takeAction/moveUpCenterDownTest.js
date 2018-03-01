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

	// Stay Center
	runTest("Test Stop - Jump", testStop_Jump);
	runTest("Test Stop - Jump, No Endurance/Jump", testStop_Jump_NoEnduranceJump);
	runTest("Test Stop - Run", testStop_Run);
	runTest("Test Stop - Run, No Endurance/Run", testStop_Run_NoEnduranceRun);
	runTest("Test Stop - Dig", testStop_Dig);
	runTest("Test Stop - Dig, No Endurance/Dig", testStop_Dig_NoEnduranceDig);
	runTest("Test Rest", testRest);
	runTest("Test Float", testFloat);

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
	var testImage = "images/" + (new Human()).type + "/"
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
			  status: AttributeEnum.CLIMB,
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
						status: AttributeEnum.CLIMB,
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
						image: "images/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: ActionEnum.FALL_DOWN,
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
	var testImage = "images/" + (new Human()).type + "/"
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
			  status: AttributeEnum.CLIMB,
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
						status: AttributeEnum.CLIMB,
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
						image: "images/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: ActionEnum.FALL_DOWN,
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
						image: "images/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: (falling ? ActionEnum.FALL_DOWN : AttributeEnum.JUMP),
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
						image: "images/" + player.species.type + "/" + ActionEnum.JUMP_LEFT.replace(" ", "") + ".png",
						row: testRow,
						col: testCol,
						status: (falling ? ActionEnum.FALL_DOWN : AttributeEnum.JUMP),
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
						image: "images/" + player.species.type + "/" + ActionEnum.JUMP_RIGHT.replace(" ", "") + ".png",
						row: testRow,
						col: testCol,
						status: (falling ? ActionEnum.FALL_DOWN : AttributeEnum.JUMP),
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
						image: "images/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: (falling ? ActionEnum.FALL_DOWN : AttributeEnum.JUMP),
						up: (falling ? 0 : 1),
						sight: testSight,
						endurance: (falling ? (testEndurance-1) : testEndurance),
						jump: {min: 1, max: speciesJump},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testRise_UpLeft()
{
	var testImage = "images/" + (new Human()).type + "/" + ActionEnum.JUMP_LEFT.replace(" ", "") + ".png";
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
						status: (falling ? ActionEnum.FALL_DOWN : AttributeEnum.JUMP),
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
	var testImage = "images/" + (new Human()).type + "/" + ActionEnum.JUMP_RIGHT.replace(" ", "") + ".png";
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
						status: (falling ? ActionEnum.FALL_DOWN : AttributeEnum.JUMP),
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
	var testImage = "images/" + (new Human()).type + "/Suspended.png";
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
			  status: AttributeEnum.SWIM,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.SWIM_UP});

	moveUp(true);

	var speciesSwim = player.species.attributeMap.get(AttributeEnum.SWIM);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: AttributeEnum.SWIM,
						sight: testSight,
						endurance: (player.attributeMap.get(AttributeEnum.SWIM) === speciesSwim
									? (testEndurance-1) : testEndurance),
						swim: {min: 1, max: speciesSwim},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testSwim_Up_NoSwim()
{
	var testImage = "images/" + (new Human()).type + "/Suspended.png";
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
			  status: AttributeEnum.SWIM,
			  health: testHealth, sight: testSight, endurance: 1, swim: 1},
			 {innerText: ActionEnum.SWIM_UP});

	moveUp(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: AttributeEnum.SWIM,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: player.species.attributeMap.get(AttributeEnum.SWIM),
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testSwim_Up_NoEndurance()
{
	var testImage = "images/" + (new Human()).type + "/Suspended.png";
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
			  status: AttributeEnum.SWIM,
			  health: testHealth, sight: testSight, endurance: 0},
			 {innerText: ActionEnum.SWIM_UP});

	moveUp(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: AttributeEnum.SWIM,
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
	var testImage = "images/" + (new Human()).type + "/Suspended.png";
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
			  status: AttributeEnum.SWIM,
			  health: testHealth, sight: testSight, endurance: 0, swim: 0},
			 {innerText: ActionEnum.SWIM_UP});

	moveUp(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: AttributeEnum.SWIM,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: 0,
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testStop_Jump()
{
	var testImage = "images/" + (new Human()).type + "/Suspended.png";
	var testRow = 1;
	var testCol = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: AttributeEnum.JUMP,
			  up: 1, down: 1,
			  endurance: testEndurance, jump: 0},
			 {innerText: ActionEnum.STOP});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: ActionEnum.FALL_DOWN,
						up: 0,
						down: 0,
						endurance: (testEndurance-1),
						jump: player.species.attributeMap.get(AttributeEnum.JUMP),
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testStop_Jump_NoEnduranceJump()
{
	var testImage = "images/" + (new Human()).type + "/Suspended.png";
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: AttributeEnum.JUMP,
			  up: 1, down: 1,
			  health: testHealth, endurance: 1, jump: 0},
			 {innerText: ActionEnum.STOP});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: testImage,
						row: testRow,
						col: testCol,
						status: ActionEnum.FALL_DOWN,
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
			  status: AttributeEnum.RUN,
			  left: 1, right: 1,
			  endurance: testEndurance, run: 0},
			 {innerText: ActionEnum.STOP});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: ActionEnum.STOP,
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
			  status: AttributeEnum.RUN,
			  left: 1, right: 1,
			  health: testHealth, endurance: 1, run: 0},
			 {innerText: ActionEnum.STOP});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: ActionEnum.STOP,
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
			  status: AttributeEnum.DIG,
			  left: 1, right: 1, down: 1,
			  endurance: testEndurance, dig: 0},
			 {innerText: ActionEnum.STOP});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: ActionEnum.STOP,
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
			  status: AttributeEnum.DIG,
			  left: 1, right: 1, down: 1,
			  health: testHealth, endurance: 1, dig: 0},
			 {innerText: ActionEnum.STOP});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: ActionEnum.STOP,
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

function testClimb_DownLeft()
{
	var testImage = "images/" + (new Human()).type + "/"
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
			  status: AttributeEnum.CLIMB,
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
						status: AttributeEnum.CLIMB,
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
						image: "images/" + player.species.type + "/Suspended.png",
						row: (testRow+1),
						col: testCol,
						status: ActionEnum.FALL_DOWN,
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
	var testImage = "images/" + (new Human()).type + "/"
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
			  status: AttributeEnum.CLIMB,
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
						status: AttributeEnum.CLIMB,
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
						image: "images/" + player.species.type + "/Suspended.png",
						row: (testRow+1),
						col: testCol,
						status: ActionEnum.FALL_DOWN,
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
	var testImage = "images/" + (new Human()).type + "/" + ActionEnum.JUMP_LEFT.replace(" ", "") + ".png";
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
						status: ActionEnum.FALL_DOWN,
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
						image: "images/" + player.species.type + "/Suspended.png",
						row: (testRow+1),
						col: testCol,
						status: ActionEnum.FALL_DOWN,
						left: 0,
						down: (testDown+1),
						sight: {min: 1, max: player.species.attributeMap.get(AttributeEnum.SIGHT)},
						jump: player.species.attributeMap.get(AttributeEnum.JUMP),
						tilesExposed: 25 + (sightRetained  ? 5 : 0),
						tilesTraveled: 2});
}

function testFall_Down_Right()
{
	var testImage = "images/" + (new Human()).type + "/" + ActionEnum.JUMP_LEFT.replace(" ", "") + ".png";
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
						status: ActionEnum.FALL_DOWN,
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
						image: "images/" + player.species.type + "/Suspended.png",
						row: (testRow+1),
						col: testCol,
						status: ActionEnum.FALL_DOWN,
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
			  status: ActionEnum.FALL_DOWN,
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
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: ActionEnum.STOP,
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
			 {image: "",
			  row: testRow, col: testCol,
			  left: 1, right: 1, down: testDown,
			  sight: testSight},
			 {innerText: ActionEnum.SPLASH});

	moveDown(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: "images/" + player.species.type + "/Suspended.png",
						row: (testRow+1),
						col: testCol,
						status: AttributeEnum.SWIM,
						left: 0,
						right: 0,
						down: 0,
						sight: testSight,
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testSwim_Down()
{
	var testImage = "images/" + (new Human()).type + "/Suspended.png";
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
			  status: AttributeEnum.SWIM,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.SWIM_DOWN});

	moveDown(true);

	var speciesSwim = player.species.attributeMap.get(AttributeEnum.SWIM);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: (testRow+1),
						col: testCol,
						status: AttributeEnum.SWIM,
						sight: testSight,
						endurance: (player.attributeMap.get(AttributeEnum.SWIM) === speciesSwim
									? (testEndurance-1) : testEndurance),
						swim: {min: 1, max: speciesSwim},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testSwim_Down_NoSwim()
{
	var testImage = "images/" + (new Human()).type + "/Suspended.png";
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
			  status: AttributeEnum.SWIM,
			  health: testHealth, sight: testSight, endurance: 1, swim: 1},
			 {innerText: ActionEnum.SWIM_DOWN});

	moveDown(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: (testRow+1),
						col: testCol,
						status: AttributeEnum.SWIM,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: player.species.attributeMap.get(AttributeEnum.SWIM),
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testSwim_Down_NoEndurance()
{
	var testImage = "images/" + (new Human()).type + "/Suspended.png";
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
			  status: AttributeEnum.SWIM,
			  health: testHealth, sight: testSight, endurance: 0},
			 {innerText: ActionEnum.SWIM_DOWN});

	moveDown(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: (testRow+1),
						col: testCol,
						status: AttributeEnum.SWIM,
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
	var testImage = "images/" + (new Human()).type + "/Suspended.png";
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
			  status: AttributeEnum.SWIM,
			  health: testHealth, sight: testSight, endurance: 0, swim: 0},
			 {innerText: ActionEnum.SWIM_DOWN});

	moveDown(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: testImage,
						row: (testRow+1),
						col: testCol,
						status: AttributeEnum.SWIM,
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
								? "images/" + player.species.type + "/Species.png"
								: "images/" + player.species.type + "/" + ActionEnum.DIG_DOWN.replace(" ", "") + ".png"),
						row: testRow,
						col: testCol,
						status: (stopped ? ActionEnum.STOP : AttributeEnum.DIG),
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
						image: "images/" + player.species.type + "/Species.png",
						row: (testRow+1),
						col: testCol,
						status: ActionEnum.STOP,
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
						image: "images/" + player.species.type + "/Suspended.png",
						row: (testRow+1),
						col: testCol,
						status: ActionEnum.FALL_DOWN,
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
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: ActionEnum.STOP,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 9,
						tilesTraveled: 1});

	validateTakeActionData("durability", mapTiles.children[row].children[col].value, -1, (testDurability-1));
}
