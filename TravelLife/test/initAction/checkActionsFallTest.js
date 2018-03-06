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

	runTest("SSS SSS WWW - Fall Left, No Endurance", test_SSS_SSS_WWW_Fall_Left_NoEndurance);
	runTest("SSS SSS WWW - Fall Right, No Endurance", test_SSS_SSS_WWW_Fall_Right_NoEndurance);

	runTest("SSS SSS SSS - Fall Left, Treasure", test_SSS_SSS_SSS_Fall_Left_Treasure);
	runTest("SSS SSS SSS - Fall Left, Full H-Treasure", test_SSS_SSS_SSS_Fall_Left_FullHTreasure);
	runTest("SSS SSS SSS - Fall Left, Need H-Treasure", test_SSS_SSS_SSS_Fall_Left_NeedHTreasure);
	runTest("SSS SSS SSS - Fall Left, Full S-Treasure", test_SSS_SSS_SSS_Fall_Left_FullSTreasure);
	runTest("SSS SSS SSS - Fall Left, Need S-Treasure", test_SSS_SSS_SSS_Fall_Left_NeedSTreasure);
	runTest("SSS SSS SSS - Fall Left, Full R-Treasure", test_SSS_SSS_SSS_Fall_Left_FullRTreasure);
	runTest("SSS SSS SSS - Fall Left, Need R-Treasure", test_SSS_SSS_SSS_Fall_Left_NeedRTreasure);
	runTest("SSS SSS SSS - Fall Left, Full E-Treasure", test_SSS_SSS_SSS_Fall_Left_FullETreasure);
	runTest("SSS SSS SSS - Fall Left, Need E-Treasure", test_SSS_SSS_SSS_Fall_Left_NeedETreasure);

	runTest("SSS SSS SSS - Fall Down, Treasure", test_SSS_SSS_SSS_Fall_Down_Treasure);
	runTest("SSS SSS SSS - Fall Down, Full H-Treasure", test_SSS_SSS_SSS_Fall_Down_FullHTreasure);
	runTest("SSS SSS SSS - Fall Down, Need H-Treasure", test_SSS_SSS_SSS_Fall_Down_NeedHTreasure);
	runTest("SSS SSS SSS - Fall Down, Full S-Treasure", test_SSS_SSS_SSS_Fall_Down_FullSTreasure);
	runTest("SSS SSS SSS - Fall Down, Need S-Treasure", test_SSS_SSS_SSS_Fall_Down_NeedSTreasure);
	runTest("SSS SSS SSS - Fall Down, Full R-Treasure", test_SSS_SSS_SSS_Fall_Down_FullRTreasure);
	runTest("SSS SSS SSS - Fall Down, Need R-Treasure", test_SSS_SSS_SSS_Fall_Down_NeedRTreasure);
	runTest("SSS SSS SSS - Fall Down, Full E-Treasure", test_SSS_SSS_SSS_Fall_Down_FullETreasure);
	runTest("SSS SSS SSS - Fall Down, Need E-Treasure", test_SSS_SSS_SSS_Fall_Down_NeedETreasure);

	runTest("SSS SSS SSS - Fall Right, Treasure", test_SSS_SSS_SSS_Fall_Right_Treasure);
	runTest("SSS SSS SSS - Fall Right, Full H-Treasure", test_SSS_SSS_SSS_Fall_Right_FullHTreasure);
	runTest("SSS SSS SSS - Fall Right, Need H-Treasure", test_SSS_SSS_SSS_Fall_Right_NeedHTreasure);
	runTest("SSS SSS SSS - Fall Right, Full S-Treasure", test_SSS_SSS_SSS_Fall_Right_FullSTreasure);
	runTest("SSS SSS SSS - Fall Right, Need S-Treasure", test_SSS_SSS_SSS_Fall_Right_NeedSTreasure);
	runTest("SSS SSS SSS - Fall Right, Full R-Treasure", test_SSS_SSS_SSS_Fall_Right_FullRTreasure);
	runTest("SSS SSS SSS - Fall Right, Need R-Treasure", test_SSS_SSS_SSS_Fall_Right_NeedRTreasure);
	runTest("SSS SSS SSS - Fall Right, Full E-Treasure", test_SSS_SSS_SSS_Fall_Right_FullETreasure);
	runTest("SSS SSS SSS - Fall Right, Need E-Treasure", test_SSS_SSS_SSS_Fall_Right_NeedETreasure);

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

