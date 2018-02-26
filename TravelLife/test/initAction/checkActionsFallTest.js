function testCheckActionsFall()
{
	runTest("BSB BSB BGB - Fall Down, No Endurance", test_BSB_BSB_BGB_Fall_Down_NoEndurance);
	runTest("BSB BSB BGB - Fall Down, No Health", test_BSB_BSB_BGB_Fall_Down_NoHealth);

	runTest("BSB BSB BSB - Fall Down, No Endurance", test_BSB_BSB_BSB_Fall_Down_NoEndurance);
	runTest("BSB BSB BSB - Fall Down, No Health", test_BSB_BSB_BSB_Fall_Down_NoHealth);

	runTest("SSS SSS BWB - Fall Down, No Endurance", test_SSS_SSS_BWB_Fall_Down_NoEndurance);
	runTest("SSS SSS BWB - Fall Down, No Health", test_SSS_SSS_BWB_Fall_Down_NoHealth);

	runTest("SSS BSB SBS - Fall Left, No Endurance", test_SSS_BSB_SBS_Fall_Left_NoEndurance);
	runTest("SSS BSB SBS - Fall Right, No Endurance", test_SSS_BSB_SBS_Fall_Right_NoEndurance);

	runTest("SSS SSS SSS - Fall Down, No Endurance", test_SSS_SSS_SSS_Fall_Down_NoEndurance);
	runTest("SSS SSS SSS - Fall Left, No Endurance", test_SSS_SSS_SSS_Fall_Left_NoEndurance);
	runTest("SSS SSS SSS - Fall Right, No Endurance", test_SSS_SSS_SSS_Fall_Right_NoEndurance);
	runTest("SSS SSS SSS - Fall Down, No Health", test_SSS_SSS_SSS_Fall_Down_NoHealth);
}

function test_BSB_BSB_BGB_Fall_Down_NoEndurance()
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

function test_BSB_BSB_BGB_Fall_Down_NoHealth()
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

function test_BSB_BSB_BSB_Fall_Down_NoEndurance()
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

function test_BSB_BSB_BSB_Fall_Down_NoHealth()
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

function test_SSS_SSS_BWB_Fall_Down_NoEndurance()
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

function test_SSS_SSS_BWB_Fall_Down_NoHealth()
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

function test_SSS_BSB_SBS_Fall_Left_NoEndurance()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["S", "B", "S"]],
			 {row: 1, col: 1,
			  status: ActionEnum.FALL_DOWN,
			  left: 1, down: 1,
			  endurance: 0});

	initAction();

	validateInitAction({left: ActionEnum.GRAB_LEFT,
						right: ActionEnum.GRAB_RIGHT,
						down: ActionEnum.LAND});
}

function test_SSS_BSB_SBS_Fall_Right_NoEndurance()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["S", "B", "S"]],
			 {row: 1, col: 1,
			  status: ActionEnum.FALL_DOWN,
			  right: 1, down: 1,
			  endurance: 0});

	initAction();

	validateInitAction({left: ActionEnum.GRAB_LEFT,
						right: ActionEnum.GRAB_RIGHT,
						down: ActionEnum.LAND});
}

function test_SSS_SSS_SSS_Fall_Down_NoEndurance()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: 1, col: 1,
			  status: ActionEnum.FALL_DOWN,
			  down: 1,
			  endurance: 0});

	initAction();

	validateInitAction({down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Left_NoEndurance()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: 1, col: 1,
			  status: ActionEnum.FALL_DOWN,
			  left: 1, down: 1,
			  endurance: 0});

	initAction();

	validateInitAction({downLeft: ActionEnum.FALL_LEFT,
						down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Right_NoEndurance()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: 1, col: 1,
			  status: ActionEnum.FALL_DOWN,
			  right: 1, down: 1,
			  endurance: 0});

	initAction();

	validateInitAction({down: ActionEnum.FALL_DOWN,
						downRight: ActionEnum.FALL_RIGHT});
}

function test_SSS_SSS_SSS_Fall_Down_NoHealth()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: 1, col: 1,
			  status: ActionEnum.FALL_DOWN,
			  down: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}
