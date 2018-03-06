function testMoveUpLeftRight()
{
	// Move Up Left
	runTest("Test Climb Left", testClimb_Left);
	runTest("Test Climb Over Left - Climb", testClimbOver_Left_Climb);
	runTest("Test Climb Over Left - Climb, No Endurance", testClimbOver_Left_Climb_NoEndurance);
	runTest("Test Climb Over Left - Swim", testClimbOver_Left_Swim);
	runTest("Test Climb Over Left - Swim, No Endurance", testClimbOver_Left_Swim_NoEndurance);
	runTest("Test Climb Out Left", testClimbOut_Left);
	runTest("Test Climb Out Left - No Endurance", testClimbOut_Left_NoEndurance);
	runTest("Test Jump Left", testJump_Left);
	runTest("Test Jump Left - Climb", testJump_Left_Climb);
	runTest("Test Rise Left", testRise_Left);
	runTest("Test Swim Up Left", testSwim_UpLeft);
	runTest("Test Swim Up Left - No Swim", testSwim_UpLeft_NoSwim);
	runTest("Test Swim Up Left - No Endurance", testSwim_UpLeft_NoEndurance);
	runTest("Test Swim Up Left - No Endurance/Swim", testSwim_UpLeft_NoEnduranceSwim);

	// Move Up Right
	runTest("Test Climb Right", testClimb_Right);
	runTest("Test Climb Over Right - Climb", testClimbOver_Right_Climb);
	runTest("Test Climb Over Right - Climb, No Endurance", testClimbOver_Right_Climb_NoEndurance);
	runTest("Test Climb Over Right - Swim", testClimbOver_Right_Swim);
	runTest("Test Climb Over Right - Swim, No Endurance", testClimbOver_Right_Swim_NoEndurance);
	runTest("Test Climb Out Right", testClimbOut_Right);
	runTest("Test Climb Out Right - No Endurance", testClimbOut_Right_NoEndurance);
	runTest("Test Jump Right", testJump_Right);
	runTest("Test Jump Right - Climb", testJump_Right_Climb);
	runTest("Test Rise Right", testRise_Right);
	runTest("Test Swim Up Right", testSwim_UpRight);
	runTest("Test Swim Up Right - No Swim", testSwim_UpRight_NoSwim);
	runTest("Test Swim Up Right - No Endurance", testSwim_UpRight_NoEndurance);
	runTest("Test Swim Up Right - No Endurance/Swim", testSwim_UpRight_NoEnduranceSwim);
}

