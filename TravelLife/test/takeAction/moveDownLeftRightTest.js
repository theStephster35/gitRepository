function testMoveDownLeftRight()
{
	// Move Down Left
	runTest("Test Climb Off Left", testClimbOff_Left);
	runTest("Test Climb Off Left - No Endurance", testClimbOff_Left_NoEndurance);
	runTest("Test Climb Left - Climb", testClimb_Left_Climb);
	runTest("Test Climb Left - Swim", testClimb_Left_Swim);
	runTest("Test Fall Left - Left", testFall_Left_Left);
	runTest("Test Fall Left - Down", testFall_Left_Down);
	runTest("Test Swim Down Left", testSwim_DownLeft);
	runTest("Test Swim Down Left - No Swim", testSwim_DownLeft_NoSwim);
	runTest("Test Swim Down Left - No Endurance", testSwim_DownLeft_NoEndurance);
	runTest("Test Swim Down Left - No Endurance/Swim", testSwim_DownLeft_NoEnduranceSwim);

	// Move Down Right
	runTest("Test Climb Off Right", testClimbOff_Right);
	runTest("Test Climb Off Right - No Endurance", testClimbOff_Right_NoEndurance);
	runTest("Test Climb Right - Climb", testClimb_Right_Climb);
	runTest("Test Climb Right - Swim", testClimb_Right_Swim);
	runTest("Test Fall Right - Right", testFall_Right_Right);
	runTest("Test Fall Right - Down", testFall_Right_Down);
	runTest("Test Swim Down Right", testSwim_DownRight);
	runTest("Test Swim Down Right - No Swim", testSwim_DownRight_NoSwim);
	runTest("Test Swim Down Right - No Endurance", testSwim_DownRight_NoEndurance);
	runTest("Test Swim Down Right - No Endurance/Swim", testSwim_DownRight_NoEnduranceSwim);
}

