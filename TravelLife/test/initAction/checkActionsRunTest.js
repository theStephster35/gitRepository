function testCheckActionsRun()
{
	runTest("BBB SSS BGB - Run Left", test_BBB_SSS_BGB_RunLeft);
	runTest("BBB SSS BGB - Run Right", test_BBB_SSS_BGB_RunRight);

	runTest("SSS SSS BGB - Run Left", test_SSS_SSS_BGB_RunLeft);
	runTest("SSS SSS BGB - Run Right", test_SSS_SSS_BGB_RunRight);
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

	validateInitAction({left: ActionEnum.RUN_LEFT,
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

	validateInitAction({center: ActionEnum.STOP,
						right: ActionEnum.RUN_RIGHT});
}
