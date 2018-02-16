function testMoveDownLeftRight()
{
	// Move Down Left
	runTest("Test Climb Off Left", testClimbOverOff_OffLeft);
	runTest("Test Climb Off Left - No Endurance", testClimbOverOff_OffLeft_NoEndurance);

	// Move Down
	runTest("Test Climb Down Left", testClimb_DownLeft);
	runTest("Test Climb Down Left - No Endurance/Climb", testClimb_DownLeft_NoEnduranceClimb);
	runTest("Test Climb Down Right", testClimb_DownRight);
	runTest("Test Climb Down Right - No Endurance/Climb", testClimb_DownRight_NoEnduranceClimb);
	runTest("Test Fall", testFall);
	runTest("Test Land", testLand);

	// Move Down Right
	runTest("Test Climb Off Right", testClimbOverOff_OffRight);
	runTest("Test Climb Off Right - No Endurance", testClimbOverOff_OffRight_NoEndurance);
}

function testClimbOverOff_OffLeft()
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

	validateResults({rows: tileTypes.length,
					 cols: tileTypes[0].length,
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

function testClimbOverOff_OffLeft_NoEndurance()
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

	validateResults({rows: tileTypes.length,
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
					 climb: player.species.attributeMap.get(AttributeEnum.CLIMB)});
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

	validateResults({rows: (tileTypes.length+1),
					 cols: tileTypes[0].length,
					 image: testImage,
					 row: (testRow+1),
					 col: testCol,
					 status: AttributeEnum.CLIMB,
					 left: 1,
					 sight: testSight,
					 endurance: (player.attributeMap.get(AttributeEnum.CLIMB) === speciesClimb
							   ? (testEndurance-1) : testEndurance),
					 climb: {min: 0, max: speciesClimb}});
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

	validateResults({rows: (tileTypes.length+1),
					 cols: tileTypes[0].length,
					 image: "images/" + player.species.type + "/Suspended.png",
					 row: (testRow+1),
					 col: testCol,
					 status: ActionEnum.FALL,
					 left: 0,
					 right: 0,
					 health: (testHealth-1),
					 sight: testSight,
					 endurance: 0,
					 climb: player.species.attributeMap.get(AttributeEnum.CLIMB)});
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

	validateResults({rows: (tileTypes.length+1),
					 cols: tileTypes[0].length,
					 image: testImage,
					 row: (testRow+1),
					 col: testCol,
					 status: AttributeEnum.CLIMB,
					 right: 1,
					 sight: testSight,
					 endurance: (player.attributeMap.get(AttributeEnum.CLIMB) === speciesClimb
							   ? (testEndurance-1) : testEndurance),
					 climb: {min: 0, max: speciesClimb}});
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

	validateResults({rows: (tileTypes.length+1),
					 cols: tileTypes[0].length,
					 image: "images/" + player.species.type + "/Suspended.png",
					 row: (testRow+1),
					 col: testCol,
					 status: ActionEnum.FALL,
					 left: 0,
					 right: 0,
					 health: (testHealth-1),
					 sight: testSight,
					 endurance: 0,
					 climb: player.species.attributeMap.get(AttributeEnum.CLIMB)});
}

function testFall()
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
			  down: testDown,
			  sight: testSight, jump: 0},
			 {innerText: ActionEnum.FALL});

	moveDown(true);

	validateResults({rows: (tileTypes.length
						  + (player.attributeMap.get(AttributeEnum.SIGHT) === testSight ? 1 : 0)),
					 cols: tileTypes[0].length,
					 image: "images/" + player.species.type + "/Suspended.png",
					 row: (testRow+1),
					 col: testCol,
					 status: ActionEnum.FALL,
					 down: (testDown+1),
					 sight: {min: 1, max: player.species.attributeMap.get(AttributeEnum.SIGHT)},
					 jump: player.species.attributeMap.get(AttributeEnum.JUMP)});
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
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: ActionEnum.FALL,
			  left: 1, right: 1, down: testDown,
			  sight: testSight},
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

	validateResults({rows: tileTypes.length,
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
					 jump: player.species.attributeMap.get(AttributeEnum.JUMP)});
}

function testClimbOverOff_OffRight()
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

	validateResults({rows: tileTypes.length,
					 cols: tileTypes[0].length,
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

function testClimbOverOff_OffRight_NoEndurance()
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

	validateResults({rows: tileTypes.length,
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
					 climb: player.species.attributeMap.get(AttributeEnum.CLIMB)});
}