function testClimbOff_Left()
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
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.CLIMB_OFF});

	moveDownLeft(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						sight: testSight,
						endurance: (testEndurance-1),
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testClimbOff_Left_NoEndurance()
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
			  health: testHealth, sight: testSight, endurance: 1},
			 {innerText: ActionEnum.CLIMB_OFF});

	moveDownLeft(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testClimb_Left_Climb()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["S", "G", "S"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  sight: testSight},
			 {innerText: ActionEnum.CLIMB_LEFT});

	moveDownLeft(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/" + player.species.type + "/" + ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png",
						row: (testRow+1),
						col: testCol,
						status: AttributeEnum.CLIMB,
						right: 1,
						sight: testSight,
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testClimb_Left_Swim()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["W", "G", "W"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  sight: testSight},
			 {innerText: ActionEnum.CLIMB_LEFT});

	moveDownLeft(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/" + player.species.type + "/Suspended.png",
						row: (testRow+1),
						col: testCol,
						status: AttributeEnum.SWIM,
						sight: testSight,
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testFall_Left_Left()
{
	var testImage = "images/" + (new Human()).type + "/" + ActionEnum.JUMP_LEFT.replace(" ", "") + ".png";
	var testRow = 1;
	var testCol = 1;
	var testLeft = 2;
	var testDown = 1;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["S", "S", "S"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  left: testLeft, down: testDown,
			  sight: testSight},
			 {innerText: ActionEnum.FALL_LEFT});

	moveDownLeft(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: (testRow+1),
						col: testCol,
						status: ActionEnum.FALL_DOWN,
						left: (testLeft-1),
						down: (testDown+1),
						sight: testSight,
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testFall_Left_Down()
{
	var testRow = 1;
	var testCol = 1;
	var testDown = 1;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["S", "S", "S"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  left: 1, down: testDown,
			  sight: testSight},
			 {innerText: ActionEnum.FALL_LEFT});

	moveDownLeft(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/" + player.species.type + "/Suspended.png",
						row: (testRow+1),
						col: testCol,
						status: ActionEnum.FALL_DOWN,
						left: 0,
						down: (testDown+1),
						sight: testSight,
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testSwim_DownLeft()
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
			 {innerText: ActionEnum.SWIM_DOWN_LEFT});

	moveDownLeft(true);

	var speciesSwim = player.species.attributeMap.get(AttributeEnum.SWIM);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: (testRow+1),
						col: testCol,
						status: AttributeEnum.SWIM,
						sight: testSight,
						endurance: (player.attributeMap.get(AttributeEnum.SWIM) === speciesSwim
									? (testEndurance-1) : testEndurance),
						swim: {min: 1, max: speciesSwim},
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testSwim_DownLeft_NoSwim()
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
			 {innerText: ActionEnum.SWIM_DOWN_LEFT});

	moveDownLeft(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: (testRow+1),
						col: testCol,
						status: AttributeEnum.SWIM,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: player.species.attributeMap.get(AttributeEnum.SWIM),
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testSwim_DownLeft_NoEndurance()
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
			 {innerText: ActionEnum.SWIM_DOWN_LEFT});

	moveDownLeft(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: (testRow+1),
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

function testSwim_DownLeft_NoEnduranceSwim()
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
			 {innerText: ActionEnum.SWIM_DOWN_LEFT});

	moveDownLeft(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: (testRow+1),
						col: testCol,
						status: AttributeEnum.SWIM,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: 0,
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testClimbOff_Right()
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
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.CLIMB_OFF});

	moveDownRight(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						sight: testSight,
						endurance: (testEndurance-1),
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testClimbOff_Right_NoEndurance()
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
			  health: testHealth, sight: testSight, endurance: 1},
			 {innerText: ActionEnum.CLIMB_OFF});

	moveDownRight(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testClimb_Right_Climb()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["S", "G", "S"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  sight: testSight},
			 {innerText: ActionEnum.CLIMB_RIGHT});

	moveDownRight(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/" + player.species.type + "/" + ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png",
						row: (testRow+1),
						col: (testCol+1),
						status: AttributeEnum.CLIMB,
						left: 1,
						sight: testSight,
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testClimb_Right_Swim()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["W", "G", "W"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  sight: testSight},
			 {innerText: ActionEnum.CLIMB_RIGHT});

	moveDownRight(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/" + player.species.type + "/Suspended.png",
						row: (testRow+1),
						col: (testCol+1),
						status: AttributeEnum.SWIM,
						sight: testSight,
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testFall_Right_Right()
{
	var testImage = "images/" + (new Human()).type + "/" + ActionEnum.JUMP_RIGHT.replace(" ", "") + ".png";
	var testRow = 1;
	var testCol = 1;
	var testRight = 2;
	var testDown = 1;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["S", "S", "S"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  right: testRight, down: testDown,
			  sight: testSight},
			 {innerText: ActionEnum.FALL_RIGHT});

	moveDownRight(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: (testRow+1),
						col: (testCol+1),
						status: ActionEnum.FALL_DOWN,
						right: (testRight-1),
						down: (testDown+1),
						sight: testSight,
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testFall_Right_Down()
{
	var testRow = 1;
	var testCol = 1;
	var testDown = 1;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["S", "S", "S"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  right: 1, down: testDown,
			  sight: testSight},
			 {innerText: ActionEnum.FALL_RIGHT});

	moveDownRight(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: "images/" + player.species.type + "/Suspended.png",
						row: (testRow+1),
						col: (testCol+1),
						status: ActionEnum.FALL_DOWN,
						right: 0,
						down: (testDown+1),
						sight: testSight,
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testSwim_DownRight()
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
			 {innerText: ActionEnum.SWIM_DOWN_RIGHT});

	moveDownRight(true);

	var speciesSwim = player.species.attributeMap.get(AttributeEnum.SWIM);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: (testRow+1),
						col: (testCol+1),
						status: AttributeEnum.SWIM,
						sight: testSight,
						endurance: (player.attributeMap.get(AttributeEnum.SWIM) === speciesSwim
									? (testEndurance-1) : testEndurance),
						swim: {min: 1, max: speciesSwim},
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testSwim_DownRight_NoSwim()
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
			 {innerText: ActionEnum.SWIM_DOWN_RIGHT});

	moveDownRight(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: (testRow+1),
						col: (testCol+1),
						status: AttributeEnum.SWIM,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: player.species.attributeMap.get(AttributeEnum.SWIM),
						tilesExposed: 14,
						tilesTraveled: 2});
}

function testSwim_DownRight_NoEndurance()
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
			 {innerText: ActionEnum.SWIM_DOWN_RIGHT});

	moveDownRight(true);

	validateTakeAction({rows: (tileTypes.length+1),
		cols: (tileTypes[0].length+1),
						image: testImage,
						row: (testRow+1),
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

function testSwim_DownRight_NoEnduranceSwim()
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
			 {innerText: ActionEnum.SWIM_DOWN_RIGHT});

	moveDownRight(true);

	validateTakeAction({rows: (tileTypes.length+1),
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: (testRow+1),
						col: (testCol+1),
						status: AttributeEnum.SWIM,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: 0,
						tilesExposed: 14,
						tilesTraveled: 2});
}
