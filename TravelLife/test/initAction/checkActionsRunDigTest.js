function testCheckActionsRunDig()
{
	// Run
	runTest("BBB SSS BGB - Run Left", test_BBB_SSS_BGB_RunLeft);
	runTest("BBB SSS BGB - Run Right", test_BBB_SSS_BGB_RunRight);

	runTest("SSS SSS BGB - Run Left", test_SSS_SSS_BGB_RunLeft);
	runTest("SSS SSS BGB - Run Right", test_SSS_SSS_BGB_RunRight);

	runTest("SSS SSS BGB - Run Left, Treasure", test_SSS_SSS_BGB_RunLeft_Treasure);
	runTest("SSS SSS BGB - Run Left, Full H-Treasure", test_SSS_SSS_BGB_RunLeft_FullHTreasure);
	runTest("SSS SSS BGB - Run Left, Need H-Treasure", test_SSS_SSS_BGB_RunLeft_NeedHTreasure);
	runTest("SSS SSS BGB - Run Left, Full S-Treasure", test_SSS_SSS_BGB_RunLeft_FullSTreasure);
	runTest("SSS SSS BGB - Run Left, Need S-Treasure", test_SSS_SSS_BGB_RunLeft_NeedSTreasure);
	runTest("SSS SSS BGB - Run Left, Full R-Treasure", test_SSS_SSS_BGB_RunLeft_FullRTreasure);
	runTest("SSS SSS BGB - Run Left, Need R-Treasure", test_SSS_SSS_BGB_RunLeft_NeedRTreasure);
	runTest("SSS SSS BGB - Run Left, Full E-Treasure", test_SSS_SSS_BGB_RunLeft_FullETreasure);
	runTest("SSS SSS BGB - Run Left, Need E-Treasure", test_SSS_SSS_BGB_RunLeft_NeedETreasure);

	runTest("SSS SSS BGB - Run Right, Treasure", test_SSS_SSS_BGB_RunRight_Treasure);
	runTest("SSS SSS BGB - Run Right, Full H-Treasure", test_SSS_SSS_BGB_RunRight_FullHTreasure);
	runTest("SSS SSS BGB - Run Right, Need H-Treasure", test_SSS_SSS_BGB_RunRight_NeedHTreasure);
	runTest("SSS SSS BGB - Run Right, Full S-Treasure", test_SSS_SSS_BGB_RunRight_FullSTreasure);
	runTest("SSS SSS BGB - Run Right, Need S-Treasure", test_SSS_SSS_BGB_RunRight_NeedSTreasure);
	runTest("SSS SSS BGB - Run Right, Full R-Treasure", test_SSS_SSS_BGB_RunRight_FullRTreasure);
	runTest("SSS SSS BGB - Run Right, Need R-Treasure", test_SSS_SSS_BGB_RunRight_NeedRTreasure);
	runTest("SSS SSS BGB - Run Right, Full E-Treasure", test_SSS_SSS_BGB_RunRight_FullETreasure);
	runTest("SSS SSS BGB - Run Right, Need E-Treasure", test_SSS_SSS_BGB_RunRight_NeedETreasure);

	// Dig
	runTest("SSS GSG BGB - Dig Left", test_SSS_GSG_BGB_DigLeft);
	runTest("SSS GSG BGB - Dig Left, Treasure", test_SSS_GSG_BGB_DigLeft_Treasure);
	runTest("SSS GSG BGB - Dig Left, Full H-Treasure", test_SSS_GSG_BGB_DigLeft_FullHTreasure);
	runTest("SSS GSG BGB - Dig Left, Need H-Treasure", test_SSS_GSG_BGB_DigLeft_NeedHTreasure);
	runTest("SSS GSG BGB - Dig Left, Full S-Treasure", test_SSS_GSG_BGB_DigLeft_FullSTreasure);
	runTest("SSS GSG BGB - Dig Left, Need S-Treasure", test_SSS_GSG_BGB_DigLeft_NeedSTreasure);
	runTest("SSS GSG BGB - Dig Left, Full R-Treasure", test_SSS_GSG_BGB_DigLeft_FullRTreasure);
	runTest("SSS GSG BGB - Dig Left, Need R-Treasure", test_SSS_GSG_BGB_DigLeft_NeedRTreasure);
	runTest("SSS GSG BGB - Dig Left, Full E-Treasure", test_SSS_GSG_BGB_DigLeft_FullETreasure);
	runTest("SSS GSG BGB - Dig Left, Need E-Treasure", test_SSS_GSG_BGB_DigLeft_NeedETreasure);

	runTest("SSS GSG BGB - Dig Right", test_SSS_GSG_BGB_DigRight);
	runTest("SSS GSG BGB - Dig Right, Treasure", test_SSS_GSG_BGB_DigRight_Treasure);
	runTest("SSS GSG BGB - Dig Right, Full H-Treasure", test_SSS_GSG_BGB_DigRight_FullHTreasure);
	runTest("SSS GSG BGB - Dig Right, Need H-Treasure", test_SSS_GSG_BGB_DigRight_NeedHTreasure);
	runTest("SSS GSG BGB - Dig Right, Full S-Treasure", test_SSS_GSG_BGB_DigRight_FullSTreasure);
	runTest("SSS GSG BGB - Dig Right, Need S-Treasure", test_SSS_GSG_BGB_DigRight_NeedSTreasure);
	runTest("SSS GSG BGB - Dig Right, Full R-Treasure", test_SSS_GSG_BGB_DigRight_FullRTreasure);
	runTest("SSS GSG BGB - Dig Right, Need R-Treasure", test_SSS_GSG_BGB_DigRight_NeedRTreasure);
	runTest("SSS GSG BGB - Dig Right, Full E-Treasure", test_SSS_GSG_BGB_DigRight_FullETreasure);
	runTest("SSS GSG BGB - Dig Right, Need E-Treasure", test_SSS_GSG_BGB_DigRight_NeedETreasure);

	runTest("SSS GSG BGB - Dig Down", test_SSS_GSG_BGB_DigDown);
	runTest("SSS GSG BGB - Dig Down, Treasure", test_SSS_GSG_BGB_DigDown_Treasure);
	runTest("SSS GSG BGB - Dig Down, Full H-Treasure", test_SSS_GSG_BGB_DigDown_FullHTreasure);
	runTest("SSS GSG BGB - Dig Down, Need H-Treasure", test_SSS_GSG_BGB_DigDown_NeedHTreasure);
	runTest("SSS GSG BGB - Dig Down, Full S-Treasure", test_SSS_GSG_BGB_DigDown_FullSTreasure);
	runTest("SSS GSG BGB - Dig Down, Need S-Treasure", test_SSS_GSG_BGB_DigDown_NeedSTreasure);
	runTest("SSS GSG BGB - Dig Down, Full R-Treasure", test_SSS_GSG_BGB_DigDown_FullRTreasure);
	runTest("SSS GSG BGB - Dig Down, Need R-Treasure", test_SSS_GSG_BGB_DigDown_NeedRTreasure);
	runTest("SSS GSG BGB - Dig Down, Full E-Treasure", test_SSS_GSG_BGB_DigDown_FullETreasure);
	runTest("SSS GSG BGB - Dig Down, Need E-Treasure", test_SSS_GSG_BGB_DigDown_NeedETreasure);
}

