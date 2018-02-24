function testCheckActionsSwim()
{
	runTest("SSS BWB WWW - Swim", test_SSS_BWB_WWW_Swim);
	runTest("SSS BWB WWW - Swim, No Endurance", test_SSS_BWB_WWW_Swim_NoEndurance);
	runTest("SSS BWB WWW - Swim, No Recovery", test_SSS_BWB_WWW_Swim_NoRecovery);
	runTest("SSS BWB WWW - Swim, No Health", test_SSS_BWB_WWW_Swim_NoHealth);

	runTest("SSS WWW WWW - Swim", test_SSS_WWW_WWW_Swim);
	runTest("SSS WWW WWW - Swim, No Endurance", test_SSS_WWW_WWW_Swim_NoEndurance);
	runTest("SSS WWW WWW - Swim, No Recovery", test_SSS_WWW_WWW_Swim_NoRecovery);
	runTest("SSS WWW WWW - Swim, No Health", test_SSS_WWW_WWW_Swim_NoHealth);

	runTest("BSB BWB WBW - Swim", test_BSB_BWB_WBW_Swim);
	runTest("BSB BWB WBW - Swim, No Endurance", test_BSB_BWB_WBW_Swim_NoEndurance);
	runTest("BSB BWB WBW - Swim, No Recovery", test_BSB_BWB_WBW_Swim_NoRecovery);
	runTest("BSB BWB WBW - Swim, No Health", test_BSB_BWB_WBW_Swim_NoHealth);

	runTest("WBW WWW WBW - Swim, No Endurance", test_WBW_WWW_WBW_Swim_NoEndurance);
	runTest("WBW WWW WBW - Swim, No Health", test_WBW_WWW_WBW_Swim_NoHealth);

	runTest("WWW BWB WWW - Swim, No Endurance", test_WWW_BWB_WWW_Swim_NoEndurance);
	runTest("WWW BWB WWW - Swim, No Health", test_WWW_BWB_WWW_Swim_NoHealth);

	runTest("WWW WWW WWW - Swim, No Endurance", test_WWW_WWW_WWW_Swim_NoEndurance);
	runTest("WWW WWW WWW - Swim, No Health", test_WWW_WWW_WWW_Swim_NoHealth);
}

