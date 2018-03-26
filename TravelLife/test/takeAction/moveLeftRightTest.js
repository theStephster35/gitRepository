function testMoveLeftRight()
{
	// Move Left
	runTest("Test Drift Left - Left", testDrift_Left_Left);
	runTest("Test Drift Left - Down", testDrift_Left_Down);
	runTest("Test Let Go Left", testLetGo_Left);
	runTest("Test Let Go Left - No Endurance", testLetGo_Left_NoEndurance);
	runTest("Test Grab Left - Fall Left", testGrab_Left_FallLeft);
	runTest("Test Grab Left - Fall Down", testGrab_Left_FallDown);
	runTest("Test Grab Left - Land", testGrab_Left_Land);
	runTest("Test Grab Left - Land, No Endurance", testGrab_Left_Land_NoEndurance);
	runTest("Test Run Left", testRun_Left);
	runTest("Test Run Left - No Endurance/Run", testRun_Left_NoEnduranceRun);
	runTest("Test Swim Left", testSwim_Left);
	runTest("Test Swim Left - No Swim", testSwim_Left_NoSwim);
	runTest("Test Swim Left - No Endurance", testSwim_Left_NoEndurance);
	runTest("Test Swim Left - No Endurance/Swim", testSwim_Left_NoEnduranceSwim);
	runTest("Test Dig Left", testDig_Left);
	runTest("Test Dig Left - Stop", testDig_Left_Stop);
	runTest("Test Dig Left - Fall", testDig_Left_Fall);
	runTest("Test Dig Left - No Endurance/Dig", testDig_Left_NoEnduranceDig);
	runTest("Test Dig Left - Climb", testDig_Left_Climb);
	runTest("Test Dig Left - Climb Stop", testDig_Left_ClimbStop);
	runTest("Test Dig Left - Climb Fall", testDig_Left_ClimbFall);
	runTest("Test Dig Left - Climb No Endurance", testDig_Left_ClimbNoEndurance);

	// Move Right
	runTest("Test Drift Right - Right", testDrift_Right_Right);
	runTest("Test Drift Right - Down", testDrift_Right_Down);
	runTest("Test Let Go Right", testLetGo_Right);
	runTest("Test Let Go Right - No Endurance", testLetGo_Right_NoEndurance);
	runTest("Test Grab Right - Fall Right", testGrab_Right_FallRight);
	runTest("Test Grab Right - Fall Down", testGrab_Right_FallDown);
	runTest("Test Grab Right - Land", testGrab_Right_Land);
	runTest("Test Grab Right - Land, No Endurance", testGrab_Right_Land_NoEndurance);
	runTest("Test Run Right", testRun_Right);
	runTest("Test Run Right - No Endurance/Run", testRun_Right_NoEnduranceRun);
	runTest("Test Swim Right", testSwim_Right);
	runTest("Test Swim Right - No Swim", testSwim_Right_NoSwim);
	runTest("Test Swim Right - No Endurance", testSwim_Right_NoEndurance);
	runTest("Test Swim Right - No Endurance/Swim", testSwim_Right_NoEnduranceSwim);
	runTest("Test Dig Right", testDig_Right);
	runTest("Test Dig Right - Stop", testDig_Right_Stop);
	runTest("Test Dig Right - Fall", testDig_Right_Fall);
	runTest("Test Dig Right - No Endurance/Dig", testDig_Right_NoEnduranceDig);
	runTest("Test Dig Right - Climb", testDig_Right_Climb);
	runTest("Test Dig Right - Climb Stop", testDig_Right_ClimbStop);
	runTest("Test Dig Right - Climb Fall", testDig_Right_ClimbFall);
	runTest("Test Dig Right - Climb No Endurance", testDig_Right_ClimbNoEndurance);
}

function testDrift_Left_Left()
{
	var testImage = "images/Species/" + (new Human()).type + "/" + ActionEnum.JUMP_LEFT.replace(" ", "") + ".png";
	var testRow = 1;
	var testCol = 1;
	var testLeft = 2;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1, left: testLeft,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.DRIFT});

	moveLeft(true);

	var speciesJump = player.species.attributeMap.get(AttributeEnum.JUMP);
	var falling = (player.attributeMap.get(AttributeEnum.JUMP) === speciesJump);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
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

