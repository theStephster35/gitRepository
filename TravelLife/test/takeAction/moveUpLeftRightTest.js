function testMoveUpLeftRight()
{
	// Move Up Left
	runTest("Test Climb Left", testClimb_Left);
	runTest("Test Climb Over Left - Climb", testClimbOverOff_OverLeft_Climb);
	runTest("Test Climb Over Left - Climb, No Endurance", testClimbOverOff_OverLeft_Climb_NoEndurance);
	runTest("Test Climb Over Left - Swim", testClimbOverOff_OverLeft_Swim);
	runTest("Test Climb Over Left - Swim, No Endurance", testClimbOverOff_OverLeft_Swim_NoEndurance);
	runTest("Test Climb Out Left", testClimbOut_Left);
	runTest("Test Climb Out Left - No Endurance", testClimbOut_Left_NoEndurance);
	runTest("Test Swim Up Left", testSwim_UpLeft);
	runTest("Test Swim Up Left - No Swim", testSwim_UpLeft_NoSwim);
	runTest("Test Swim Up Left - No Endurance", testSwim_UpLeft_NoEndurance);
	runTest("Test Swim Up Left - No Endurance/Swim", testSwim_UpLeft_NoEnduranceSwim);

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

	// Move Up Right
	runTest("Test Climb Right", testClimb_Right);
	runTest("Test Climb Over Right - Climb", testClimbOverOff_OverRight_Climb);
	runTest("Test Climb Over Right - Climb, No Endurance", testClimbOverOff_OverRight_Climb_NoEndurance);
	runTest("Test Climb Over Right - Swim", testClimbOverOff_OverRight_Swim);
	runTest("Test Climb Over Right - Swim, No Endurance", testClimbOverOff_OverRight_Swim_NoEndurance);
	runTest("Test Climb Out Right", testClimbOut_Right);
	runTest("Test Climb Out Right - No Endurance", testClimbOut_Right_NoEndurance);
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
						image: "images/" + player.species.type + "/" + ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.CLIMB,
						left: 1,
						sight: testSight});
}

function testClimbOverOff_OverLeft_Climb()
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
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						sight: testSight,
						endurance: (testEndurance-1),
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB)});
}

function testClimbOverOff_OverLeft_Climb_NoEndurance()
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
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB)});
}

function testClimbOverOff_OverLeft_Swim()
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
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						sight: testSight,
						endurance: (testEndurance-1),
						swim: player.species.attributeMap.get(AttributeEnum.SWIM)});
}

function testClimbOverOff_OverLeft_Swim_NoEndurance()
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
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: player.species.attributeMap.get(AttributeEnum.SWIM)});
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
						image: "images/" + player.species.type + "/" + ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.CLIMB,
						left: 1,
						sight: testSight,
						endurance: (testEndurance-1),
						swim: player.species.attributeMap.get(AttributeEnum.SWIM)});
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
						image: "images/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: ActionEnum.FALL_DOWN,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: player.species.attributeMap.get(AttributeEnum.SWIM)});
}

function testSwim_UpLeft()
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
						swim: {min: 1, max: speciesSwim}});
}

function testSwim_UpLeft_NoSwim()
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
						swim: player.species.attributeMap.get(AttributeEnum.SWIM)});
}

function testSwim_UpLeft_NoEndurance()
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
						swim: {min: 0, max: (player.species.attributeMap.get(AttributeEnum.SWIM)-1)}});
}

function testSwim_UpLeft_NoEnduranceSwim()
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
						swim: 0});
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
						climb: {min: 0, max: speciesClimb}});
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
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB)});
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
						climb: {min: 0, max: speciesClimb}});
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
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB)});
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
						jump: {min: 1, max: speciesJump}});
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
						jump: {min: 1, max: speciesJump}});
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
						jump: {min: 1, max: speciesJump}});
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
						jump: {min: 1, max: speciesJump}});
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
						jump: {min: 1, max: speciesJump}});
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
						jump: {min: 1, max: speciesJump}});
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
						swim: {min: 1, max: speciesSwim}});
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
						swim: player.species.attributeMap.get(AttributeEnum.SWIM)});
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
						swim: {min: 0, max: (player.species.attributeMap.get(AttributeEnum.SWIM)-1)}});
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
						swim: 0});
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
						image: "images/" + player.species.type + "/" + ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.CLIMB,
						right: 1,
						sight: testSight});
}

function testClimbOverOff_OverRight_Climb()
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
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: (testCol+1),
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						sight: testSight,
						endurance: (testEndurance-1),
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB)});
}

function testClimbOverOff_OverRight_Climb_NoEndurance()
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
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: (testCol+1),
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB)});
}

function testClimbOverOff_OverRight_Swim()
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
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: (testCol+1),
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						sight: testSight,
						endurance: (testEndurance-1),
						swim: player.species.attributeMap.get(AttributeEnum.SWIM)});
}

function testClimbOverOff_OverRight_Swim_NoEndurance()
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
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: (testCol+1),
						status: AttributeEnum.STOP,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: player.species.attributeMap.get(AttributeEnum.SWIM)});
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
						image: "images/" + player.species.type + "/" + ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png",
						row: testRow,
						col: testCol,
						status: AttributeEnum.CLIMB,
						right: 1,
						sight: testSight,
						endurance: (testEndurance-1),
						swim: player.species.attributeMap.get(AttributeEnum.SWIM)});
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
						image: "images/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: ActionEnum.FALL_DOWN,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: player.species.attributeMap.get(AttributeEnum.SWIM)});
}

function testSwim_UpRight()
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
						swim: {min: 1, max: speciesSwim}});
}

function testSwim_UpRight_NoSwim()
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
						swim: player.species.attributeMap.get(AttributeEnum.SWIM)});
}

function testSwim_UpRight_NoEndurance()
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
						swim: {min: 0, max: (player.species.attributeMap.get(AttributeEnum.SWIM)-1)}});
}

function testSwim_UpRight_NoEnduranceSwim()
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
						swim: 0});
}
