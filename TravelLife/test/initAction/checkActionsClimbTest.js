function testCheckActionsClimb()
{
	runTest("SBS BSB BGB - Climb Left", test_SBS_BSB_BGB_ClimbLeft);
	runTest("SBS BSB BGB - Climb Left, No Health", test_SBS_BSB_BGB_ClimbLeft_NoHealth);
	runTest("SBS BSB BGB - Climb Right", test_SBS_BSB_BGB_ClimbRight);
	runTest("SBS BSB BGB - Climb Right, No Health", test_SBS_BSB_BGB_ClimbRight_NoHealth);

	runTest("SBS BSS BGB - Climb Left", test_SBS_BSS_BGB_ClimbLeft);
	runTest("SBS SSB BGB - Climb Right", test_SBS_BSB_BGB_ClimbRight);

	runTest("BSB BSB BSB - Climb Left", test_BSB_BSB_BSB_ClimbLeft);
	runTest("BSB BSB BSB - Climb Left, No Health", test_BSB_BSB_BSB_ClimbLeft_NoHealth);
	runTest("BSB BSB BSB - Climb Right", test_BSB_BSB_BSB_ClimbRight);
	runTest("BSB BSB BSB - Climb Right, No Health", test_BSB_BSB_BSB_ClimbRight_NoHealth);

	runTest("SSS BSB BSB - Climb Left", test_SSS_BSB_BSB_ClimbLeft);
	runTest("SSS BSB BSB - Climb Left, No Health", test_SSS_BSB_BSB_ClimbLeft_NoHealth);
	runTest("SSS BSB BSB - Climb Right", test_SSS_BSB_BSB_ClimbRight);
	runTest("SSS BSB BSB - Climb Right, No Health", test_SSS_BSB_BSB_ClimbRight_NoHealth);

	runTest("SSS BSB BWB - Climb Left", test_SSS_BSB_BWB_ClimbLeft);
	runTest("SSS BSB BWB - Climb Left, No Health", test_SSS_BSB_BWB_ClimbLeft_NoHealth);
	runTest("SSS BSB BWB - Climb Right", test_SSS_BSB_BWB_ClimbRight);
	runTest("SSS BSB BWB - Climb Right, No Health", test_SSS_BSB_BWB_ClimbRight_NoHealth);
}

function test_SBS_BSB_BGB_ClimbLeft()
{
	initData([["S", "B", "S"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  endurance: 1});

	initAction();

	validateInitAction({right: ActionEnum.LET_GO,
					 	downRight: ActionEnum.CLIMB_OFF});
}

function test_SBS_BSB_BGB_ClimbLeft_NoHealth()
{
	initData([["S", "B", "S"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_SBS_BSB_BGB_ClimbRight()
{
	initData([["S", "B", "S"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  endurance: 1});

	initAction();

	validateInitAction({left: ActionEnum.LET_GO,
					 	downLeft: ActionEnum.CLIMB_OFF});
}

function test_SBS_BSB_BGB_ClimbRight_NoHealth()
{
	initData([["S", "B", "S"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_SBS_BSS_BGB_ClimbLeft()
{
	initData([["S", "B", "S"],
			  ["B", "S", "S"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upRight: ActionEnum.JUMP_RIGHT,
						right: ActionEnum.LET_GO,
					 	downRight: ActionEnum.CLIMB_OFF});
}

function test_SBS_SSB_BGB_ClimbRight()
{
	initData([["S", "B", "S"],
			  ["S", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						right: ActionEnum.LET_GO,
					 	downRight: ActionEnum.CLIMB_OFF});
}

function test_BSB_BSB_BSB_ClimbLeft()
{
	initData([["B", "S", "B"],
			  ["B", "S", "B"],
			  ["B", "S", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.CLIMB_UP,
						right: ActionEnum.LET_GO,
						down: ActionEnum.CLIMB_DOWN});
}

function test_BSB_BSB_BSB_ClimbLeft_NoHealth()
{
	initData([["B", "S", "B"],
			  ["B", "S", "B"],
			  ["B", "S", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_BSB_BSB_BSB_ClimbRight()
{
	initData([["B", "S", "B"],
			  ["B", "S", "B"],
			  ["B", "S", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.CLIMB_UP,
						left: ActionEnum.LET_GO,
						down: ActionEnum.CLIMB_DOWN});
}

function test_BSB_BSB_BSB_ClimbRight_NoHealth()
{
	initData([["B", "S", "B"],
			  ["B", "S", "B"],
			  ["B", "S", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_SSS_BSB_BSB_ClimbLeft()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "S", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.CLIMB_OVER,
						upRight: ActionEnum.JUMP_RIGHT,
						right: ActionEnum.LET_GO,
						down: ActionEnum.CLIMB_DOWN});
}

function test_SSS_BSB_BSB_ClimbLeft_NoHealth()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "S", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_SSS_BSB_BSB_ClimbRight()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "S", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						upRight: ActionEnum.CLIMB_OVER,
						left: ActionEnum.LET_GO,
						down: ActionEnum.CLIMB_DOWN});
}

function test_SSS_BSB_BSB_ClimbRight_NoHealth()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "S", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_SSS_BSB_BWB_ClimbLeft()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "W", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.CLIMB_OVER,
						upRight: ActionEnum.JUMP_RIGHT,
						right: ActionEnum.LET_GO});
}

function test_SSS_BSB_BWB_ClimbLeft_NoHealth()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "W", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_SSS_BSB_BWB_ClimbRight()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "W", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						upRight: ActionEnum.CLIMB_OVER,
						left: ActionEnum.LET_GO});
}

function test_SSS_BSB_BWB_ClimbRight_NoHealth()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "W", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}
