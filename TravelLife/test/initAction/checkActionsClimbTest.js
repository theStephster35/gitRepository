function testCheckActionsClimb()
{
	runTest("SBS BSB BGB - Climb Left", test_SBS_BSB_BGB_ClimbLeft);
	runTest("SBS BSB BGB - Climb Left, No Health", test_SBS_BSB_BGB_ClimbLeft_NoHealth);
	runTest("SBS BSB BGB - Climb Right", test_SBS_BSB_BGB_ClimbRight);
	runTest("SBS BSB BGB - Climb Right, No Health", test_SBS_BSB_BGB_ClimbRight_NoHealth);

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

	runTest("SSS GSG BWB - Climb Left", test_SSS_GSG_BWB_ClimbLeft);
	runTest("SSS GSG BWB - Climb Left, No Health", test_SSS_GSG_BWB_ClimbLeft_NoHealth);
	runTest("SSS GSG BWB - Climb Right", test_SSS_GSG_BWB_ClimbRight);
	runTest("SSS GSG BWB - Climb Right, No Health", test_SSS_GSG_BWB_ClimbRight_NoHealth);

	runTest("SBS BSS BGB - Climb Left, Treasure", test_SBS_BSS_BGB_ClimbLeft_Treasure);
	runTest("SBS BSS BGB - Climb Left, Full H-Treasure", test_SBS_BSS_BGB_ClimbLeft_FullHTreasure);
	runTest("SBS BSS BGB - Climb Left, Need H-Treasure", test_SBS_BSS_BGB_ClimbLeft_NeedHTreasure);
	runTest("SBS BSS BGB - Climb Left, Full S-Treasure", test_SBS_BSS_BGB_ClimbLeft_FullSTreasure);
	runTest("SBS BSS BGB - Climb Left, Need S-Treasure", test_SBS_BSS_BGB_ClimbLeft_NeedSTreasure);
	runTest("SBS BSS BGB - Climb Left, Full R-Treasure", test_SBS_BSS_BGB_ClimbLeft_FullRTreasure);
	runTest("SBS BSS BGB - Climb Left, Need R-Treasure", test_SBS_BSS_BGB_ClimbLeft_NeedRTreasure);
	runTest("SBS BSS BGB - Climb Left, Full E-Treasure", test_SBS_BSS_BGB_ClimbLeft_FullETreasure);
	runTest("SBS BSS BGB - Climb Left, Need E-Treasure", test_SBS_BSS_BGB_ClimbLeft_NeedETreasure);
	runTest("SBS BSS BGB - Climb Left, No Health", test_SBS_BSS_BGB_ClimbLeft_NoHealth);

	runTest("SBS SSB BGB - Climb Right, Treasure", test_SBS_SSB_BGB_ClimbRight_Treasure);
	runTest("SBS SSB BGB - Climb Right, Full H-Treasure", test_SBS_SSB_BGB_ClimbRight_FullHTreasure);
	runTest("SBS SSB BGB - Climb Right, Need H-Treasure", test_SBS_SSB_BGB_ClimbRight_NeedHTreasure);
	runTest("SBS SSB BGB - Climb Right, Full S-Treasure", test_SBS_SSB_BGB_ClimbRight_FullSTreasure);
	runTest("SBS SSB BGB - Climb Right, Need S-Treasure", test_SBS_SSB_BGB_ClimbRight_NeedSTreasure);
	runTest("SBS SSB BGB - Climb Right, Full R-Treasure", test_SBS_SSB_BGB_ClimbRight_FullRTreasure);
	runTest("SBS SSB BGB - Climb Right, Need R-Treasure", test_SBS_SSB_BGB_ClimbRight_NeedRTreasure);
	runTest("SBS SSB BGB - Climb Right, Full E-Treasure", test_SBS_SSB_BGB_ClimbRight_FullETreasure);
	runTest("SBS SSB BGB - Climb Right, Need E-Treasure", test_SBS_SSB_BGB_ClimbRight_NeedETreasure);
	runTest("SBS SSB BGB - Climb Right, No Health", test_SBS_SSB_BGB_ClimbRight_NoHealth);
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

function test_SSS_GSG_BWB_ClimbLeft()
{
	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "W", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.CLIMB_OVER,
						upRight: ActionEnum.JUMP_RIGHT,
						left: ActionEnum.DIG_LEFT,
						right: ActionEnum.LET_GO});
}

function test_SSS_GSG_BWB_ClimbLeft_NoHealth()
{
	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "W", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_SSS_GSG_BWB_ClimbRight()
{
	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "W", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						upRight: ActionEnum.CLIMB_OVER,
						left: ActionEnum.LET_GO,
						right: ActionEnum.DIG_RIGHT});
}

