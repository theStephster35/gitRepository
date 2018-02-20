function testMoveCenterLeftRight()
{
	// Move Left
	runTest("Test Let Go Left", testLetGo_Left);
	runTest("Test Let Go Left - No Endurance", testLetGo_Left_NoEndurance);
	runTest("Test Grab Left - Fall", testGrab_Left_Fall);
	runTest("Test Grab Left - Land", testGrab_Left_Land);
	runTest("Test Grab Left - Land, No Endurance", testGrab_Left_Land_NoEndurance);
	runTest("Test Run Left", testRun_Left);
	runTest("Test Run Left - No Endurance/Run", testRun_Left_NoEnduranceRun);

	// Stay Center
	runTest("Test Stop - Jump", testStop_Jump);
	runTest("Test Stop - Jump, No Endurance/Jump", testStop_Jump_NoEnduranceJump);
	runTest("Test Stop - Run", testStop_Run);
	runTest("Test Stop - Run, No Endurance/Run", testStop_Run_NoEnduranceRun);
	runTest("Test Rest", testRest);

	// Move Right
	runTest("Test Let Go Right", testLetGo_Right);
	runTest("Test Let Go Right - No Endurance", testLetGo_Right_NoEndurance);
	runTest("Test Grab Right - Fall", testGrab_Right_Fall);
	runTest("Test Grab Right - Land", testGrab_Right_Land);
	runTest("Test Grab Right - Land, No Endurance", testGrab_Right_Land_NoEndurance);
	runTest("Test Run Right", testRun_Right);
	runTest("Test Run Right - No Endurance/Run", testRun_Right_NoEnduranceRun);
}

function testLetGo_Left()
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
			  right: 1,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.LET_GO});

	moveLeft(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: ActionEnum.FALL,
						left: 0,
						right: 0,
						sight: testSight,
						endurance: (testEndurance-1)});
}

function testLetGo_Left_NoEndurance()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testHealth = 3;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  right: 1,
			  health: testHealth, sight: testSight, endurance: 1},
			 {innerText: ActionEnum.LET_GO});

	moveLeft(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: ActionEnum.FALL,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0});
}

function testGrab_Left_Fall()
{
	var testRow = 1;
	var testCol = 1;
	var testDown = 3;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  status: "",
			  right: 1, down: testDown,
			  sight: testSight, endurance: testEndurance, climb: 0},
			 {innerText: ActionEnum.GRAB_LEFT});

	moveLeft(true);

	var playerDown = player.momentum.down;
	var climbing = (playerDown === 0);

	validateTakeAction({rows: (climbing ? tileTypes.length : tileTypes.length+1),
						cols: tileTypes[0].length,
						image: (climbing
								? "images/" + player.species.type + "/" + ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png"
							 	: "images/" + player.species.type + "/Suspended.png"),
					 	row: (climbing ? testRow : testRow+1),
					 	col: testCol,
					 	status: (climbing ? AttributeEnum.CLIMB : ActionEnum.FALL),
					 	left: (climbing ? 1 : 0),
					 	right: (climbing ? 0 : 1),
					 	down: playerDown,
					 	sight: testSight,
					 	endurance: (testEndurance-1),
					 	climb: (player.species.attributeMap.get(AttributeEnum.CLIMB))});
}

