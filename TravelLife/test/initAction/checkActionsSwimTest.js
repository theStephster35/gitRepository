function testCheckActionsSwim()
{
	runTest("SSS BWB WWW - Swim", test_SSS_BWB_WWW_Swim);
	runTest("SSS BWB WWW - Swim, No Endurance", test_SSS_BWB_WWW_Swim_NoEndurance);
	runTest("SSS BWB WWW - Swim, No Recovery", test_SSS_BWB_WWW_Swim_NoRecovery);
	runTest("SSS BWB WWW - Swim, No Health", test_SSS_BWB_WWW_Swim_NoHealth);

	runTest("SSS BWB WWW - Swim, Treasure", test_SSS_BWB_WWW_Swim_Treasure);
	runTest("SSS BWB WWW - Swim, Full H-Treasure", test_SSS_BWB_WWW_Swim_FullHTreasure);
	runTest("SSS BWB WWW - Swim, Need H-Treasure", test_SSS_BWB_WWW_Swim_NeedHTreasure);
	runTest("SSS BWB WWW - Swim, Full S-Treasure", test_SSS_BWB_WWW_Swim_FullSTreasure);
	runTest("SSS BWB WWW - Swim, Need S-Treasure", test_SSS_BWB_WWW_Swim_NeedSTreasure);
	runTest("SSS BWB WWW - Swim, Full R-Treasure", test_SSS_BWB_WWW_Swim_FullRTreasure);
	runTest("SSS BWB WWW - Swim, Need R-Treasure", test_SSS_BWB_WWW_Swim_NeedRTreasure);
	runTest("SSS BWB WWW - Swim, Full E-Treasure", test_SSS_BWB_WWW_Swim_FullETreasure);
	runTest("SSS BWB WWW - Swim, Need E-Treasure", test_SSS_BWB_WWW_Swim_NeedETreasure);

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

	runTest("WWW WWW WWW - Swim, Treasure", test_WWW_WWW_WWW_Swim_Treasure);
	runTest("WWW WWW WWW - Swim, Full H-Treasure", test_WWW_WWW_WWW_Swim_FullHTreasure);
	runTest("WWW WWW WWW - Swim, Need H-Treasure", test_WWW_WWW_WWW_Swim_NeedHTreasure);
	runTest("WWW WWW WWW - Swim, Full S-Treasure", test_WWW_WWW_WWW_Swim_FullSTreasure);
	runTest("WWW WWW WWW - Swim, Need S-Treasure", test_WWW_WWW_WWW_Swim_NeedSTreasure);
	runTest("WWW WWW WWW - Swim, Full R-Treasure", test_WWW_WWW_WWW_Swim_FullRTreasure);
	runTest("WWW WWW WWW - Swim, Need R-Treasure", test_WWW_WWW_WWW_Swim_NeedRTreasure);
	runTest("WWW WWW WWW - Swim, Full E-Treasure", test_WWW_WWW_WWW_Swim_FullETreasure);
	runTest("WWW WWW WWW - Swim, Need E-Treasure", test_WWW_WWW_WWW_Swim_NeedETreasure);
}