function testDrift_Left_Down()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1, left: 1,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.DRIFT});

	moveLeft(true);

	var speciesJump = player.species.attributeMap.get(AttributeEnum.JUMP);
	var falling = (player.attributeMap.get(AttributeEnum.JUMP) === speciesJump);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: (falling ? StatusEnum.FALLING : StatusEnum.JUMPING),
						up: (falling ? 0 : 1),
						left: 0,
						sight: testSight,
						endurance: (falling ? (testEndurance-1) : testEndurance),
						jump: {min: 1, max: speciesJump},
						tilesExposed: 12,
						tilesTraveled: 2});
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
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.FALLING,
						left: 0,
						right: 0,
						sight: testSight,
						endurance: (testEndurance-1),
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testLetGo_Left_NoEndurance()
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
			  right: 1,
			  health: testHealth, sight: testSight, endurance: 1},
			 {innerText: ActionEnum.LET_GO});

	moveLeft(true);

	validateTakeAction({rows: tileTypes.length,
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
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testGrab_Left_FallLeft()
{
	var testImage = "images/Species/" + (new Human()).type + "/" + ActionEnum.JUMP_LEFT.replace(" ", "") + ".png";
	var testRow = 1;
	var testCol = 1;
	var testRight = 2;
	var testDown = 3;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: "",
			  right: testRight, down: testDown,
			  sight: testSight, endurance: testEndurance, climb: 0},
			 {innerText: ActionEnum.GRAB_LEFT});

	moveLeft(true);

	var playerDown = player.momentum.down;
	var climbing = (playerDown === 0);

	validateTakeAction({rows: (climbing ? tileTypes.length : tileTypes.length+1),
						cols: tileTypes[0].length,
						image: (climbing
								? "images/Species/" + player.species.type + "/" + ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png"
							 	: testImage),
					 	row: (climbing ? testRow : testRow+1),
					 	col: testCol,
					 	status: (climbing ? StatusEnum.CLIMBING : StatusEnum.FALLING),
					 	left: (climbing ? 1 : 0),
					 	right: (climbing ? 0 : (testRight-1)),
					 	down: playerDown,
					 	sight: testSight,
					 	endurance: (testEndurance-1),
					 	climb: (player.species.attributeMap.get(AttributeEnum.CLIMB)),
						tilesExposed: (climbing ? 9 : 12),
						tilesTraveled: (climbing ? 1 : 2)});
}

function testGrab_Left_FallDown()
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
								? "images/Species/" + player.species.type + "/" + ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png"
							 	: "images/Species/" + player.species.type + "/Suspended.png"),
					 	row: (climbing ? testRow : testRow+1),
					 	col: testCol,
					 	status: (climbing ? StatusEnum.CLIMBING : StatusEnum.FALLING),
					 	left: (climbing ? 1 : 0),
					 	right: 0,
					 	down: playerDown,
					 	sight: testSight,
					 	endurance: (testEndurance-1),
					 	climb: (player.species.attributeMap.get(AttributeEnum.CLIMB)),
						tilesExposed: (climbing ? 9 : 12),
						tilesTraveled: (climbing ? 1 : 2)});
}