function testGrab_Left_Land()
{
	var testRow = 1;
	var testCol = 1;
	var testDown = 3;
	var testSight = 1;
	var testHealth = 3;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "images/" + (new Human()).type + "/Suspended.png",
			  row: testRow, col: testCol,
			  status: ActionEnum.FALL,
			  right: 1, down: testDown,
			  sight: testSight, health: testHealth, endurance: testEndurance, climb: 0},
			 {innerText: ActionEnum.GRAB_LEFT});

	moveLeft(true);

	var climbing = (player.status === AttributeEnum.CLIMB);
	var speciesJump = player.attributeMap.get(AttributeEnum.JUMP);
	var speciesClimb = player.attributeMap.get(AttributeEnum.CLIMB);
	var minHealth = testHealth - ((testDown - Math.ceil(speciesClimb/2) - Math.ceil(speciesJump/2)) < 0 
								   ? 0 : (testDown - Math.ceil(speciesClimb/2) - Math.ceil(speciesJump/2)));
	var maxHealth = testHealth - ((testDown - speciesClimb - speciesJump) < 0 
								   ? 0 : (testDown - speciesClimb - speciesJump));

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: (climbing
								? "images/" + player.species.type + "/" + ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png"
							 	: "images/" + player.species.type + "/Species.png"),
						row: testRow,
						col: testCol,
						status: (climbing ? AttributeEnum.CLIMB : ActionEnum.STOP),
						left: (climbing ? 1 : 0),
						right: 0,
						down: 0,
						sight: testSight,
						health: (climbing ? testHealth
										  : {min: (minHealth < 0 ? 0 : minHealth),
											 max: (maxHealth < 0 ? 0 : maxHealth)}),
						endurance: (testEndurance-1),
						climb: speciesClimb});
}

function testGrab_Left_Land_NoEndurance()
{
	var testRow = 1;
	var testCol = 1;
	var testDown = 3;
	var testSight = 1;
	var testHealth = 3;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "images/" + (new Human()).type + "/Suspended.png",
			  row: testRow, col: testCol,
			  status: ActionEnum.FALL,
			  right: 1, down: testDown,
			  sight: testSight, health: testHealth, endurance: 1, climb: 0},
			 {innerText: ActionEnum.GRAB_LEFT});

	moveLeft(true);

	var climbing = (player.status === AttributeEnum.CLIMB);
	var speciesJump = player.attributeMap.get(AttributeEnum.JUMP);
	var speciesClimb = player.attributeMap.get(AttributeEnum.CLIMB);
	var minHealth = (testHealth-1) - ((testDown - Math.ceil(speciesClimb/2) - Math.ceil(speciesJump/2)) < 0 
									   ? 0 : (testDown - Math.ceil(speciesClimb/2) - Math.ceil(speciesJump/2)));
	var maxHealth = (testHealth-1) - ((testDown - speciesClimb - speciesJump) < 0 
									   ? 0 : (testDown - speciesClimb - speciesJump));

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: (climbing
								? "images/" + player.species.type + "/" + ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png"
							 	: "images/" + player.species.type + "/Species.png"),
						row: testRow,
						col: testCol,
						status: (climbing ? AttributeEnum.CLIMB : ActionEnum.STOP),
						left: (climbing ? 1 : 0),
						right: 0,
						down: 0,
						sight: testSight,
						health: (climbing ? (testHealth-1)
										  : {min: (minHealth < 0 ? 0 : minHealth),
											 max: (maxHealth < 0 ? 0 : maxHealth)}),
						endurance: (climbing ? player.species.attributeMap.get(AttributeEnum.ENDURANCE) : 0),
						climb: (player.species.attributeMap.get(AttributeEnum.CLIMB))});
}

function testRun_Left()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: "",
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.RUN_LEFT});

	moveLeft(true);

	var speciesRun = player.species.attributeMap.get(AttributeEnum.RUN);
	var stopped = (player.attributeMap.get(AttributeEnum.RUN) === speciesRun);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: (stopped
								? "images/" + player.species.type + "/Species.png"
								: "images/" + player.species.type + "/" + ActionEnum.RUN_LEFT.replace(" ", "") + ".png"),
						row: testRow,
						col: testCol,
						status: (stopped ? ActionEnum.STOP : AttributeEnum.RUN),
						left: (stopped ? 0 : 1),
						right: 0,
						sight: testSight,
						endurance: (stopped ? (testEndurance-1) : testEndurance),
						run: {min: 0, max: speciesRun}});
}