function test_SSS_BWB_WWW_Swim()
{
	initData([["S", "S", "S"],
			  ["B", "W", "B"],
			  ["W", "W", "W"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.SWIM});

	initAction();

	validateInitAction({upLeft: ActionEnum.CLIMB_OVER,
						upRight: ActionEnum.CLIMB_OVER,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_SSS_BWB_WWW_Swim_NoEndurance()
{
	initData([["S", "S", "S"],
			  ["B", "W", "B"],
			  ["W", "W", "W"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.SWIM,
			  endurance: 0});

	initAction();

	validateInitAction({center: ActionEnum.FLOAT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_SSS_BWB_WWW_Swim_NoRecovery()
{
	initData([["S", "S", "S"],
			  ["B", "W", "B"],
			  ["W", "W", "W"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.SWIM,
			  recovery: 0});

	initAction();

	validateInitAction({upLeft: ActionEnum.CLIMB_OVER,
						upRight: ActionEnum.CLIMB_OVER,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_SSS_BWB_WWW_Swim_NoHealth()
{
	initData([["S", "S", "S"],
			  ["B", "W", "B"],
			  ["W", "W", "W"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.SWIM,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_SSS_WWW_WWW_Swim()
{
	initData([["S", "S", "S"],
			  ["W", "W", "W"],
			  ["W", "W", "W"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.SWIM});

	initAction();

	validateInitAction({left: ActionEnum.SWIM_LEFT,
						right: ActionEnum.SWIM_RIGHT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_SSS_WWW_WWW_Swim_NoEndurance()
{
	initData([["S", "S", "S"],
			  ["W", "W", "W"],
			  ["W", "W", "W"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.SWIM,
			  endurance: 0});

	initAction();

	validateInitAction({left: ActionEnum.SWIM_LEFT,
						center: ActionEnum.FLOAT,
						right: ActionEnum.SWIM_RIGHT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_SSS_WWW_WWW_Swim_NoRecovery()
{
	initData([["S", "S", "S"],
			  ["W", "W", "W"],
			  ["W", "W", "W"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.SWIM,
			  recovery: 0});

	initAction();

	validateInitAction({left: ActionEnum.SWIM_LEFT,
						right: ActionEnum.SWIM_RIGHT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_SSS_WWW_WWW_Swim_NoHealth()
{
	initData([["S", "S", "S"],
			  ["W", "W", "W"],
			  ["W", "W", "W"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.SWIM,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_BSB_BWB_WBW_Swim()
{
	initData([["B", "S", "B"],
			  ["B", "W", "B"],
			  ["W", "B", "W"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.SWIM});

	initAction();

	validateInitAction({upLeft: ActionEnum.CLIMB_OUT_LEFT,
						upRight: ActionEnum.CLIMB_OUT_RIGHT});
}

function test_BSB_BWB_WBW_Swim_NoEndurance()
{
	initData([["B", "S", "B"],
			  ["B", "W", "B"],
			  ["W", "B", "W"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.SWIM,
			  endurance: 0});

	initAction();

	validateInitAction({center: ActionEnum.FLOAT});
}

function test_BSB_BWB_WBW_Swim_NoRecovery()
{
	initData([["B", "S", "B"],
			  ["B", "W", "B"],
			  ["W", "B", "W"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.SWIM,
			  recovery: 0});

	initAction();

	validateInitAction({upLeft: ActionEnum.CLIMB_OUT_LEFT,
						upRight: ActionEnum.CLIMB_OUT_RIGHT});
}

function test_BSB_BWB_WBW_Swim_NoHealth()
{
	initData([["B", "S", "B"],
			  ["B", "W", "B"],
			  ["W", "B", "W"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.SWIM,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_WBW_WWW_WBW_Swim_NoEndurance()
{
	initData([["W", "B", "W"],
			  ["W", "W", "W"],
			  ["W", "B", "W"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.SWIM,
			  endurance: 0});

	initAction();

	validateInitAction({upLeft: ActionEnum.SWIM_UP_LEFT,
						upRight: ActionEnum.SWIM_UP_RIGHT,
						left: ActionEnum.SWIM_LEFT,
						right: ActionEnum.SWIM_RIGHT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_WBW_WWW_WBW_Swim_NoHealth()
{
	initData([["W", "B", "W"],
			  ["W", "W", "W"],
			  ["W", "B", "W"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.SWIM,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_WWW_BWB_WWW_Swim_NoEndurance()
{
	initData([["W", "W", "W"],
			  ["B", "W", "B"],
			  ["W", "W", "W"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.SWIM,
			  endurance: 0});

	initAction();

	validateInitAction({upLeft: ActionEnum.SWIM_UP_LEFT,
						up: ActionEnum.SWIM_UP,
						upRight: ActionEnum.SWIM_UP_RIGHT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_WWW_BWB_WWW_Swim_NoHealth()
{
	initData([["W", "W", "W"],
			  ["B", "W", "B"],
			  ["W", "W", "W"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.SWIM,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_WWW_WWW_WWW_Swim_NoEndurance()
{
	initData([["W", "W", "W"],
			  ["W", "W", "W"],
			  ["W", "W", "W"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.SWIM,
			  endurance: 0});

	initAction();

	validateInitAction({upLeft: ActionEnum.SWIM_UP_LEFT,
						up: ActionEnum.SWIM_UP,
						upRight: ActionEnum.SWIM_UP_RIGHT,
						left: ActionEnum.SWIM_LEFT,
						right: ActionEnum.SWIM_RIGHT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_WWW_WWW_WWW_Swim_NoHealth()
{
	initData([["W", "W", "W"],
			  ["W", "W", "W"],
			  ["W", "W", "W"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.SWIM,
			  health: 0});

	initAction();

	validateInitAction({});
}
