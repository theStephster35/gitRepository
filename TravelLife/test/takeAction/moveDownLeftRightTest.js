function testMoveDownLeftRight()
{
	// Move Down Left
	runTest("Test Climb Off Left", testClimbOverOff_OffLeft);
	runTest("Test Climb Off Left - No Endurance", testClimbOverOff_OffLeft_NoEndurance);
	runTest("Test Climb Left - Climb", testClimb_Left_Climb);
	runTest("Test Climb Left - Swim", testClimb_Left_Swim);
	runTest("Test Swim Down Left", testSwim_DownLeft);
	runTest("Test Swim Down Left - No Swim", testSwim_DownLeft_NoSwim);
	runTest("Test Swim Down Left - No Endurance", testSwim_DownLeft_NoEndurance);
	runTest("Test Swim Down Left - No Endurance/Swim", testSwim_DownLeft_NoEnduranceSwim);

	// Move Down
	runTest("Test Climb Down Left", testClimb_DownLeft);
	runTest("Test Climb Down Left - No Endurance/Climb", testClimb_DownLeft_NoEnduranceClimb);
	runTest("Test Climb Down Right", testClimb_DownRight);
	runTest("Test Climb Down Right - No Endurance/Climb", testClimb_DownRight_NoEnduranceClimb);
	runTest("Test Fall", testFall);
	runTest("Test Land", testLand);
	runTest("Test Splash", testSplash);
	runTest("Test Swim Down", testSwim_Up);
	runTest("Test Swim Down - No Swim", testSwim_Down_NoSwim);
	runTest("Test Swim Down - No Endurance", testSwim_Down_NoEndurance);
	runTest("Test Swim Down - No Endurance/Swim", testSwim_Down_NoEnduranceSwim);

	// Move Down Right
	runTest("Test Climb Off Right", testClimbOverOff_OffRight);
	runTest("Test Climb Off Right - No Endurance", testClimbOverOff_OffRight_NoEndurance);
	runTest("Test Climb Right - Climb", testClimb_Right_Climb);
	runTest("Test Climb Right - Swim", testClimb_Right_Swim);
	runTest("Test Swim Down Right", testSwim_DownRight);
	runTest("Test Swim Down Right - No Swim", testSwim_DownRight_NoSwim);
	runTest("Test Swim Down Right - No Endurance", testSwim_DownRight_NoEndurance);
	runTest("Test Swim Down Right - No Endurance/Swim", testSwim_DownRight_NoEnduranceSwim);
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
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB)});
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
						sight: testSight});
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
						sight: testSight});
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
						swim: {min: 1, max: speciesSwim}});
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
						swim: player.species.attributeMap.get(AttributeEnum.SWIM)});
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
						swim: {min: 0, max: (player.species.attributeMap.get(AttributeEnum.SWIM)-1)}});
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
						swim: 0});
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
			 {innerText: ActionEnum.FALL_DOWN});

	moveDown(true);

	validateTakeAction({rows: (tileTypes.length
							 + (player.attributeMap.get(AttributeEnum.SIGHT) === testSight ? 1 : 0)),
						cols: tileTypes[0].length,
						image: "images/" + player.species.type + "/Suspended.png",
						row: (testRow+1),
						col: testCol,
						status: ActionEnum.FALL_DOWN,
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
						jump: player.species.attributeMap.get(AttributeEnum.JUMP)});
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
						sight: testSight});
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
						swim: {min: 1, max: speciesSwim}});
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
						swim: player.species.attributeMap.get(AttributeEnum.SWIM)});
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
						swim: {min: 0, max: (player.species.attributeMap.get(AttributeEnum.SWIM)-1)}});
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
						swim: 0});
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
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB)});
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
						sight: testSight});
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
						sight: testSight});
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
						swim: {min: 1, max: speciesSwim}});
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
						swim: player.species.attributeMap.get(AttributeEnum.SWIM)});
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
						swim: {min: 0, max: (player.species.attributeMap.get(AttributeEnum.SWIM)-1)}});
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
						swim: 0});
}