function testGrab_Left_Land()
{
	var testRow = 1;
	var testCol = 1;
	var testDown = 3;
	var testHealth = 3;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: StatusEnum.FALLING,
			  right: 1, down: testDown,
			  health: testHealth, sight: testSight, endurance: testEndurance, climb: 0},
			 {innerText: ActionEnum.GRAB_LEFT});

	moveLeft(true);

	var climbing = (player.status === StatusEnum.CLIMBING);
	var speciesJump = player.attributeMap.get(AttributeEnum.JUMP);
	var speciesClimb = player.attributeMap.get(AttributeEnum.CLIMB);
	var minHealth = testHealth - ((testDown - Math.ceil(speciesClimb/2) - Math.ceil(speciesJump/2)) < 0 
								   ? 0 : (testDown - Math.ceil(speciesClimb/2) - Math.ceil(speciesJump/2)));
	var maxHealth = testHealth - ((testDown - speciesClimb - speciesJump) < 0 
								   ? 0 : (testDown - speciesClimb - speciesJump));

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: (climbing
								? "images/Species/" + player.species.type + "/" + ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png"
							 	: "images/Species/" + player.species.type + "/Species.png"),
						row: testRow,
						col: testCol,
						status: (climbing ? StatusEnum.CLIMBING : StatusEnum.STOPPED),
						left: (climbing ? 1 : 0),
						right: 0,
						down: 0,
						health: (climbing ? testHealth
										  : {min: (minHealth < 0 ? 0 : minHealth),
											 max: (maxHealth < 0 ? 0 : maxHealth)}),
						sight: testSight,
						endurance: (testEndurance-1),
						climb: speciesClimb,
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testGrab_Left_Land_NoEndurance()
{
	var testRow = 1;
	var testCol = 1;
	var testDown = 3;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: StatusEnum.FALLING,
			  right: 1, down: testDown,
			  health: testHealth, sight: testSight, endurance: 1, climb: 0},
			 {innerText: ActionEnum.GRAB_LEFT});

	moveLeft(true);

	var climbing = (player.status === StatusEnum.CLIMBING);
	var speciesJump = player.attributeMap.get(AttributeEnum.JUMP);
	var speciesClimb = player.attributeMap.get(AttributeEnum.CLIMB);
	var minHealth = (testHealth-1) - ((testDown - Math.ceil(speciesClimb/2) - Math.ceil(speciesJump/2)) < 0 
									   ? 0 : (testDown - Math.ceil(speciesClimb/2) - Math.ceil(speciesJump/2)));
	var maxHealth = (testHealth-1) - ((testDown - speciesClimb - speciesJump) < 0 
									   ? 0 : (testDown - speciesClimb - speciesJump));

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: (climbing
								? "images/Species/" + player.species.type + "/" + ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png"
							 	: "images/Species/" + player.species.type + "/Species.png"),
						row: testRow,
						col: testCol,
						status: (climbing ? StatusEnum.CLIMBING : StatusEnum.STOPPED),
						left: (climbing ? 1 : 0),
						right: 0,
						down: 0,
						health: (climbing ? (testHealth-1)
										  : {min: (minHealth < 0 ? 0 : minHealth),
											 max: (maxHealth < 0 ? 0 : maxHealth)}),
						sight: testSight,
						endurance: (climbing ? player.species.attributeMap.get(AttributeEnum.ENDURANCE) : 0),
						climb: (player.species.attributeMap.get(AttributeEnum.CLIMB)),
						tilesExposed: 9,
						tilesTraveled: 1});
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
								? "images/Species/" + player.species.type + "/Species.png"
								: "images/Species/" + player.species.type + "/" + ActionEnum.RUN_LEFT.replace(" ", "") + ".png"),
						row: testRow,
						col: testCol,
						status: (stopped ? StatusEnum.STOPPED : StatusEnum.RUNNING),
						left: (stopped ? 0 : 1),
						right: 0,
						sight: testSight,
						endurance: (stopped ? (testEndurance-1) : testEndurance),
						run: {min: 0, max: speciesRun},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testRun_Left_NoEnduranceRun()
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
			  status: StatusEnum.RUNNING,
			  health: testHealth, sight: testSight, endurance: 1, run: 1},
			 {innerText: ActionEnum.RUN_LEFT});

	moveLeft(true);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.STOPPED,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						run: player.species.attributeMap.get(AttributeEnum.RUN),
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testSwim_Left()
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
			 {innerText: ActionEnum.SWIM_LEFT});

	moveLeft(true);

	var speciesSwim = player.species.attributeMap.get(AttributeEnum.SWIM);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
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

function testSwim_Left_NoSwim()
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
			 {innerText: ActionEnum.SWIM_LEFT});

	moveLeft(true);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
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

function testSwim_Left_NoEndurance()
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
			 {innerText: ActionEnum.SWIM_LEFT});

	moveLeft(true);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
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

