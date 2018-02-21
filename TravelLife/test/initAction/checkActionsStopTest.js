function testCheckActionsStop()
{
	runTest("BBB BSB SGS", test_BBB_BSB_SGS);

	runTest("BBB BSB WGW", test_BBB_BSB_WGW);

	runTest("BBB BSB BGB", test_BBB_BSB_BGB);
	runTest("BBB BSB BGB - No Endurance", test_BBB_BSB_BGB_NoEndurance);
	runTest("BBB BSB BGB - No Recovery", test_SSS_SSS_BGB_NoRecovery);
	runTest("BBB BSB BGB - No Health", test_BBB_BSB_BGB_NoHealth);

	runTest("SSS SSS BGB", test_SSS_SSS_BGB);
	runTest("SSS SSS BGB - No Endurance", test_SSS_SSS_BGB_NoEndurance);
	runTest("SSS SSS BGB - No Recovery", test_SSS_SSS_BGB_NoRecovery);
	runTest("SSS SSS BGB - No Health", test_SSS_SSS_BGB_NoHealth);

	runTest("SSS SSS SGS", test_SSS_SSS_SGS);
	runTest("SSS SSS SGS - No Endurance", test_SSS_SSS_SGS_NoEndurance);
	runTest("SSS SSS SGS - No Recovery", test_SSS_SSS_SGS_NoRecovery);
	runTest("SSS SSS SGS - No Health", test_SSS_SSS_SGS_NoHealth);

	runTest("SSS SSS WGW", test_SSS_SSS_WGW);
	runTest("SSS SSS WGW - No Endurance", test_SSS_SSS_WGW_NoEndurance);
	runTest("SSS SSS WGW - No Recovery", test_SSS_SSS_WGW_NoRecovery);
	runTest("SSS SSS WGW - No Health", test_SSS_SSS_WGW_NoHealth);
}

function test_BBB_BSB_SGS()
{
	initData([["B", "B", "B"],
			  ["B", "S", "B"],
			  ["S", "G", "S"]],
			 {row: 1, col: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.CLIMB_LEFT,
					 	upRight: ActionEnum.CLIMB_RIGHT,
					 	center: ActionEnum.REST});
}

function test_BBB_BSB_WGW()
{
	initData([["B", "B", "B"],
			  ["B", "S", "B"],
			  ["W", "G", "W"]],
			 {row: 1, col: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.CLIMB_LEFT,
					 	upRight: ActionEnum.CLIMB_RIGHT,
					 	center: ActionEnum.REST});
}

function test_BBB_BSB_BGB()
{
	initData([["B", "B", "B"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.CLIMB_LEFT,
					 	upRight: ActionEnum.CLIMB_RIGHT,
					 	center: ActionEnum.REST});
}

function test_BBB_BSB_BGB_NoEndurance()
{
	initData([["B", "B", "B"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  endurance: 0});

	initAction();

	validateInitAction({center: ActionEnum.REST});
}

function test_BBB_BSB_BGB_NoRecovery()
{
	initData([["B", "B", "B"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  recovery: 0, endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.CLIMB_LEFT,
						upRight: ActionEnum.CLIMB_RIGHT});
}

function test_BBB_BSB_BGB_NoHealth()
{
	initData([["B", "B", "B"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_SSS_SSS_BGB()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.JUMP_UP,
						left: ActionEnum.RUN_LEFT,
						center: ActionEnum.REST,
						right: ActionEnum.RUN_RIGHT});
}

function test_SSS_SSS_BGB_NoEndurance()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  endurance: 0});

	initAction();

	validateInitAction({center: ActionEnum.REST});
}

function test_SSS_SSS_BGB_NoRecovery()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  recovery: 0, endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.JUMP_UP,
						left: ActionEnum.RUN_LEFT,
						right: ActionEnum.RUN_RIGHT});
}

function test_SSS_SSS_BGB_NoHealth()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_SSS_SSS_SGS()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: 1, col: 1,
			  endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.JUMP_UP,
						center: ActionEnum.REST,
						downLeft: ActionEnum.CLIMB_LEFT,
						downRight: ActionEnum.CLIMB_RIGHT});
}

function test_SSS_SSS_SGS_NoEndurance()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: 1, col: 1,
			  endurance: 0});

	initAction();

	validateInitAction({center: ActionEnum.REST});
}

function test_SSS_SSS_SGS_NoRecovery()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: 1, col: 1,
			  recovery: 0, endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.JUMP_UP,
						downLeft: ActionEnum.CLIMB_LEFT,
						downRight: ActionEnum.CLIMB_RIGHT});
}

function test_SSS_SSS_SGS_NoHealth()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: 1, col: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_SSS_SSS_WGW()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["W", "G", "W"]],
			 {row: 1, col: 1,
			  endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.JUMP_UP,
						center: ActionEnum.REST,
						downLeft: ActionEnum.CLIMB_LEFT,
						downRight: ActionEnum.CLIMB_RIGHT});
}

function test_SSS_SSS_WGW_NoEndurance()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["W", "G", "W"]],
			 {row: 1, col: 1,
			  endurance: 0});

	initAction();

	validateInitAction({center: ActionEnum.REST});
}

function test_SSS_SSS_WGW_NoRecovery()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["W", "G", "W"]],
			 {row: 1, col: 1,
			  recovery: 0, endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.JUMP_UP,
						downLeft: ActionEnum.CLIMB_LEFT,
						downRight: ActionEnum.CLIMB_RIGHT});
}

function test_SSS_SSS_WGW_NoHealth()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["W", "G", "W"]],
			 {row: 1, col: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}