function test_BBB_SSS_BGB_RunLeft()
{
	initData([["B", "B", "B"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: StatusEnum.RUNNING,
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
			  status: StatusEnum.RUNNING,
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
			  status: StatusEnum.RUNNING,
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
			  status: StatusEnum.RUNNING,
			  right: 1,
			  endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.JUMP_UP,
						upRight: ActionEnum.JUMP_RIGHT,
						center: ActionEnum.STOP,
						right: ActionEnum.RUN_RIGHT});
}

function test_SSS_SSS_BGB_RunLeft_Treasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  left: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						up: ActionEnum.JUMP_UP,
						left: ActionEnum.RUN_LEFT,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_SSS_BGB_RunLeft_FullHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  left: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						up: ActionEnum.JUMP_UP,
						left: ActionEnum.RUN_LEFT,
					 	center: ActionEnum.STOP});
}

function test_SSS_SSS_BGB_RunLeft_NeedHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  left: 1,
			  health: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						up: ActionEnum.JUMP_UP,
						left: ActionEnum.RUN_LEFT,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_SSS_BGB_RunLeft_FullSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  left: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						up: ActionEnum.JUMP_UP,
						left: ActionEnum.RUN_LEFT,
					 	center: ActionEnum.STOP});
}

function test_SSS_SSS_BGB_RunLeft_NeedSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  left: 1,
			  sight: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						up: ActionEnum.JUMP_UP,
						left: ActionEnum.RUN_LEFT,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_SSS_BGB_RunLeft_FullRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  left: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						up: ActionEnum.JUMP_UP,
						left: ActionEnum.RUN_LEFT,
					 	center: ActionEnum.STOP});
}