function testRun_Left_NoEnduranceRun()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testHealth = 3;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: AttributeEnum.RUN,
			  health: testHealth, sight: testSight, endurance: 1, run: 1},
			 {innerText: ActionEnum.RUN_LEFT});

	moveLeft(true);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: ActionEnum.STOP,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						run: player.species.attributeMap.get(AttributeEnum.RUN)});
}

function testStop_Jump()
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
			  status: AttributeEnum.JUMP,
			  up: 1, down: 1,
			  endurance: testEndurance, jump: 0},
			 {innerText: ActionEnum.STOP});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: ActionEnum.FALL,
						up: 0,
						down: 0,
						endurance: (testEndurance-1),
						jump: player.species.attributeMap.get(AttributeEnum.JUMP)});
}

function testStop_Jump_NoEnduranceJump()
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
			  status: AttributeEnum.JUMP,
			  up: 1, down: 1,
			  health: testHealth, endurance: 1, jump: 0},
			 {innerText: ActionEnum.STOP});

	stayCenter(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: ActionEnum.FALL,
						up: 0,
						down: 0,
						health: (testHealth-1),
						endurance: 0,
						jump: player.species.attributeMap.get(AttributeEnum.JUMP)});
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
						run: player.species.attributeMap.get(AttributeEnum.RUN)});
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
						run: player.species.attributeMap.get(AttributeEnum.RUN)});
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
						endurance: {min: 1, max: testRecovery}});
}

function testLetGo_Right()
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
			 {innerText: ActionEnum.LET_GO});

	moveRight(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: ActionEnum.FALL,
						left: 0,
						right: 0,
						sight: testSight,
						endurance: (testEndurance-1)});
}

function testLetGo_Right_NoEndurance()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  left: 1,
			  health: testHealth, sight: testSight, endurance: 1},
			 {innerText: ActionEnum.LET_GO});

	moveRight(true);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: "images/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: ActionEnum.FALL,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0});
}

function testGrab_Right_Fall()
{
	var testRow = 1;
	var testCol = 1;
	var testDown = 3;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  status: "",
			  left: 1, down: testDown,
			  sight: testSight, endurance: testEndurance, climb: 0},
			 {innerText: ActionEnum.GRAB_RIGHT});

	moveRight(true);

	var playerDown = player.momentum.down;
	var climbing = (playerDown === 0);

	validateTakeAction({rows: (climbing ? tileTypes.length : (tileTypes.length+1)),
						cols: tileTypes[0].length,
						image: (climbing
								? "images/" + player.species.type + "/" + ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png"
							 	: "images/" + player.species.type + "/Suspended.png"),
						row: (climbing ? testRow : testRow+1),
						col: testCol,
						status: (climbing ? AttributeEnum.CLIMB : ActionEnum.FALL),
						left: (climbing ? 0 : 1),
						right: (climbing ? 1 : 0),
						down: playerDown,
						sight: testSight,
						endurance: (testEndurance-1),
						climb: (player.species.attributeMap.get(AttributeEnum.CLIMB))});
}

function testGrab_Right_Land()
{
	var testRow = 1;
	var testCol = 1;
	var testDown = 3;
	var testSight = 1;
	var testHealth = 3;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "images/" + (new Human()).type + "/Suspended.png",
			  row: testRow, col: testCol,
			  status: ActionEnum.FALL,
			  left: 1, down: testDown,
			  sight: testSight, health: testHealth, endurance: testEndurance, climb: 0},
			 {innerText: ActionEnum.GRAB_RIGHT});

	moveRight(true);

	var climbing = (player.status === AttributeEnum.CLIMB);
	var speciesJump = player.attributeMap.get(AttributeEnum.JUMP);
	var speciesClimb = player.attributeMap.get(AttributeEnum.CLIMB);
	var minHealth = testHealth - ((testDown - Math.ceil(speciesClimb/2) - Math.ceil(speciesJump/2)) < 0 
								   ? 0 : (testDown - Math.ceil(speciesClimb/2) - Math.ceil(speciesJump/2)));
	var maxHealth = testHealth - ((testDown - speciesClimb - speciesJump) < 0 
								   ? 0 : (testDown - speciesClimb - speciesJump));

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: (climbing
								? "images/" + player.species.type + "/" + ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png"
							 	: "images/" + player.species.type + "/Species.png"),
						row: testRow,
						col: testCol,
						status: (climbing ? AttributeEnum.CLIMB : ActionEnum.STOP),
						left: 0,
						right: (climbing ? 1 : 0),
						down: 0,
						sight: testSight,
						health: (climbing ? testHealth
										  : {min: (minHealth < 0 ? 0 : minHealth),
											 max: (maxHealth < 0 ? 0 : maxHealth)}),
						endurance: (testEndurance-1),
						climb: speciesClimb});
}

