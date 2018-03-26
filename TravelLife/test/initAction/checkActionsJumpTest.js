function testCheckActionsJump()
{
	runTest("BSB BSB BGB - Jump Up", test_BSB_BSB_BGB_Jump_Up);
	runTest("BSB BSB BGB - Jump Up, No Health", test_BSB_BSB_BGB_Jump_Up_NoHealth);

	runTest("BSB BSB BSB - Jump Up", test_BSB_BSB_BSB_Jump_Up);
	runTest("BSB BSB BSB - Jump Up, No Health", test_BSB_BSB_BSB_Jump_Up_NoHealth);

	runTest("BSB BSB BWB - Jump Up", test_BSB_BSB_BSB_Jump_Up);
	runTest("BSB BSB BWB - Jump Up, No Health", test_BSB_BSB_BSB_Jump_Up_NoHealth);

	runTest("SSS BSB BGB - Jump Left", test_SSS_BSB_BGB_Jump_Left);
	runTest("SSS BSB BGB - Jump Up", test_SSS_BSB_BGB_Jump_Up);
	runTest("SSS BSB BGB - Jump Right", test_SSS_BSB_BGB_Jump_Right);
	runTest("SSS BSB BGB - Jump Up, No Health", test_SSS_BSB_BGB_Jump_Up_NoHealth);

	runTest("SSS SSS SGS - Jump Left", test_SSS_SSS_SGS_Jump_Left);
	runTest("SSS SSS SGS - Jump Up", test_SSS_SSS_SGS_Jump_Up);
	runTest("SSS SSS SGS - Jump Right", test_SSS_SSS_SGS_Jump_Right);

	runTest("SSS SSS SGS - Jump Left, Treasure", test_SSS_SSS_SGS_Jump_Left_Treasure);
	runTest("SSS SSS SGS - Jump Left, Full H-Treasure", test_SSS_SSS_SGS_Jump_Left_FullHTreasure);
	runTest("SSS SSS SGS - Jump Left, Need H-Treasure", test_SSS_SSS_SGS_Jump_Left_NeedHTreasure);
	runTest("SSS SSS SGS - Jump Left, Full S-Treasure", test_SSS_SSS_SGS_Jump_Left_FullSTreasure);
	runTest("SSS SSS SGS - Jump Left, Need S-Treasure", test_SSS_SSS_SGS_Jump_Left_NeedSTreasure);
	runTest("SSS SSS SGS - Jump Left, Full R-Treasure", test_SSS_SSS_SGS_Jump_Left_FullRTreasure);
	runTest("SSS SSS SGS - Jump Left, Need R-Treasure", test_SSS_SSS_SGS_Jump_Left_NeedRTreasure);
	runTest("SSS SSS SGS - Jump Left, Full E-Treasure", test_SSS_SSS_SGS_Jump_Left_FullETreasure);
	runTest("SSS SSS SGS - Jump Left, Need E-Treasure", test_SSS_SSS_SGS_Jump_Left_NeedETreasure);

	runTest("SSS SSS SGS - Jump Up, Treasure", test_SSS_SSS_SGS_Jump_Up_Treasure);
	runTest("SSS SSS SGS - Jump Up, Full H-Treasure", test_SSS_SSS_SGS_Jump_Up_FullHTreasure);
	runTest("SSS SSS SGS - Jump Up, Need H-Treasure", test_SSS_SSS_SGS_Jump_Up_NeedHTreasure);
	runTest("SSS SSS SGS - Jump Up, Full S-Treasure", test_SSS_SSS_SGS_Jump_Up_FullSTreasure);
	runTest("SSS SSS SGS - Jump Up, Need S-Treasure", test_SSS_SSS_SGS_Jump_Up_NeedSTreasure);
	runTest("SSS SSS SGS - Jump Up, Full R-Treasure", test_SSS_SSS_SGS_Jump_Up_FullRTreasure);
	runTest("SSS SSS SGS - Jump Up, Need R-Treasure", test_SSS_SSS_SGS_Jump_Up_NeedRTreasure);
	runTest("SSS SSS SGS - Jump Up, Full E-Treasure", test_SSS_SSS_SGS_Jump_Up_FullETreasure);
	runTest("SSS SSS SGS - Jump Up, Need E-Treasure", test_SSS_SSS_SGS_Jump_Up_NeedETreasure);

	runTest("SSS SSS SGS - Jump Right, Treasure", test_SSS_SSS_SGS_Jump_Right_Treasure);
	runTest("SSS SSS SGS - Jump Right, Full H-Treasure", test_SSS_SSS_SGS_Jump_Right_FullHTreasure);
	runTest("SSS SSS SGS - Jump Right, Need H-Treasure", test_SSS_SSS_SGS_Jump_Right_NeedHTreasure);
	runTest("SSS SSS SGS - Jump Right, Full S-Treasure", test_SSS_SSS_SGS_Jump_Right_FullSTreasure);
	runTest("SSS SSS SGS - Jump Right, Need S-Treasure", test_SSS_SSS_SGS_Jump_Right_NeedSTreasure);
	runTest("SSS SSS SGS - Jump Right, Full R-Treasure", test_SSS_SSS_SGS_Jump_Right_FullRTreasure);
	runTest("SSS SSS SGS - Jump Right, Need R-Treasure", test_SSS_SSS_SGS_Jump_Right_NeedRTreasure);
	runTest("SSS SSS SGS - Jump Right, Full E-Treasure", test_SSS_SSS_SGS_Jump_Right_FullETreasure);
	runTest("SSS SSS SGS - Jump Right, Need E-Treasure", test_SSS_SSS_SGS_Jump_Right_NeedETreasure);

	runTest("SSS SSS SGS - Jump Up, No Health", test_SSS_SSS_SGS_Jump_Up_NoHealth);
}