function testSwim_Left_NoEnduranceSwim()
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
			 {innerText: ActionEnum.SWIM_LEFT});

	moveLeft(true);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
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

function testDig_Left()
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
			 {innerText: ActionEnum.DIG_LEFT});

	var testDurability = 3;
	var row = 1;
	var col = 0;
	mapTiles.children[row].children[col].value = testDurability;

	moveLeft(true);

	var speciesDig = player.species.attributeMap.get(AttributeEnum.DIG);
	var stopped = (player.attributeMap.get(AttributeEnum.DIG) === speciesDig);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: (stopped
								? "images/Species/" + player.species.type + "/Species.png"
								: "images/Species/" + player.species.type + "/" + ActionEnum.DIG_LEFT.replace(" ", "") + ".png"),
						row: testRow,
						col: testCol,
						status: (stopped ? StatusEnum.STOPPED : StatusEnum.DIGGING),
						left: (stopped ? 0 : 1),
						sight: testSight,
						endurance: (stopped ? (testEndurance-1) : testEndurance),
						dig: {min: 1, max: speciesDig},
						tilesExposed: 9,
						tilesTraveled: 1});

	validateTakeActionData("durability", mapTiles.children[row].children[col].value, -1, (testDurability-1));
}

function testDig_Left_Stop()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["G", "S", "G"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: "",
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.DIG_LEFT});

	var row = 1;
	var col = 0;
	mapTiles.children[row].children[col].value = 1;

	moveLeft(true);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.STOPPED,
						sight: testSight,
						endurance: (testEndurance-1),
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 12,
						tilesTraveled: 2});

	validateTakeActionData("durability", mapTiles.children[row].children[(col+1)].value, -1, -1);
}

function testDig_Left_Fall()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["G", "S", "G"],
					 ["D", "G", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.DIG_LEFT});

	var row = 1;
	var col = 0;
	mapTiles.children[row].children[col].value = 1;

	moveLeft(true);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.FALLING,
						sight: testSight,
						endurance: (testEndurance-1),
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 12,
						tilesTraveled: 2});

	validateTakeActionData("durability", mapTiles.children[row].children[(col+1)].value, -1, -1);
}

function testDig_Left_NoEnduranceDig()
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
			 {innerText: ActionEnum.DIG_LEFT});

	var testDurability = 3;
	var row = 1;
	var col = 0;
	mapTiles.children[row].children[col].value = testDurability;

	moveLeft(true);

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

function testDig_Left_Climb()
{
	var testImage =  "images/Species/" + (new Human()).type + "/" + ActionEnum.CLIMB_LEFT.replace(" ", "") + ".png";
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["G", "S", "G"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  left: 1,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.DIG_LEFT});

	var testDurability = 3;
	var row = 1;
	var col = 0;
	mapTiles.children[row].children[col].value = testDurability;

	moveLeft(true);

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

function testDig_Left_ClimbStop()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["G", "S", "G"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  left: 1,
			  sight: testSight, endurance: testEndurance, climb: 1},
			 {innerText: ActionEnum.DIG_LEFT});

	var row = 1;
	var col = 0;
	mapTiles.children[row].children[col].value = 1;

	moveLeft(true);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.STOPPED,
						left: 0,
						sight: testSight,
						endurance: (testEndurance-1),
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 12,
						tilesTraveled: 2});

	validateTakeActionData("durability", mapTiles.children[row].children[(col+1)].value, -1, -1);
}

function testDig_Left_ClimbFall()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["G", "S", "G"],
					 ["D", "S", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  left: 1,
			  sight: testSight, endurance: testEndurance, climb: 1},
			 {innerText: ActionEnum.DIG_LEFT});

	var row = 1;
	var col = 0;
	mapTiles.children[row].children[col].value = 1;

	moveLeft(true);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.FALLING,
						left: 0,
						sight: testSight,
						endurance: (testEndurance-1),
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 12,
						tilesTraveled: 2});

	validateTakeActionData("durability", mapTiles.children[row].children[(col+1)].value, -1, -1);
}

