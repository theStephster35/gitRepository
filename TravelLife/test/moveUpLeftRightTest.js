function testMoveUpLeftRight()
{
	// Move Up Left
	runTest("Test Climb Left", testClimb_Left);
	runTest("Test Climb Over Left", testClimbOverOff_OverLeft);
	runTest("Test Climb Over Left - No Endurance", testClimbOverOff_OverLeft_NoEndurance);

	// Move Up
	runTest("Test Climb Up Left", testClimb_UpLeft);
	runTest("Test Climb Up Left - No Endurance/Climb", testClimb_UpLeft_NoEnduranceClimb);
	runTest("Test Climb Up Right", testClimb_UpRight);
	runTest("Test Climb Up Right - No Endurance/Climb", testClimb_UpRight_NoEnduranceClimb);
	runTest("Test Jump Up", testJump_Up);
	runTest("Test Rise Up", testRise_Up);

	// Move Up Right
	runTest("Test Climb Right", testClimb_Right);
	runTest("Test Climb Over Right", testClimbOverOff_OverRight);
	runTest("Test Climb Over Right - No Endurance", testClimbOverOff_OverRight_NoEndurance);
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

	validateResults({rows: tileTypes.length,
					 cols: tileTypes[0].length,
					 image: "images/" + player.species.type + "/" + ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png",
					 row: testRow,
					 col: testCol,
					 status: AttributeEnum.CLIMB,
					 left: 1,
					 sight: testSight});
}

function testClimbOverOff_OverLeft()
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
			 {innerText: ActionEnum.CLIMB_OVER});

	moveUpLeft(true);

	validateResults({rows: (tileTypes.length+1),
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

function testClimbOverOff_OverLeft_NoEndurance()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testHealth = 3;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  health: testHealth, sight: 1, endurance: 1},
			 {innerText: ActionEnum.CLIMB_OVER});

	moveUpLeft(true);

	validateResults({rows: (tileTypes.length+1),
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

	validateResults({rows: (tileTypes.length+1),
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

	validateResults({rows: (tileTypes.length+1),
					 cols: tileTypes[0].length,
					 image: "images/" + player.species.type + "/Suspended.png",
					 row: testRow,
					 col: testCol,
					 status: ActionEnum.FALL,
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

	validateResults({rows: (tileTypes.length+1),
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
	var testSight = 1;
	var testHealth = 3;
	var tileTypes = [["B", "S", "B"],
					 ["B", "S", "B"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  right: 1,
			  health: testHealth, sight: testSight, endurance: 1, climb: 1},
			 {innerText: ActionEnum.CLIMB_UP});

	moveUp(true);

	validateResults({rows: (tileTypes.length+1),
					 cols: tileTypes[0].length,
					 image: "images/" + player.species.type + "/Suspended.png",
					 row: testRow,
					 col: testCol,
					 status: ActionEnum.FALL,
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
			  left: 1, right: 1,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.JUMP_UP});

	moveUp(true);

	var speciesJump = player.species.attributeMap.get(AttributeEnum.JUMP);
	var falling = (player.attributeMap.get(AttributeEnum.JUMP) === speciesJump);

	validateResults({rows: (tileTypes.length+1),
					 cols: tileTypes[0].length,
					 image: "images/" + player.species.type + "/Suspended.png",
					 row: testRow,
					 col: testCol,
					 status: (falling ? ActionEnum.FALL : AttributeEnum.JUMP),
					 up: (falling ? 0 : 1),
					 left: 0,
					 right: 0,
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
			  left: 1, right: 1,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.RISE_UP});

	moveUp(true);

	var speciesJump = player.species.attributeMap.get(AttributeEnum.JUMP);
	var falling = (player.attributeMap.get(AttributeEnum.JUMP) === speciesJump);

	validateResults({rows: (tileTypes.length+1),
					 cols: tileTypes[0].length,
					 image: "images/" + player.species.type + "/Suspended.png",
					 row: testRow,
					 col: testCol,
					 status: (falling ? ActionEnum.FALL : AttributeEnum.JUMP),
					 up: (falling ? 0 : 1),
					 left: 0,
					 right: 0,
					 sight: testSight,
					 endurance: (falling ? (testEndurance-1) : testEndurance),
					 jump: {min: 1, max: speciesJump}});
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

	validateResults({rows: tileTypes.length,
					 cols: tileTypes[0].length,
					 image: "images/" + player.species.type + "/" + ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png",
					 row: testRow,
					 col: testCol,
					 status: AttributeEnum.CLIMB,
					 right: 1,
					 sight: testSight});
}

function testClimbOverOff_OverRight()
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
			 {innerText: ActionEnum.CLIMB_OVER});

	moveUpRight(true);

	validateResults({rows: (tileTypes.length+1),
					 cols: (tileTypes[0].length+1),
					 image: "images/" + player.species.type + "/Species.png",
					 row: testRow,
					 col: (testCol+1),
					 status: AttributeEnum.STOP,
					 left: 0,
					 right: 0,
					 sight: testSight,
					 endurance: (testEndurance-1)});
}

function testClimbOverOff_OverRight_NoEndurance()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testHealth = 3;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  health: testHealth, sight: testSight, endurance: 1},
			 {innerText: ActionEnum.CLIMB_OVER});

	moveUpRight(true);

	validateResults({rows: (tileTypes.length+1),
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