function test_BSB_BSB_BGB_Jump_Up()
{
	initData([["B", "S", "B"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: StatusEnum.JUMPING,
			  up: 1,
			  endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
					 	center: ActionEnum.STOP});
}

function test_BSB_BSB_BGB_Jump_Up_NoHealth()
{
	initData([["B", "S", "B"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: StatusEnum.JUMPING,
			  up: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_BSB_BSB_BSB_Jump_Up()
{
	initData([["B", "S", "B"],
			  ["B", "S", "B"],
			  ["B", "S", "B"]],
			 {row: 1, col: 1,
			  status: StatusEnum.JUMPING,
			  up: 1,
			  endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
					 	center: ActionEnum.STOP});
}

function test_BSB_BSB_BSB_Jump_Up_NoHealth()
{
	initData([["B", "S", "B"],
			  ["B", "S", "B"],
			  ["B", "S", "B"]],
			 {row: 1, col: 1,
			  status: StatusEnum.JUMPING,
			  up: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_BSB_BSB_BWB_Jump_Up()
{
	initData([["B", "S", "B"],
			  ["B", "S", "B"],
			  ["B", "W", "B"]],
			 {row: 1, col: 1,
			  status: StatusEnum.JUMPING,
			  up: 1,
			  endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
					 	center: ActionEnum.STOP});
}

function test_BSB_BSB_BWB_Jump_Up_NoHealth()
{
	initData([["B", "S", "B"],
			  ["B", "S", "B"],
			  ["B", "W", "B"]],
			 {row: 1, col: 1,
			  status: StatusEnum.JUMPING,
			  up: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_SSS_BSB_BGB_Jump_Left()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: StatusEnum.JUMPING,
			  left: 1, up: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.RISE_LEFT,
						up: ActionEnum.RISE_UP,
					 	center: ActionEnum.STOP});
}

function test_SSS_BSB_BGB_Jump_Up()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: StatusEnum.JUMPING,
			  up: 1,
			  endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
					 	center: ActionEnum.STOP});
}

function test_SSS_BSB_BGB_Jump_Right()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: StatusEnum.JUMPING,
			  up: 1, right: 1,
			  endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
						upRight: ActionEnum.RISE_RIGHT,
					 	center: ActionEnum.STOP});
}

function test_SSS_BSB_BGB_Jump_Up_NoHealth()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: StatusEnum.JUMPING,
			  up: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_SSS_SSS_SGS_Jump_Left()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: 1, col: 1,
			  status: StatusEnum.JUMPING,
			  left: 1, up: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.RISE_LEFT,
						up: ActionEnum.RISE_UP,
						left: ActionEnum.DRIFT,
					 	center: ActionEnum.STOP});
}

function test_SSS_SSS_SGS_Jump_Up()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: 1, col: 1,
			  status: StatusEnum.JUMPING,
			  up: 1,
			  endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
					 	center: ActionEnum.STOP});
}

function test_SSS_SSS_SGS_Jump_Right()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: 1, col: 1,
			  status: StatusEnum.JUMPING,
			  up: 1, right: 1,
			  endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
						upRight: ActionEnum.RISE_RIGHT,
					 	center: ActionEnum.STOP,
					 	right: ActionEnum.DRIFT});
}