function testDig_Left_ClimbNoEndurance()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["G", "S", "G"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  left: 1,
			  health: testHealth, sight: testSight, endurance: 1, climb: 1},
			 {innerText: ActionEnum.DIG_LEFT});

	var testDurability = 3;
	var row = 1;
	var col = 0;
	mapTiles.children[row].children[col].value = testDurability;

	moveLeft(true);

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
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 9,
						tilesTraveled: 1});

	validateTakeActionData("durability", mapTiles.children[row].children[col].value, -1, (testDurability-1));
}

function testDrift_Right_Right()
{
	var testImage = "images/Species/" + (new Human()).type + "/" + ActionEnum.JUMP_RIGHT.replace(" ", "") + ".png";
	var testRow = 1;
	var testCol = 1;
	var testRight = 2;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1, right: testRight,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.DRIFT});

	moveRight(true);

	var speciesJump = player.species.attributeMap.get(AttributeEnum.JUMP);
	var falling = (player.attributeMap.get(AttributeEnum.JUMP) === speciesJump);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: testRow,
						col: (testCol+1),
						status: (falling ? StatusEnum.FALLING : StatusEnum.JUMPING),
						up: (falling ? 0 : 1),
						right: (testRight-1),
						sight: testSight,
						endurance: (falling ? (testEndurance-1) : testEndurance),
						jump: {min: 1, max: speciesJump},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testDrift_Right_Down()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["S", "S", "S"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1, right: 1,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.DRIFT});

	moveRight(true);

	var speciesJump = player.species.attributeMap.get(AttributeEnum.JUMP);
	var falling = (player.attributeMap.get(AttributeEnum.JUMP) === speciesJump);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: (testCol+1),
						status: (falling ? StatusEnum.FALLING : StatusEnum.JUMPING),
						up: (falling ? 0 : 1),
						right: 0,
						sight: testSight,
						endurance: (falling ? (testEndurance-1) : testEndurance),
						jump: {min: 1, max: speciesJump},
						tilesExposed: 12,
						tilesTraveled: 2});
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
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.FALLING,
						left: 0,
						right: 0,
						sight: testSight,
						endurance: (testEndurance-1),
						tilesExposed: 9,
						tilesTraveled: 1});
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
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: testCol,
						status: StatusEnum.FALLING,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testGrab_Right_FallRight()
{
	var testImage = "images/Species/" + (new Human()).type + "/" + ActionEnum.JUMP_RIGHT.replace(" ", "") + ".png";
	var testRow = 1;
	var testCol = 1;
	var testLeft = 2;
	var testDown = 3;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: "",
			  left: testLeft, down: testDown,
			  sight: testSight, endurance: testEndurance, climb: 0},
			 {innerText: ActionEnum.GRAB_RIGHT});

	moveRight(true);

	var playerDown = player.momentum.down;
	var climbing = (playerDown === 0);

	validateTakeAction({rows: (climbing ? tileTypes.length : (tileTypes.length+1)),
						cols: tileTypes[0].length,
						image: (climbing
								? "images/Species/" + player.species.type + "/" + ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png"
							 	: testImage),
						row: (climbing ? testRow : testRow+1),
						col: testCol,
						status: (climbing ? StatusEnum.CLIMBING : StatusEnum.FALLING),
						left: (climbing ? 0 : (testLeft-1)),
						right: (climbing ? 1 : 0),
						down: playerDown,
						sight: testSight,
						endurance: (testEndurance-1),
						climb: (player.species.attributeMap.get(AttributeEnum.CLIMB)),
						tilesExposed: (climbing ? 9 : 12),
						tilesTraveled: (climbing ? 1 : 2)});
}

function testGrab_Right_FallDown()
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
								? "images/Species/" + player.species.type + "/" + ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png"
							 	: "images/Species/" + player.species.type + "/Suspended.png"),
						row: (climbing ? testRow : testRow+1),
						col: testCol,
						status: (climbing ? StatusEnum.CLIMBING : StatusEnum.FALLING),
						left: 0,
						right: (climbing ? 1 : 0),
						down: playerDown,
						sight: testSight,
						endurance: (testEndurance-1),
						climb: (player.species.attributeMap.get(AttributeEnum.CLIMB)),
						tilesExposed: (climbing ? 9 : 12),
						tilesTraveled: (climbing ? 1 : 2)});
}