function testClimb_Left()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  sight: testSight},
			 {innerText: ActionEnum.CLIMB_LEFT});

	moveUpLeft(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/" + ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.CLIMB,
						left: 1,
						sight: testSight,
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testClimbOver_Left_Climb()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  sight: testSight, endurance: testEndurance, climb: 1},
			 {innerText: ActionEnum.CLIMB_OVER});

	moveUpLeft(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						sight: testSight,
						endurance: (testEndurance-1),
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testClimbOver_Left_Climb_NoEndurance()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  health: testHealth, sight: 1, endurance: 1, climb: 1},
			 {innerText: ActionEnum.CLIMB_OVER});

	moveUpLeft(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testClimbOver_Left_Swim()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "W", "B"],
					 ["B", "B", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: AttributeEnum.SWIM,
			  sight: testSight, endurance: testEndurance, swim: 1},
			 {innerText: ActionEnum.CLIMB_OVER});

	moveUpLeft(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						sight: testSight,
						endurance: (testEndurance-1),
						swim: player.species.attributeMap.get(AttributeEnum.SWIM),
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testClimbOver_Left_Swim_NoEndurance()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["B", "W", "B"],
					 ["B", "B", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: AttributeEnum.SWIM,
			  health: testHealth, sight: 1, endurance: 1, swim: 1},
			 {innerText: ActionEnum.CLIMB_OVER});

	moveUpLeft(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: player.species.attributeMap.get(AttributeEnum.SWIM),
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testClimbOut_Left()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["B", "S", "B"],
					 ["B", "W", "B"],
					 ["B", "B", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  sight: testSight, endurance: testEndurance, swim: 1},
			 {innerText: ActionEnum.CLIMB_OUT_LEFT});

	moveUpLeft(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/" + ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.CLIMB,
						left: 1,
						sight: testSight,
						endurance: (testEndurance-1),
						swim: player.species.attributeMap.get(AttributeEnum.SWIM),
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testClimbOut_Left_NoEndurance()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["B", "S", "B"],
					 ["B", "W", "B"],
					 ["B", "B", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  health: testHealth, sight: testSight, endurance: 1, swim: 1},
			 {innerText: ActionEnum.CLIMB_OUT_LEFT});

	moveUpLeft(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: ActionEnum.FALL_DOWN,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: player.species.attributeMap.get(AttributeEnum.SWIM),
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testJump_Left()
{
	var testRow = 1;
	var testCol = 1;
	var testLeft = 2;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  left: testLeft,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.JUMP_LEFT});

	moveUpLeft(true);

	var speciesJump = player.species.attributeMap.get(AttributeEnum.JUMP);
	var falling = (player.attributeMap.get(AttributeEnum.JUMP) === speciesJump);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/" + ActionEnum.JUMP_LEFT.replace(" ", "") + ".png",
						row: testRow,
						col: testCol,
						status: (falling ? ActionEnum.FALL_DOWN : AttributeEnum.JUMP),
						up: (falling ? 0 : 1),
						left: ((testLeft+speciesJump)-1),
						sight: testSight,
						endurance: (falling ? (testEndurance-1) : testEndurance),
						jump: {min: 1, max: speciesJump},
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testJump_Left_Climb()
{
	var testRow = 1;
	var testCol = 1;
	var testLeft = 2;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  left: testLeft, right: 1,
			  sight: testSight, endurance: testEndurance, climb: 1},
			 {innerText: ActionEnum.JUMP_LEFT});

	moveUpLeft(true);

	var speciesJump = player.species.attributeMap.get(AttributeEnum.JUMP);
	var falling = (player.attributeMap.get(AttributeEnum.JUMP) === speciesJump);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/" + ActionEnum.JUMP_LEFT.replace(" ", "") + ".png",
						row: testRow,
						col: testCol,
						status: (falling ? ActionEnum.FALL_DOWN : AttributeEnum.JUMP),
						up: (falling ? 0 : 1),
						left: ((testLeft+speciesJump)-1),
						right: 0,
						sight: testSight,
						endurance: (falling ? (testEndurance-1) : testEndurance),
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						jump: {min: 1, max: speciesJump},
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testRise_Left()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  left: 1,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.RISE_LEFT});

	moveUpLeft(true);

	var speciesJump = player.species.attributeMap.get(AttributeEnum.JUMP);
	var falling = (player.attributeMap.get(AttributeEnum.JUMP) === speciesJump);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: (falling ? ActionEnum.FALL_DOWN : AttributeEnum.JUMP),
						up: (falling ? 0 : 1),
						left: 0,
						sight: testSight,
						endurance: (falling ? (testEndurance-1) : testEndurance),
						jump: {min: 1, max: speciesJump},
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testSwim_UpLeft()
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
			  status: AttributeEnum.SWIM,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.SWIM_UP_LEFT});

	moveUpLeft(true);

	var speciesSwim = player.species.attributeMap.get(AttributeEnum.SWIM);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: testRow,
						col: testCol,
						status: AttributeEnum.SWIM,
						sight: testSight,
						endurance: (player.attributeMap.get(AttributeEnum.SWIM) === speciesSwim
									? (testEndurance-1) : testEndurance),
						swim: {min: 1, max: speciesSwim},
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testSwim_UpLeft_NoSwim()
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
			  status: AttributeEnum.SWIM,
			  health: testHealth, sight: testSight, endurance: 1, swim: 1},
			 {innerText: ActionEnum.SWIM_UP_LEFT});

	moveUpLeft(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: testRow,
						col: testCol,
						status: AttributeEnum.SWIM,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: player.species.attributeMap.get(AttributeEnum.SWIM),
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testSwim_UpLeft_NoEndurance()
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
			  status: AttributeEnum.SWIM,
			  health: testHealth, sight: testSight, endurance: 0},
			 {innerText: ActionEnum.SWIM_UP_LEFT});

	moveUpLeft(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: testRow,
						col: testCol,
						status: AttributeEnum.SWIM,
						health: (player.attributeMap.get(AttributeEnum.SWIM) === 0
								 ? (testHealth-1) : testHealth),
						sight: testSight,
						endurance: 0,
						swim: {min: 0, max: (player.species.attributeMap.get(AttributeEnum.SWIM)-1)},
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testSwim_UpLeft_NoEnduranceSwim()
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
			  status: AttributeEnum.SWIM,
			  health: testHealth, sight: testSight, endurance: 0, swim: 0},
			 {innerText: ActionEnum.SWIM_UP_LEFT});

	moveUpLeft(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: testRow,
						col: testCol,
						status: AttributeEnum.SWIM,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: 0,
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testClimb_Right()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  sight: testSight},
			 {innerText: ActionEnum.CLIMB_RIGHT});

	moveUpRight(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/" + ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.CLIMB,
						right: 1,
						sight: testSight,
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testClimbOver_Right_Climb()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  sight: testSight, endurance: testEndurance, climb: 1},
			 {innerText: ActionEnum.CLIMB_OVER});

	moveUpRight(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: (testCol+1),
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						sight: testSight,
						endurance: (testEndurance-1),
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testClimbOver_Right_Climb_NoEndurance()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  health: testHealth, sight: testSight, endurance: 1, climb: 1},
			 {innerText: ActionEnum.CLIMB_OVER});

	moveUpRight(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: (testCol+1),
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testClimbOver_Right_Swim()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "W", "B"],
					 ["B", "B", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: AttributeEnum.SWIM,
			  sight: testSight, endurance: testEndurance, swim: 1},
			 {innerText: ActionEnum.CLIMB_OVER});

	moveUpRight(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: (testCol+1),
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						sight: testSight,
						endurance: (testEndurance-1),
						swim: player.species.attributeMap.get(AttributeEnum.SWIM),
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testClimbOver_Right_Swim_NoEndurance()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["B", "W", "B"],
					 ["B", "B", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: AttributeEnum.SWIM,
			  health: testHealth, sight: testSight, endurance: 1, swim: 1},
			 {innerText: ActionEnum.CLIMB_OVER});

	moveUpRight(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: (testCol+1),
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: player.species.attributeMap.get(AttributeEnum.SWIM),
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testClimbOut_Right()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["B", "S", "B"],
					 ["B", "W", "B"],
					 ["B", "B", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  sight: testSight, endurance: testEndurance, swim: 1},
			 {innerText: ActionEnum.CLIMB_OUT_RIGHT});

	moveUpRight(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/" + ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.CLIMB,
						right: 1,
						sight: testSight,
						endurance: (testEndurance-1),
						swim: player.species.attributeMap.get(AttributeEnum.SWIM),
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testClimbOut_Right_NoEndurance()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["B", "S", "B"],
					 ["B", "W", "B"],
					 ["B", "B", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  health: testHealth, sight: testSight, endurance: 1, swim: 1},
			 {innerText: ActionEnum.CLIMB_OUT_RIGHT});

	moveUpRight(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: tileTypes[0].length,
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: ActionEnum.FALL_DOWN,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: player.species.attributeMap.get(AttributeEnum.SWIM),
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testJump_Right()
{
	var testRow = 1;
	var testCol = 1;
	var testRight = 2;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  right: testRight,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.JUMP_RIGHT});

	moveUpRight(true);

	var speciesJump = player.species.attributeMap.get(AttributeEnum.JUMP);
	var falling = (player.attributeMap.get(AttributeEnum.JUMP) === speciesJump);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/" + ActionEnum.JUMP_RIGHT.replace(" ", "") + ".png",
						row: testRow,
						col: (testCol+1),
						status: (falling ? ActionEnum.FALL_DOWN : AttributeEnum.JUMP),
						up: (falling ? 0 : 1),
						right: ((testRight+speciesJump)-1),
						sight: testSight,
						endurance: (falling ? (testEndurance-1) : testEndurance),
						jump: {min: 1, max: speciesJump},
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testJump_Right_Climb()
{
	var testRow = 1;
	var testCol = 1;
	var testRight = 2;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  left: 1, right: testRight,
			  sight: testSight, endurance: testEndurance, climb: 1},
			 {innerText: ActionEnum.JUMP_RIGHT});

	moveUpRight(true);

	var speciesJump = player.species.attributeMap.get(AttributeEnum.JUMP);
	var falling = (player.attributeMap.get(AttributeEnum.JUMP) === speciesJump);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/" + ActionEnum.JUMP_RIGHT.replace(" ", "") + ".png",
						row: testRow,
						col: (testCol+1),
						status: (falling ? ActionEnum.FALL_DOWN : AttributeEnum.JUMP),
						up: (falling ? 0 : 1),
						left: 0,
						right: ((testRight+speciesJump)-1),
						sight: testSight,
						endurance: (falling ? (testEndurance-1) : testEndurance),
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						jump: {min: 1, max: speciesJump},
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testRise_Right()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  left: 1,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.RISE_RIGHT});

	moveUpRight(true);

	var speciesJump = player.species.attributeMap.get(AttributeEnum.JUMP);
	var falling = (player.attributeMap.get(AttributeEnum.JUMP) === speciesJump);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: (testCol+1),
						status: (falling ? ActionEnum.FALL_DOWN : AttributeEnum.JUMP),
						up: (falling ? 0 : 1),
						right: 0,
						sight: testSight,
						endurance: (falling ? (testEndurance-1) : testEndurance),
						jump: {min: 1, max: speciesJump},
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testSwim_UpRight()
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
			  status: AttributeEnum.SWIM,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.SWIM_UP_RIGHT});

	moveUpRight(true);

	var speciesSwim = player.species.attributeMap.get(AttributeEnum.SWIM);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: testRow,
						col: (testCol+1),
						status: AttributeEnum.SWIM,
						sight: testSight,
						endurance: (player.attributeMap.get(AttributeEnum.SWIM) === speciesSwim
									? (testEndurance-1) : testEndurance),
						swim: {min: 1, max: speciesSwim},
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testSwim_UpRight_NoSwim()
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
			  status: AttributeEnum.SWIM,
			  health: testHealth, sight: testSight, endurance: 1, swim: 1},
			 {innerText: ActionEnum.SWIM_UP_RIGHT});

	moveUpRight(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: testRow,
						col: (testCol+1),
						status: AttributeEnum.SWIM,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: player.species.attributeMap.get(AttributeEnum.SWIM),
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testSwim_UpRight_NoEndurance()
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
			  status: AttributeEnum.SWIM,
			  health: testHealth, sight: testSight, endurance: 0},
			 {innerText: ActionEnum.SWIM_UP_RIGHT});

	moveUpRight(true);

	validateTakeAction({rows: (tileTypes.length+1),
		cols: (tileTypes[0].length+1),
						image: testImage,
						row: testRow,
						col: (testCol+1),
						status: AttributeEnum.SWIM,
						health: (player.attributeMap.get(AttributeEnum.SWIM) === 0
								 ? (testHealth-1) : testHealth),
						sight: testSight,
						endurance: 0,
						swim: {min: 0, max: (player.species.attributeMap.get(AttributeEnum.SWIM)-1)},
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testSwim_UpRight_NoEnduranceSwim()
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
			  status: AttributeEnum.SWIM,
			  health: testHealth, sight: testSight, endurance: 0, swim: 0},
			 {innerText: ActionEnum.SWIM_UP_RIGHT});

	moveUpRight(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: testRow,
						col: (testCol+1),
						status: AttributeEnum.SWIM,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: 0,
						tilesExposed: 14,
						tilesTraveled: 2});
}