function test_SSS_BWB_WWW_Swim()
{
	initData([["S", "S", "S"],
			  ["B", "W", "B"],
			  ["W", "W", "W"]],
			 {row: 1, col: 1,
			  status: StatusEnum.SWIMMING});

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
			  status: StatusEnum.SWIMMING,
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
			  status: StatusEnum.SWIMMING,
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
			  status: StatusEnum.SWIMMING,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_SSS_BWB_WWW_Swim_Treasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["B", "W", "B"],
			  ["W", "W", "W"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_SSS_BWB_WWW_Swim_FullHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["B", "W", "B"],
			  ["W", "W", "W"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({center: ActionEnum.FLOAT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_SSS_BWB_WWW_Swim_NeedHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["B", "W", "B"],
			  ["W", "W", "W"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  health: 1, endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_SSS_BWB_WWW_Swim_FullSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["B", "W", "B"],
			  ["W", "W", "W"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({center: ActionEnum.FLOAT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_SSS_BWB_WWW_Swim_NeedSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["B", "W", "B"],
			  ["W", "W", "W"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  sight: 1, endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_SSS_BWB_WWW_Swim_FullRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["B", "W", "B"],
			  ["W", "W", "W"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({center: ActionEnum.FLOAT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_SSS_BWB_WWW_Swim_NeedRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["B", "W", "B"],
			  ["W", "W", "W"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  recovery: 1, endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_SSS_BWB_WWW_Swim_FullETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["B", "W", "B"],
			  ["W", "W", "W"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({upLeft: ActionEnum.CLIMB_OVER,
						upRight: ActionEnum.CLIMB_OVER,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_SSS_BWB_WWW_Swim_NeedETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["B", "W", "B"],
			  ["W", "W", "W"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_SSS_WWW_WWW_Swim()
{
	initData([["S", "S", "S"],
			  ["W", "W", "W"],
			  ["W", "W", "W"]],
			 {row: 1, col: 1,
			  status: StatusEnum.SWIMMING});

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
			  status: StatusEnum.SWIMMING,
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
			  status: StatusEnum.SWIMMING,
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
			  status: StatusEnum.SWIMMING,
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
			  status: StatusEnum.SWIMMING});

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
			  status: StatusEnum.SWIMMING,
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
			  status: StatusEnum.SWIMMING,
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
			  status: StatusEnum.SWIMMING,
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
			  status: StatusEnum.SWIMMING,
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
			  status: StatusEnum.SWIMMING,
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
			  status: StatusEnum.SWIMMING,
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
			  status: StatusEnum.SWIMMING,
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
			  status: StatusEnum.SWIMMING,
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
			  status: StatusEnum.SWIMMING,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_WWW_WWW_WWW_Swim_Treasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["W", "W", "W"],
			  ["W", "W", "W"],
			  ["W", "W", "W"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	initAction();

	validateInitAction({upLeft: ActionEnum.SWIM_UP_LEFT,
						up: ActionEnum.SWIM_UP,
						upRight: ActionEnum.SWIM_UP_RIGHT,
						left: ActionEnum.SWIM_LEFT,
						center: ActionEnum.COLLECT,
						right: ActionEnum.SWIM_RIGHT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_WWW_WWW_WWW_Swim_FullHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["W", "W", "W"],
			  ["W", "W", "W"],
			  ["W", "W", "W"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

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

function test_WWW_WWW_WWW_Swim_NeedHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["W", "W", "W"],
			  ["W", "W", "W"],
			  ["W", "W", "W"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  health: 1, endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({upLeft: ActionEnum.SWIM_UP_LEFT,
						up: ActionEnum.SWIM_UP,
						upRight: ActionEnum.SWIM_UP_RIGHT,
						left: ActionEnum.SWIM_LEFT,
						center: ActionEnum.COLLECT,
						right: ActionEnum.SWIM_RIGHT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_WWW_WWW_WWW_Swim_FullSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["W", "W", "W"],
			  ["W", "W", "W"],
			  ["W", "W", "W"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

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

function test_WWW_WWW_WWW_Swim_NeedSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["W", "W", "W"],
			  ["W", "W", "W"],
			  ["W", "W", "W"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  sight: 1, endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({upLeft: ActionEnum.SWIM_UP_LEFT,
						up: ActionEnum.SWIM_UP,
						upRight: ActionEnum.SWIM_UP_RIGHT,
						left: ActionEnum.SWIM_LEFT,
						center: ActionEnum.COLLECT,
						right: ActionEnum.SWIM_RIGHT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_WWW_WWW_WWW_Swim_FullRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["W", "W", "W"],
			  ["W", "W", "W"],
			  ["W", "W", "W"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

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

function test_WWW_WWW_WWW_Swim_NeedRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["W", "W", "W"],
			  ["W", "W", "W"],
			  ["W", "W", "W"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  recovery: 1, endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({upLeft: ActionEnum.SWIM_UP_LEFT,
						up: ActionEnum.SWIM_UP,
						upRight: ActionEnum.SWIM_UP_RIGHT,
						left: ActionEnum.SWIM_LEFT,
						center: ActionEnum.COLLECT,
						right: ActionEnum.SWIM_RIGHT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

function test_WWW_WWW_WWW_Swim_FullETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["W", "W", "W"],
			  ["W", "W", "W"],
			  ["W", "W", "W"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

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

function test_WWW_WWW_WWW_Swim_NeedETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["W", "W", "W"],
			  ["W", "W", "W"],
			  ["W", "W", "W"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.SWIMMING,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({upLeft: ActionEnum.SWIM_UP_LEFT,
						up: ActionEnum.SWIM_UP,
						upRight: ActionEnum.SWIM_UP_RIGHT,
						left: ActionEnum.SWIM_LEFT,
						center: ActionEnum.COLLECT,
						right: ActionEnum.SWIM_RIGHT,
						downLeft: ActionEnum.SWIM_DOWN_LEFT,
						down: ActionEnum.SWIM_DOWN,
						downRight: ActionEnum.SWIM_DOWN_RIGHT});
}