function testGrab_Right_Land()
{
	var testRow = 1;
	var testCol = 1;
	var testDown = 3;
	var testHealth = 3;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: StatusEnum.FALLING,
			  left: 1, down: testDown,
			  health: testHealth, sight: testSight, endurance: testEndurance, climb: 0},
			 {innerText: ActionEnum.GRAB_RIGHT});

	moveRight(true);

	var climbing = (player.status === StatusEnum.CLIMBING);
	var speciesJump = player.attributeMap.get(AttributeEnum.JUMP);
	var speciesClimb = player.attributeMap.get(AttributeEnum.CLIMB);
	var minHealth = testHealth - ((testDown - Math.ceil(speciesClimb/2) - Math.ceil(speciesJump/2)) < 0 
								   ? 0 : (testDown - Math.ceil(speciesClimb/2) - Math.ceil(speciesJump/2)));
	var maxHealth = testHealth - ((testDown - speciesClimb - speciesJump) < 0 
								   ? 0 : (testDown - speciesClimb - speciesJump));

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: (climbing
								? "images/Species/" + player.species.type + "/" + ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png"
							 	: "images/Species/" + player.species.type + "/Species.png"),
						row: testRow,
						col: testCol,
						status: (climbing ? StatusEnum.CLIMBING : StatusEnum.STOPPED),
						left: 0,
						right: (climbing ? 1 : 0),
						down: 0,
						health: (climbing ? testHealth
								 		  : {min: (minHealth < 0 ? 0 : minHealth),
								 			 max: (maxHealth < 0 ? 0 : maxHealth)}),
						sight: testSight,
						endurance: (testEndurance-1),
						climb: speciesClimb,
						tilesExposed: 9,
						tilesTraveled: 1});
}