function testGrab_Right_Land_NoEndurance()
{
	var testRow = 1;
	var testCol = 1;
	var testDown = 3;
	var testSight = 1;
	var testHealth = 3;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "images/" + (new Human()).type + "/Suspended.png",
			  row: testRow, col: testCol,
			  status: ActionEnum.FALL,
			  left: 1, down: testDown,
			  sight: testSight, health: testHealth, endurance: 1, climb: 0},
			 {innerText: ActionEnum.GRAB_RIGHT});

	moveRight(true);

	var climbing = (player.status === AttributeEnum.CLIMB);
	var speciesJump = player.attributeMap.get(AttributeEnum.JUMP);
	var speciesClimb = player.attributeMap.get(AttributeEnum.CLIMB);
	var minHealth = (testHealth-1) - ((testDown - Math.ceil(speciesClimb/2) - Math.ceil(speciesJump/2)) < 0 
									   ? 0 : (testDown - Math.ceil(speciesClimb/2) - Math.ceil(speciesJump/2)));
	var maxHealth = (testHealth-1) - ((testDown - speciesClimb - speciesJump) < 0 
									   ? 0 : (testDown - speciesClimb - speciesJump));

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: (climbing
								? "images/" + player.species.type + "/" + ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png"
							 	: "images/" + player.species.type + "/Species.png"),
						row: testRow,
						col: testCol,
						status: (climbing ? AttributeEnum.CLIMB : ActionEnum.STOP),
						left: 0,
						right: (climbing ? 1 : 0),
						down: 0,
					 	sight: testSight,
					 	health: (climbing ? (testHealth-1)
					 					  : {min: (minHealth < 0 ? 0 : minHealth),
					 						 max: (maxHealth < 0 ? 0 : maxHealth)}),
					 	endurance: (climbing ? player.species.attributeMap.get(AttributeEnum.ENDURANCE) : 0),
					 	climb: (player.species.attributeMap.get(AttributeEnum.CLIMB))});
}

function testRun_Right()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  status: "",
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.RUN_RIGHT});

	moveRight(true);

	var speciesRun = player.species.attributeMap.get(AttributeEnum.RUN);
	var stopped = (player.attributeMap.get(AttributeEnum.RUN) === speciesRun);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: (stopped
								? "images/" + player.species.type + "/Species.png"
								: "images/" + player.species.type + "/" + ActionEnum.RUN_RIGHT.replace(" ", "") + ".png"),
						row: testRow,
						col: (testCol+1),
						status: (stopped ? ActionEnum.STOP : AttributeEnum.RUN),
						left: 0,
						right: (stopped ? 0 : 1),
						sight: testSight,
						endurance: (stopped ? (testEndurance-1) : testEndurance),
						run: {min: 0, max: speciesRun}});
}

function testRun_Right_NoEnduranceRun()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: AttributeEnum.RUN,
			  health: testHealth, sight: testSight, endurance: 1, run: 1},
			 {innerText: ActionEnum.RUN_RIGHT});

	moveRight(true);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: "images/" + player.species.type + "/Species.png",
						row: testRow,
						col: (testCol+1),
						status: ActionEnum.STOP,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						run: player.species.attributeMap.get(AttributeEnum.RUN)});
}