function test_SSS_SSS_BGB_RunLeft_NeedRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  left: 1,
			  recovery: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						up: ActionEnum.JUMP_UP,
						left: ActionEnum.RUN_LEFT,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_SSS_BGB_RunLeft_FullETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  left: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						up: ActionEnum.JUMP_UP,
						left: ActionEnum.RUN_LEFT,
					 	center: ActionEnum.STOP});
}

function test_SSS_SSS_BGB_RunLeft_NeedETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  left: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({upLeft: ActionEnum.JUMP_LEFT,
						up: ActionEnum.JUMP_UP,
						left: ActionEnum.RUN_LEFT,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_SSS_BGB_RunRight_Treasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  right: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	initAction();

	validateInitAction({up: ActionEnum.JUMP_UP,
						upRight: ActionEnum.JUMP_RIGHT,
						center: ActionEnum.COLLECT,
						right: ActionEnum.RUN_RIGHT});
}

function test_SSS_SSS_BGB_RunRight_FullHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  right: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({up: ActionEnum.JUMP_UP,
						upRight: ActionEnum.JUMP_RIGHT,
						center: ActionEnum.STOP,
						right: ActionEnum.RUN_RIGHT});
}

function test_SSS_SSS_BGB_RunRight_NeedHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  right: 1,
			  health: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({up: ActionEnum.JUMP_UP,
						upRight: ActionEnum.JUMP_RIGHT,
						center: ActionEnum.COLLECT,
						right: ActionEnum.RUN_RIGHT});
}

function test_SSS_SSS_BGB_RunRight_FullSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  right: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({up: ActionEnum.JUMP_UP,
						upRight: ActionEnum.JUMP_RIGHT,
						center: ActionEnum.STOP,
						right: ActionEnum.RUN_RIGHT});
}

function test_SSS_SSS_BGB_RunRight_NeedSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  right: 1,
			  sight: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({up: ActionEnum.JUMP_UP,
						upRight: ActionEnum.JUMP_RIGHT,
						center: ActionEnum.COLLECT,
						right: ActionEnum.RUN_RIGHT});
}

function test_SSS_SSS_BGB_RunRight_FullRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  right: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({up: ActionEnum.JUMP_UP,
						upRight: ActionEnum.JUMP_RIGHT,
						center: ActionEnum.STOP,
						right: ActionEnum.RUN_RIGHT});
}

function test_SSS_SSS_BGB_RunRight_NeedRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  right: 1,
			  recovery: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({up: ActionEnum.JUMP_UP,
						upRight: ActionEnum.JUMP_RIGHT,
						center: ActionEnum.COLLECT,
						right: ActionEnum.RUN_RIGHT});
}

function test_SSS_SSS_BGB_RunRight_FullETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  right: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({up: ActionEnum.JUMP_UP,
						upRight: ActionEnum.JUMP_RIGHT,
						center: ActionEnum.STOP,
						right: ActionEnum.RUN_RIGHT});
}

function test_SSS_SSS_BGB_RunRight_NeedETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.RUNNING,
			  right: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({up: ActionEnum.JUMP_UP,
						upRight: ActionEnum.JUMP_RIGHT,
						center: ActionEnum.COLLECT,
						right: ActionEnum.RUN_RIGHT});
}

function test_SSS_GSG_BGB_DigLeft()
{
	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: StatusEnum.DIGGING,
			  left: 1,
			  endurance: 1});

	initAction();

	validateInitAction({left: ActionEnum.DIG_LEFT,
					 	center: ActionEnum.STOP});
}

