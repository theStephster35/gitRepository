function testCheckActionsRunDig()
{
	runTest("BBB SSS BGB - Run Left", test_BBB_SSS_BGB_RunLeft);
	runTest("BBB SSS BGB - Run Right", test_BBB_SSS_BGB_RunRight);

	runTest("SSS SSS BGB - Run Left", test_SSS_SSS_BGB_RunLeft);
	runTest("SSS SSS BGB - Run Right", test_SSS_SSS_BGB_RunRight);

	runTest("SSS GSG BGB - Dig Left", test_SSS_GSG_BGB_DigLeft);
	runTest("SSS GSG BGB - Dig Right", test_SSS_GSG_BGB_DigRight);
	runTest("SSS GSG BGB - Dig Down", test_SSS_GSG_BGB_DigDown);
}

function test_BBB_SSS_BGB_RunLeft()
{
	initData([["B", "B", "B"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.RUN,
			  left: 1,
			  endurance: 1});

	initAction();

	validateInitAction({left: ActionEnum.RUN_LEFT,
					 	center: ActionEnum.STOP});
}

function test_BBB_SSS_BGB_RunRight()
{
	initData([["B", "B", "B"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.RUN,
			  right: 1,
			  endurance: 1});

	initAction();

	validateInitAction({center: ActionEnum.STOP,
						right: ActionEnum.RUN_RIGHT});
}

function test_SSS_SSS_BGB_RunLeft()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.RUN,
			  left: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						up: ActionEnum.JUMP_UP,
						left: ActionEnum.RUN_LEFT,
					 	center: ActionEnum.STOP});
}

function test_SSS_SSS_BGB_RunRight()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.RUN,
			  right: 1,
			  endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.JUMP_UP,
						upRight: ActionEnum.JUMP_RIGHT,
						center: ActionEnum.STOP,
						right: ActionEnum.RUN_RIGHT});
}

function test_SSS_GSG_BGB_DigLeft()
{
	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.DIG,
			  left: 1,
			  endurance: 1});

	initAction();

	validateInitAction({left: ActionEnum.DIG_LEFT,
					 	center: ActionEnum.STOP});
}

function test_SSS_GSG_BGB_DigRight()
{
	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.DIG,
			  right: 1,
			  endurance: 1});

	initAction();

	validateInitAction({center: ActionEnum.STOP,
						right: ActionEnum.DIG_RIGHT});
}

function test_SSS_GSG_BGB_DigDown()
{
	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.DIG,
			  down: 1,
			  endurance: 1});

	initAction();

	validateInitAction({center: ActionEnum.STOP,
						down: ActionEnum.DIG_DOWN});
}

