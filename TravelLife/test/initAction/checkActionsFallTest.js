function testCheckActionsFall()
{
	runTest("BSB BSB BGB - Fall Down, No Endurance", test_BSB_BSB_BGB_FallDown_NoEndurance);
	runTest("BSB BSB BGB - Fall Down, No Health", test_BSB_BSB_BGB_FallDown_NoHealth);

	runTest("BSB BSB BSB - Fall Down, No Endurance", test_BSB_BSB_BSB_FallDown_NoEndurance);
	runTest("BSB BSB BSB - Fall Down, No Health", test_BSB_BSB_BSB_FallDown_NoHealth);

	runTest("SSS SSS BWB - Fall Down, No Endurance", test_SSS_SSS_BWB_FallDown_NoEndurance);
	runTest("SSS SSS BWB - Fall Down, No Health", test_SSS_SSS_BWB_FallDown_NoHealth);
}

function test_BSB_BSB_BGB_FallDown_NoEndurance()
{
	initData([["B", "S", "B"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: ActionEnum.FALL_DOWN,
			  down: 1,
			  endurance: 0});

	initAction();

	validateInitAction({left: ActionEnum.GRAB_LEFT,
					 	right: ActionEnum.GRAB_RIGHT,
					 	down: ActionEnum.LAND});
}

function test_BSB_BSB_BGB_FallDown_NoHealth()
{
	initData([["B", "S", "B"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: ActionEnum.FALL_DOWN,
			  down: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_BSB_BSB_BSB_FallDown_NoEndurance()
{
	initData([["B", "S", "B"],
			  ["B", "S", "B"],
			  ["B", "S", "B"]],
			 {row: 1, col: 1,
			  status: ActionEnum.FALL_DOWN,
			  down: 1,
			  endurance: 0});

	initAction();

	validateInitAction({left: ActionEnum.GRAB_LEFT,
					 	right: ActionEnum.GRAB_RIGHT,
					 	down: ActionEnum.FALL_DOWN});
}

function test_BSB_BSB_BSB_FallDown_NoHealth()
{
	initData([["B", "S", "B"],
			  ["B", "S", "B"],
			  ["B", "S", "B"]],
			 {row: 1, col: 1,
			  status: ActionEnum.FALL_DOWN,
			  down: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_SSS_SSS_BWB_FallDown_NoEndurance()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "W", "B"]],
			 {row: 1, col: 1,
			  status: ActionEnum.FALL_DOWN,
			  down: 1,
			  endurance: 0});

	initAction();

	validateInitAction({down: ActionEnum.SPLASH});
}

function test_SSS_SSS_BWB_FallDown_NoHealth()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "W", "B"]],
			 {row: 1, col: 1,
			  status: ActionEnum.FALL_DOWN,
			  down: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}