function test_SSS_GSG_BGB_DigLeft_Treasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  left: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	initAction();

	validateInitAction({left: ActionEnum.DIG_LEFT,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_GSG_BGB_DigLeft_FullHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  left: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({left: ActionEnum.DIG_LEFT,
					 	center: ActionEnum.STOP});
}

function test_SSS_GSG_BGB_DigLeft_NeedHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  left: 1,
			  health: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({left: ActionEnum.DIG_LEFT,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_GSG_BGB_DigLeft_FullSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  left: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({left: ActionEnum.DIG_LEFT,
					 	center: ActionEnum.STOP});
}

function test_SSS_GSG_BGB_DigLeft_NeedSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  left: 1,
			  sight: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({left: ActionEnum.DIG_LEFT,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_GSG_BGB_DigLeft_FullRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  left: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({left: ActionEnum.DIG_LEFT,
					 	center: ActionEnum.STOP});
}

function test_SSS_GSG_BGB_DigLeft_NeedRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  left: 1,
			  recovery: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({left: ActionEnum.DIG_LEFT,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_GSG_BGB_DigLeft_FullETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  left: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({left: ActionEnum.DIG_LEFT,
					 	center: ActionEnum.STOP});
}

function test_SSS_GSG_BGB_DigLeft_NeedETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  left: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({left: ActionEnum.DIG_LEFT,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_GSG_BGB_DigRight()
{
	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: StatusEnum.DIGGING,
			  right: 1,
			  endurance: 1});

	initAction();

	validateInitAction({center: ActionEnum.STOP,
						right: ActionEnum.DIG_RIGHT});
}

function test_SSS_GSG_BGB_DigRight_Treasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  right: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						right: ActionEnum.DIG_RIGHT});
}

function test_SSS_GSG_BGB_DigRight_FullHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  right: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({center: ActionEnum.STOP,
						right: ActionEnum.DIG_RIGHT});
}

function test_SSS_GSG_BGB_DigRight_NeedHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  right: 1,
			  health: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						right: ActionEnum.DIG_RIGHT});
}

function test_SSS_GSG_BGB_DigRight_FullSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  right: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({center: ActionEnum.STOP,
						right: ActionEnum.DIG_RIGHT});
}

function test_SSS_GSG_BGB_DigRight_NeedSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  right: 1,
			  sight: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						right: ActionEnum.DIG_RIGHT});
}

function test_SSS_GSG_BGB_DigRight_FullRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  right: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({center: ActionEnum.STOP,
						right: ActionEnum.DIG_RIGHT});
}

function test_SSS_GSG_BGB_DigRight_NeedRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  right: 1,
			  recovery: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						right: ActionEnum.DIG_RIGHT});
}

function test_SSS_GSG_BGB_DigRight_FullETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  right: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({center: ActionEnum.STOP,
						right: ActionEnum.DIG_RIGHT});
}

function test_SSS_GSG_BGB_DigRight_NeedETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  right: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						right: ActionEnum.DIG_RIGHT});
}

function test_SSS_GSG_BGB_DigDown()
{
	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: StatusEnum.DIGGING,
			  down: 1,
			  endurance: 1});

	initAction();

	validateInitAction({center: ActionEnum.STOP,
						down: ActionEnum.DIG_DOWN});
}

function test_SSS_GSG_BGB_DigDown_Treasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  down: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						down: ActionEnum.DIG_DOWN});
}

function test_SSS_GSG_BGB_DigDown_FullHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  down: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({center: ActionEnum.STOP,
						down: ActionEnum.DIG_DOWN});
}

function test_SSS_GSG_BGB_DigDown_NeedHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  down: 1,
			  health: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						down: ActionEnum.DIG_DOWN});
}

function test_SSS_GSG_BGB_DigDown_FullSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  down: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({center: ActionEnum.STOP,
						down: ActionEnum.DIG_DOWN});
}

function test_SSS_GSG_BGB_DigDown_NeedSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  down: 1,
			  sight: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						down: ActionEnum.DIG_DOWN});
}

function test_SSS_GSG_BGB_DigDown_FullRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  down: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({center: ActionEnum.STOP,
						down: ActionEnum.DIG_DOWN});
}

function test_SSS_GSG_BGB_DigDown_NeedRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  down: 1,
			  recovery: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						down: ActionEnum.DIG_DOWN});
}

function test_SSS_GSG_BGB_DigDown_FullETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  down: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({center: ActionEnum.STOP,
						down: ActionEnum.DIG_DOWN});
}

function test_SSS_GSG_BGB_DigDown_NeedETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["G", "S", "G"],
			  ["B", "G", "B"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.DIGGING,
			  down: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({center: ActionEnum.COLLECT,
						down: ActionEnum.DIG_DOWN});
}




