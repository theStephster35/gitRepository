function testCheckActionsStop()
{
	runTest("BBB BSB SGS", test_BBB_BSB_SGS);

	runTest("BBB BSB WBW", test_BBB_BSB_WBW);

	runTest("BSB GSG BGB", test_BSB_GSG_BGB);
	runTest("BSB GSG BGB - No Endurance", test_BSB_GSG_BGB_NoEndurance);
	runTest("BSB GSG BGB - No Recovery", test_BSB_GSG_BGB_NoRecovery);
	runTest("BSB GSG BGB - No Health", test_BSB_GSG_BGB_NoHealth);

	runTest("SBS SSS BGB", test_SBS_SSS_BGB);

	runTest("SSS BSB BGB", test_SSS_BSB_BGB);
	runTest("SSS BSB BGB - No Endurance", test_SSS_BSB_BGB_NoEndurance);
	runTest("SSS BSB BGB - No Recovery", test_SSS_BSB_BGB_NoRecovery);
	runTest("SSS BSB BGB - No Health", test_SSS_BSB_BGB_NoHealth);

	runTest("SSS SSS BGB", test_SSS_SSS_BGB);
	runTest("SSS SSS BGB - No Endurance", test_SSS_SSS_BGB_NoEndurance);
	runTest("SSS SSS BGB - No Recovery", test_SSS_SSS_BGB_NoRecovery);
	runTest("SSS SSS BGB - No Health", test_SSS_SSS_BGB_NoHealth);

	runTest("SSS SSS SGS", test_SSS_SSS_SGS);
	runTest("SSS SSS SGS - No Endurance", test_SSS_SSS_SGS_NoEndurance);
	runTest("SSS SSS SGS - No Recovery", test_SSS_SSS_SGS_NoRecovery);
	runTest("SSS SSS SGS - No Health", test_SSS_SSS_SGS_NoHealth);

	runTest("SSS SSS WBW", test_SSS_SSS_WBW);
	runTest("SSS SSS WBW - No Endurance", test_SSS_SSS_WBW_NoEndurance);
	runTest("SSS SSS WBW - No Recovery", test_SSS_SSS_WBW_NoRecovery);
	runTest("SSS SSS WBW - No Health", test_SSS_SSS_WBW_NoHealth);
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
					 	center: ActionEnum.REST,
					 	down: ActionEnum.DIG_DOWN});
}

function test_BBB_BSB_WBW()
{
	initData([["B", "B", "B"],
			  ["B", "S", "B"],
			  ["W", "B", "W"]],
			 {row: 1, col: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.CLIMB_LEFT,
					 	upRight: ActionEnum.CLIMB_RIGHT,
					 	center: ActionEnum.REST});
}

function test_BSB_GSG_BGB()
{
	initData([["B", "S", "B"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.JUMP_UP,
						upLeft: ActionEnum.CLIMB_LEFT,
					 	upRight: ActionEnum.CLIMB_RIGHT,
						left: ActionEnum.DIG_LEFT,
					 	center: ActionEnum.REST,
						right: ActionEnum.DIG_RIGHT,
					 	down: ActionEnum.DIG_DOWN});
}

function test_BSB_GSG_BGB_NoEndurance()
{
	initData([["B", "S", "B"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  endurance: 0});

	initAction();

	validateInitAction({center: ActionEnum.REST});
}

function test_BSB_GSG_BGB_NoRecovery()
{
	initData([["B", "S", "B"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  recovery: 0, endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.JUMP_UP,
						upLeft: ActionEnum.CLIMB_LEFT,
						upRight: ActionEnum.CLIMB_RIGHT,
						left: ActionEnum.DIG_LEFT,
						right: ActionEnum.DIG_RIGHT,
					 	down: ActionEnum.DIG_DOWN});
}

function test_BSB_GSG_BGB_NoHealth()
{
	initData([["B", "S", "B"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_SBS_SSS_BGB()
{
	initData([["S", "B", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
					 	upRight: ActionEnum.JUMP_RIGHT,
					 	left: ActionEnum.RUN_LEFT,
					 	center: ActionEnum.REST,
					 	right: ActionEnum.RUN_RIGHT,
					 	down: ActionEnum.DIG_DOWN});
}

function test_SSS_BSB_BGB()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.CLIMB_LEFT,
						up: ActionEnum.JUMP_UP,
					 	upRight: ActionEnum.CLIMB_RIGHT,
					 	center: ActionEnum.REST,
					 	down: ActionEnum.DIG_DOWN});
}

function test_SSS_BSB_BGB_NoEndurance()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  endurance: 0});

	initAction();

	validateInitAction({center: ActionEnum.REST});
}

function test_SSS_BSB_BGB_NoRecovery()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  recovery: 0, endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.CLIMB_LEFT,
						up: ActionEnum.JUMP_UP,
						upRight: ActionEnum.CLIMB_RIGHT,
					 	down: ActionEnum.DIG_DOWN});
}

function test_SSS_BSB_BGB_NoHealth()
{
	initData([["S", "S", "S"],
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

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						up: ActionEnum.JUMP_UP,
						upRight: ActionEnum.JUMP_RIGHT,
						left: ActionEnum.RUN_LEFT,
						center: ActionEnum.REST,
						right: ActionEnum.RUN_RIGHT,
					 	down: ActionEnum.DIG_DOWN});
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

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						up: ActionEnum.JUMP_UP,
						upRight: ActionEnum.JUMP_RIGHT,
						left: ActionEnum.RUN_LEFT,
						right: ActionEnum.RUN_RIGHT,
					 	down: ActionEnum.DIG_DOWN});
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

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						up: ActionEnum.JUMP_UP,
						upRight: ActionEnum.JUMP_RIGHT,
						center: ActionEnum.REST,
						downLeft: ActionEnum.CLIMB_LEFT,
					 	down: ActionEnum.DIG_DOWN,
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

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						up: ActionEnum.JUMP_UP,
						upRight: ActionEnum.JUMP_RIGHT,
						downLeft: ActionEnum.CLIMB_LEFT,
					 	down: ActionEnum.DIG_DOWN,
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

function test_SSS_SSS_WBW()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["W", "B", "W"]],
			 {row: 1, col: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						up: ActionEnum.JUMP_UP,
						upRight: ActionEnum.JUMP_RIGHT,
						center: ActionEnum.REST,
						downLeft: ActionEnum.CLIMB_LEFT,
						downRight: ActionEnum.CLIMB_RIGHT});
}

function test_SSS_SSS_WBW_NoEndurance()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["W", "B", "W"]],
			 {row: 1, col: 1,
			  endurance: 0});

	initAction();

	validateInitAction({center: ActionEnum.REST});
}

function test_SSS_SSS_WBW_NoRecovery()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["W", "B", "W"]],
			 {row: 1, col: 1,
			  recovery: 0, endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						up: ActionEnum.JUMP_UP,
						upRight: ActionEnum.JUMP_RIGHT,
						downLeft: ActionEnum.CLIMB_LEFT,
						downRight: ActionEnum.CLIMB_RIGHT});
}

function test_SSS_SSS_WBW_NoHealth()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["W", "B", "W"]],
			 {row: 1, col: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}