function test_SSS_SSS_WWW_Fall_Left_NoEndurance()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["W", "W", "W"]],
			 {row: 1, col: 1,
			  status: ActionEnum.FALL_DOWN,
			  left: 1, down: 1,
			  endurance: 0});

	initAction();

	validateInitAction({down: ActionEnum.SPLASH});
}

function test_SSS_SSS_WWW_Fall_Right_NoEndurance()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["W", "W", "W"]],
			 {row: 1, col: 1,
			  status: ActionEnum.FALL_DOWN,
			  down: 1, right: 1,
			  endurance: 0});

	initAction();

	validateInitAction({down: ActionEnum.SPLASH});
}

function test_SSS_SSS_SSS_Fall_Left_Treasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  left: 1, down: 1,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						downLeft: ActionEnum.FALL_LEFT,
						down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Left_FullHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  left: 1, down: 1,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({downLeft: ActionEnum.FALL_LEFT,
						down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Left_NeedHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  left: 1, down: 1,
			  health: 1, endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						downLeft: ActionEnum.FALL_LEFT,
						down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Left_FullSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  left: 1, down: 1,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({downLeft: ActionEnum.FALL_LEFT,
						down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Left_NeedSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  left: 1, down: 1,
			  sight: 1, endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						downLeft: ActionEnum.FALL_LEFT,
						down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Left_FullRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  left: 1, down: 1,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({downLeft: ActionEnum.FALL_LEFT,
						down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Left_NeedRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  left: 1, down: 1,
			  recovery: 1, endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						downLeft: ActionEnum.FALL_LEFT,
						down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Left_FullETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  left: 1, down: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({downLeft: ActionEnum.FALL_LEFT,
						down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Left_NeedETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  left: 1, down: 1,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						downLeft: ActionEnum.FALL_LEFT,
						down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Down_Treasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  down: 1,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Down_FullHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  down: 1,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Down_NeedHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  down: 1,
			  health: 1, endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Down_FullSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  down: 1,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Down_NeedSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  down: 1,
			  sight: 1, endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Down_FullRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  down: 1,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Down_NeedRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  down: 1,
			  recovery: 1, endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Down_FullETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  down: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Down_NeedETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  down: 1,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						down: ActionEnum.FALL_DOWN});
}

function test_SSS_SSS_SSS_Fall_Right_Treasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  right: 1, down: 1,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						down: ActionEnum.FALL_DOWN,
						downRight: ActionEnum.FALL_RIGHT});
}

function test_SSS_SSS_SSS_Fall_Right_FullHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  right: 1, down: 1,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({down: ActionEnum.FALL_DOWN,
						downRight: ActionEnum.FALL_RIGHT});
}

function test_SSS_SSS_SSS_Fall_Right_NeedHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  right: 1, down: 1,
			  health: 1, endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						down: ActionEnum.FALL_DOWN,
						downRight: ActionEnum.FALL_RIGHT});
}

function test_SSS_SSS_SSS_Fall_Right_FullSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  right: 1, down: 1,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({down: ActionEnum.FALL_DOWN,
						downRight: ActionEnum.FALL_RIGHT});
}

function test_SSS_SSS_SSS_Fall_Right_NeedSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  right: 1, down: 1,
			  sight: 1, endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						down: ActionEnum.FALL_DOWN,
						downRight: ActionEnum.FALL_RIGHT});
}

function test_SSS_SSS_SSS_Fall_Right_FullRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  right: 1, down: 1,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({down: ActionEnum.FALL_DOWN,
						downRight: ActionEnum.FALL_RIGHT});
}

function test_SSS_SSS_SSS_Fall_Right_NeedRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  right: 1, down: 1,
			  recovery: 1, endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						down: ActionEnum.FALL_DOWN,
						downRight: ActionEnum.FALL_RIGHT});
}

function test_SSS_SSS_SSS_Fall_Right_FullETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  right: 1, down: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({down: ActionEnum.FALL_DOWN,
						downRight: ActionEnum.FALL_RIGHT});
}

function test_SSS_SSS_SSS_Fall_Right_NeedETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  right: 1, down: 1,
			  endurance: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						down: ActionEnum.FALL_DOWN,
						downRight: ActionEnum.FALL_RIGHT});
}

function test_SSS_SSS_SSS_Fall_Down_NoHealth()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "S", "S"]],
			 {row: testRow, col: testCol,
			  status: ActionEnum.FALL_DOWN,
			  down: 1,
			  health: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	initAction();

	validateInitAction({});
}