function test_SSS_GSG_BWB_ClimbRight_NoHealth()
{
	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "W", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_SBS_BSS_BGB_ClimbLeft_Treasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["B", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	initAction();

	validateInitAction({upRight: ActionEnum.JUMP_RIGHT,
						center: ActionEnum.COLLECT,
						right: ActionEnum.LET_GO,
					 	downRight: ActionEnum.CLIMB_OFF});
}

function test_SBS_BSS_BGB_ClimbLeft_FullHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["B", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({upRight: ActionEnum.JUMP_RIGHT,
						right: ActionEnum.LET_GO,
					 	downRight: ActionEnum.CLIMB_OFF});
}

function test_SBS_BSS_BGB_ClimbLeft_NeedHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["B", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  health: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({upRight: ActionEnum.JUMP_RIGHT,
						center: ActionEnum.COLLECT,
						right: ActionEnum.LET_GO,
					 	downRight: ActionEnum.CLIMB_OFF});
}

function test_SBS_BSS_BGB_ClimbLeft_FullSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["B", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({upRight: ActionEnum.JUMP_RIGHT,
						right: ActionEnum.LET_GO,
					 	downRight: ActionEnum.CLIMB_OFF});
}

function test_SBS_BSS_BGB_ClimbLeft_NeedSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["B", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  sight: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({upRight: ActionEnum.JUMP_RIGHT,
						center: ActionEnum.COLLECT,
						right: ActionEnum.LET_GO,
					 	downRight: ActionEnum.CLIMB_OFF});
}

function test_SBS_BSS_BGB_ClimbLeft_FullRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["B", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({upRight: ActionEnum.JUMP_RIGHT,
						right: ActionEnum.LET_GO,
					 	downRight: ActionEnum.CLIMB_OFF});
}

function test_SBS_BSS_BGB_ClimbLeft_NeedRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["B", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  recovery: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({upRight: ActionEnum.JUMP_RIGHT,
						center: ActionEnum.COLLECT,
						right: ActionEnum.LET_GO,
					 	downRight: ActionEnum.CLIMB_OFF});
}

function test_SBS_BSS_BGB_ClimbLeft_FullETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["B", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  left: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({upRight: ActionEnum.JUMP_RIGHT,
						right: ActionEnum.LET_GO,
					 	downRight: ActionEnum.CLIMB_OFF});
}

function test_SBS_BSS_BGB_ClimbLeft_NeedETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["B", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  recovery: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({upRight: ActionEnum.JUMP_RIGHT,
						center: ActionEnum.COLLECT,
						right: ActionEnum.LET_GO,
					 	downRight: ActionEnum.CLIMB_OFF});
}

function test_SBS_BSS_BGB_ClimbLeft_NoHealth()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["B", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  left: 1,
			  health: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	initAction();

	validateInitAction({});
}

function test_SBS_SSB_BGB_ClimbRight_Treasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["S", "S", "B"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  endurance: 1},
			  null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						left: ActionEnum.LET_GO,
						center: ActionEnum.COLLECT,
						downLeft: ActionEnum.CLIMB_OFF});
}

function test_SBS_SSB_BGB_ClimbRight_FullHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["S", "S", "B"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  endurance: 1},
			  null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						left: ActionEnum.LET_GO,
					 	downLeft: ActionEnum.CLIMB_OFF});
}

function test_SBS_SSB_BGB_ClimbRight_NeedHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["S", "S", "B"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  health: 1, endurance: 1},
			  null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						left: ActionEnum.LET_GO,
						center: ActionEnum.COLLECT,
					 	downLeft: ActionEnum.CLIMB_OFF});
}

function test_SBS_SSB_BGB_ClimbRight_FullSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["S", "S", "B"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  endurance: 1},
			  null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						left: ActionEnum.LET_GO,
					 	downLeft: ActionEnum.CLIMB_OFF});
}

function test_SBS_SSB_BGB_ClimbRight_NeedSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["S", "S", "B"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  sight: 1, endurance: 1},
			  null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						left: ActionEnum.LET_GO,
						center: ActionEnum.COLLECT,
					 	downLeft: ActionEnum.CLIMB_OFF});
}

function test_SBS_SSB_BGB_ClimbRight_FullRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["S", "S", "B"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  endurance: 1},
			  null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						left: ActionEnum.LET_GO,
					 	downLeft: ActionEnum.CLIMB_OFF});
}

function test_SBS_SSB_BGB_ClimbRight_NeedRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["S", "S", "B"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  recovery: 1, endurance: 1},
			  null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						left: ActionEnum.LET_GO,
						center: ActionEnum.COLLECT,
						downLeft: ActionEnum.CLIMB_OFF});
}

function test_SBS_SSB_BGB_ClimbRight_FullETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["S", "S", "B"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  right: 1},
			  null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						left: ActionEnum.LET_GO,
						downLeft: ActionEnum.CLIMB_OFF});
}

function test_SBS_SSB_BGB_ClimbRight_NeedETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["S", "S", "B"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  endurance: 1},
			  null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						left: ActionEnum.LET_GO,
						center: ActionEnum.COLLECT,
						downLeft: ActionEnum.CLIMB_OFF});
}

function test_SBS_SSB_BGB_ClimbRight_NoHealth()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "B", "S"],
			  ["S", "S", "B"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: AttributeEnum.CLIMB,
			  right: 1,
			  health: 0},
			  null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	initAction();

	validateInitAction({});
}