function testGrab_Right_Land_NoEndurance()
{
	var testRow = 1;
	var testCol = 1;
	var testDown = 3;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["B", "S", "B"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: StatusEnum.FALLING,
			  left: 1, down: testDown,
			  health: testHealth, sight: testSight, endurance: 1, climb: 0},
			 {innerText: ActionEnum.GRAB_RIGHT});

	moveRight(true);

	var climbing = (player.status === StatusEnum.CLIMBING);
	var speciesJump = player.attributeMap.get(AttributeEnum.JUMP);
	var speciesClimb = player.attributeMap.get(AttributeEnum.CLIMB);
	var minHealth = (testHealth-1) - ((testDown - Math.ceil(speciesClimb/2) - Math.ceil(speciesJump/2)) < 0 
									   ? 0 : (testDown - Math.ceil(speciesClimb/2) - Math.ceil(speciesJump/2)));
	var maxHealth = (testHealth-1) - ((testDown - speciesClimb - speciesJump) < 0 
									   ? 0 : (testDown - speciesClimb - speciesJump));

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: (climbing
								? "images/Species/" + player.species.type + "/" + ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png"
							 	: "images/Species/" + player.species.type + "/Species.png"),
						row: testRow,
						col: testCol,
						status: (climbing ? StatusEnum.CLIMBING : StatusEnum.STOPPED),
						left: 0,
						right: (climbing ? 1 : 0),
						down: 0,
					 	health: (climbing ? (testHealth-1)
					 					  : {min: (minHealth < 0 ? 0 : minHealth),
					 						 max: (maxHealth < 0 ? 0 : maxHealth)}),
					 	sight: testSight,
					 	endurance: (climbing ? player.species.attributeMap.get(AttributeEnum.ENDURANCE) : 0),
					 	climb: (player.species.attributeMap.get(AttributeEnum.CLIMB)),
						tilesExposed: 9,
						tilesTraveled: 1});
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
								? "images/Species/" + player.species.type + "/Species.png"
								: "images/Species/" + player.species.type + "/" + ActionEnum.RUN_RIGHT.replace(" ", "") + ".png"),
						row: testRow,
						col: (testCol+1),
						status: (stopped ? StatusEnum.STOPPED : StatusEnum.RUNNING),
						left: 0,
						right: (stopped ? 0 : 1),
						sight: testSight,
						endurance: (stopped ? (testEndurance-1) : testEndurance),
						run: {min: 0, max: speciesRun},
						tilesExposed: 12,
						tilesTraveled: 2});
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
			  status: StatusEnum.RUNNING,
			  health: testHealth, sight: testSight, endurance: 1, run: 1},
			 {innerText: ActionEnum.RUN_RIGHT});

	moveRight(true);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: (testCol+1),
						status: StatusEnum.STOPPED,
						left: 0,
						right: 0,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						run: player.species.attributeMap.get(AttributeEnum.RUN),
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testSwim_Right()
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
			 {innerText: ActionEnum.SWIM_RIGHT});

	moveRight(true);

	var speciesSwim = player.species.attributeMap.get(AttributeEnum.SWIM);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: testRow,
						col: (testCol+1),
						status: StatusEnum.SWIMMING,
						sight: testSight,
						endurance: (player.attributeMap.get(AttributeEnum.SWIM) === speciesSwim
									? (testEndurance-1) : testEndurance),
						swim: {min: 1, max: speciesSwim},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testSwim_Right_NoSwim()
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
			 {innerText: ActionEnum.SWIM_RIGHT});

	moveRight(true);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: testRow,
						col: (testCol+1),
						status: StatusEnum.SWIMMING,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: player.species.attributeMap.get(AttributeEnum.SWIM),
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testSwim_Right_NoEndurance()
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
			 {innerText: ActionEnum.SWIM_RIGHT});

	moveRight(true);

	validateTakeAction({rows: tileTypes.length,
		cols: (tileTypes[0].length+1),
						image: testImage,
						row: testRow,
						col: (testCol+1),
						status: StatusEnum.SWIMMING,
						health: (player.attributeMap.get(AttributeEnum.SWIM) === 0
								 ? (testHealth-1) : testHealth),
						sight: testSight,
						endurance: 0,
						swim: {min: 0, max: (player.species.attributeMap.get(AttributeEnum.SWIM)-1)},
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testSwim_Right_NoEnduranceSwim()
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
			 {innerText: ActionEnum.SWIM_RIGHT});

	moveRight(true);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: testImage,
						row: testRow,
						col: (testCol+1),
						status: StatusEnum.SWIMMING,
						health: (testHealth-1),
						sight: testSight,
						endurance: 0,
						swim: 0,
						tilesExposed: 12,
						tilesTraveled: 2});
}

function testDig_Right()
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
			 {innerText: ActionEnum.DIG_RIGHT});

	var testDurability = 3;
	var row = 1;
	var col = 2;
	mapTiles.children[row].children[col].value = testDurability;

	moveRight(true);

	var speciesDig = player.species.attributeMap.get(AttributeEnum.DIG);
	var stopped = (player.attributeMap.get(AttributeEnum.DIG) === speciesDig);

	validateTakeAction({rows: tileTypes.length,
						cols: tileTypes[0].length,
						image: (stopped
								? "images/Species/" + player.species.type + "/Species.png"
								: "images/Species/" + player.species.type + "/" + ActionEnum.DIG_RIGHT.replace(" ", "") + ".png"),
						row: testRow,
						col: testCol,
						status: (stopped ? StatusEnum.STOPPED : StatusEnum.DIGGING),
						right: (stopped ? 0 : 1),
						sight: testSight,
						endurance: (stopped ? (testEndurance-1) : testEndurance),
						dig: {min: 1, max: speciesDig},
						tilesExposed: 9,
						tilesTraveled: 1});

	validateTakeActionData("durability", mapTiles.children[row].children[col].value, -1, (testDurability-1));
}

function testDig_Right_Stop()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["G", "S", "G"],
					 ["B", "G", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: "",
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.DIG_RIGHT});

	var row = 1;
	var col = 2;
	mapTiles.children[row].children[col].value = 1;

	moveRight(true);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: (testCol+1),
						status: StatusEnum.STOPPED,
						sight: testSight,
						endurance: (testEndurance-1),
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 12,
						tilesTraveled: 2});

	validateTakeActionData("durability", mapTiles.children[row].children[col].value, -1, -1);
}