function test_SSS_SSS_SGS_Jump_Left_Treasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  left: 1, up: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	initAction();

	validateInitAction({upLeft: ActionEnum.RISE_LEFT,
						up: ActionEnum.RISE_UP,
						left: ActionEnum.DRIFT,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_SSS_SGS_Jump_Left_FullHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  left: 1, up: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({upLeft: ActionEnum.RISE_LEFT,
						up: ActionEnum.RISE_UP,
						left: ActionEnum.DRIFT,
					 	center: ActionEnum.STOP});
}

function test_SSS_SSS_SGS_Jump_Left_NeedHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  left: 1, up: 1,
			  health: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({upLeft: ActionEnum.RISE_LEFT,
						up: ActionEnum.RISE_UP,
						left: ActionEnum.DRIFT,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_SSS_SGS_Jump_Left_FullSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  left: 1, up: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({upLeft: ActionEnum.RISE_LEFT,
						up: ActionEnum.RISE_UP,
						left: ActionEnum.DRIFT,
					 	center: ActionEnum.STOP});
}

function test_SSS_SSS_SGS_Jump_Left_NeedSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  left: 1, up: 1,
			  sight: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({upLeft: ActionEnum.RISE_LEFT,
						up: ActionEnum.RISE_UP,
						left: ActionEnum.DRIFT,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_SSS_SGS_Jump_Left_FullRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  left: 1, up: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({upLeft: ActionEnum.RISE_LEFT,
						up: ActionEnum.RISE_UP,
						left: ActionEnum.DRIFT,
					 	center: ActionEnum.STOP});
}

function test_SSS_SSS_SGS_Jump_Left_NeedRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  left: 1, up: 1,
			  recovery: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({upLeft: ActionEnum.RISE_LEFT,
						up: ActionEnum.RISE_UP,
						left: ActionEnum.DRIFT,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_SSS_SGS_Jump_Left_FullETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  left: 1, up: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({upLeft: ActionEnum.RISE_LEFT,
						up: ActionEnum.RISE_UP,
						left: ActionEnum.DRIFT,
					 	center: ActionEnum.STOP});
}

function test_SSS_SSS_SGS_Jump_Left_NeedETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  left: 1, up: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({upLeft: ActionEnum.RISE_LEFT,
						up: ActionEnum.RISE_UP,
						left: ActionEnum.DRIFT,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_SSS_SGS_Jump_Up_Treasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_SSS_SGS_Jump_Up_FullHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
						center: ActionEnum.STOP});
}

function test_SSS_SSS_SGS_Jump_Up_NeedHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1,
			  health: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_SSS_SGS_Jump_Up_FullSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({center: ActionEnum.STOP,
						up: ActionEnum.RISE_UP});
}

function test_SSS_SSS_SGS_Jump_Up_NeedSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1,
			  sight: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_SSS_SGS_Jump_Up_FullRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({center: ActionEnum.STOP,
						up: ActionEnum.RISE_UP});
}

function test_SSS_SSS_SGS_Jump_Up_NeedRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1,
			  recovery: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_SSS_SGS_Jump_Up_FullETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({center: ActionEnum.STOP,
						up: ActionEnum.RISE_UP});
}

function test_SSS_SSS_SGS_Jump_Up_NeedETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
					 	center: ActionEnum.COLLECT});
}

function test_SSS_SSS_SGS_Jump_Right_Treasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1, right: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
						upRight: ActionEnum.RISE_RIGHT,
					 	center: ActionEnum.COLLECT,
					 	right: ActionEnum.DRIFT});
}

function test_SSS_SSS_SGS_Jump_Right_FullHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1, right: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
						upRight: ActionEnum.RISE_RIGHT,
					 	center: ActionEnum.STOP,
					 	right: ActionEnum.DRIFT});
}

function test_SSS_SSS_SGS_Jump_Right_NeedHTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1, right: 1,
			  health: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.HEALTH});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
						upRight: ActionEnum.RISE_RIGHT,
					 	center: ActionEnum.COLLECT,
					 	right: ActionEnum.DRIFT});
}

function test_SSS_SSS_SGS_Jump_Right_FullSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1, right: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
						upRight: ActionEnum.RISE_RIGHT,
					 	center: ActionEnum.STOP,
					 	right: ActionEnum.DRIFT});
}

function test_SSS_SSS_SGS_Jump_Right_NeedSTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1, right: 1,
			  sight: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.SIGHT});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
						upRight: ActionEnum.RISE_RIGHT,
					 	center: ActionEnum.COLLECT,
					 	right: ActionEnum.DRIFT});
}

function test_SSS_SSS_SGS_Jump_Right_FullRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1, right: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
						upRight: ActionEnum.RISE_RIGHT,
					 	center: ActionEnum.STOP,
					 	right: ActionEnum.DRIFT});
}

function test_SSS_SSS_SGS_Jump_Right_NeedRTreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1, right: 1,
			  recovery: 1, endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.RECOVERY});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
						upRight: ActionEnum.RISE_RIGHT,
					 	center: ActionEnum.COLLECT,
					 	right: ActionEnum.DRIFT});
}

function test_SSS_SSS_SGS_Jump_Right_FullETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1, right: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
						upRight: ActionEnum.RISE_RIGHT,
					 	center: ActionEnum.STOP,
					 	right: ActionEnum.DRIFT});
}

function test_SSS_SSS_SGS_Jump_Right_NeedETreasure()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1, right: 1,
			  endurance: 1},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol,
			  attribute: AttributeEnum.ENDURANCE});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
						upRight: ActionEnum.RISE_RIGHT,
					 	center: ActionEnum.COLLECT,
					 	right: ActionEnum.DRIFT});
}

function test_SSS_SSS_SGS_Jump_Up_NoHealth()
{
	var testRow = 1;
	var testCol = 1;

	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: testRow, col: testCol,
			  status: StatusEnum.JUMPING,
			  up: 1,
			  health: 0},
			 null,
			 {type: TreasureTypeEnum.SMALL,
			  row: testRow, col: testCol});

	initAction();

	validateInitAction({});
}