function testDig_Right_Fall()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["G", "S", "G"],
					 ["B", "G", "D"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.DIG_RIGHT});

	var row = 1;
	var col = 2;
	mapTiles.children[row].children[col].value = 1;

	moveRight(true);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: (testCol+1),
						status: StatusEnum.FALLING,
						sight: testSight,
						endurance: (testEndurance-1),
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 12,
						tilesTraveled: 2});

	validateTakeActionData("durability", mapTiles.children[row].children[col].value, -1, -1);
}

function testDig_Right_NoEnduranceDig()
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
			 {innerText: ActionEnum.DIG_RIGHT});

	var testDurability = 3;
	var row = 1;
	var col = 2;
	mapTiles.children[row].children[col].value = testDurability;

	moveRight(true);

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

function testDig_Right_Climb()
{
	var testImage =  "images/Species/" + (new Human()).type + "/" + ActionEnum.CLIMB_RIGHT.replace(" ", "") + ".png";
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["G", "S", "G"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {image: testImage,
			  row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  right: 1,
			  sight: testSight, endurance: testEndurance},
			 {innerText: ActionEnum.DIG_RIGHT});

	var testDurability = 3;
	var row = 1;
	var col = 2;
	mapTiles.children[row].children[col].value = testDurability;

	moveRight(true);

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

function testDig_Right_ClimbStop()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["G", "S", "G"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {image: "",
			  row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  right: 1,
			  sight: testSight, endurance: testEndurance, climb: 1},
			 {innerText: ActionEnum.DIG_RIGHT});

	var row = 1;
	var col = 2;
	mapTiles.children[row].children[col].value = 1;

	moveRight(true);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Species.png",
						row: testRow,
						col: (testCol+1),
						status: StatusEnum.STOPPED,
						right: 0,
						sight: testSight,
						endurance: (testEndurance-1),
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 12,
						tilesTraveled: 2});

	validateTakeActionData("durability", mapTiles.children[row].children[col].value, -1, -1);
}

function testDig_Right_ClimbFall()
{
	var testRow = 1;
	var testCol = 1;
	var testSight = 1;
	var testEndurance = 5;
	var tileTypes = [["S", "S", "S"],
					 ["G", "S", "G"],
					 ["B", "S", "D"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  right: 1,
			  sight: testSight, endurance: testEndurance, climb: 1},
			 {innerText: ActionEnum.DIG_RIGHT});

	var row = 1;
	var col = 2;
	mapTiles.children[row].children[col].value = 1;

	moveRight(true);

	validateTakeAction({rows: tileTypes.length,
						cols: (tileTypes[0].length+1),
						image: "images/Species/" + player.species.type + "/Suspended.png",
						row: testRow,
						col: (testCol+1),
						status: StatusEnum.FALLING,
						right: 0,
						sight: testSight,
						endurance: (testEndurance-1),
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 12,
						tilesTraveled: 2});

	validateTakeActionData("durability", mapTiles.children[row].children[col].value, -1, -1);
}

function testDig_Right_ClimbNoEndurance()
{
	var testRow = 1;
	var testCol = 1;
	var testHealth = 3;
	var testSight = 1;
	var tileTypes = [["S", "S", "S"],
					 ["G", "S", "G"],
					 ["B", "S", "B"]];

	initData(tileTypes,
			 {row: testRow, col: testCol,
			  status: StatusEnum.CLIMBING,
			  right: 1,
			  health: testHealth, sight: testSight, endurance: 1, climb: 1},
			 {innerText: ActionEnum.DIG_RIGHT});

	var testDurability = 3;
	var row = 1;
	var col = 2;
	mapTiles.children[row].children[col].value = testDurability;

	moveRight(true);

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
						climb: player.species.attributeMap.get(AttributeEnum.CLIMB),
						dig: player.species.attributeMap.get(AttributeEnum.DIG),
						tilesExposed: 9,
						tilesTraveled: 1});

	validateTakeActionData("durability", mapTiles.children[row].children[col].value, -1, (testDurability-1));
}
