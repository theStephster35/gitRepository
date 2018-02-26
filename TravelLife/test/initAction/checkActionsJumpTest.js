function testCheckActionsJump()
{
	runTest("BSB BSB BGB - Jump Up", test_BSB_BSB_BGB_Jump_Up);
	runTest("BSB BSB BGB - Jump Up, No Health", test_BSB_BSB_BGB_Jump_Up_NoHealth);

	runTest("BSB BSB BSB - Jump Up", test_BSB_BSB_BSB_Jump_Up);
	runTest("BSB BSB BSB - Jump Up, No Health", test_BSB_BSB_BSB_Jump_Up_NoHealth);

	runTest("BSB BSB BWB - Jump Up", test_BSB_BSB_BSB_Jump_Up);
	runTest("BSB BSB BWB - Jump Up, No Health", test_BSB_BSB_BSB_Jump_Up_NoHealth);

	runTest("SSS BSB BGB - Jump Up", test_SSS_BSB_BGB_Jump_Up);
	runTest("SSS BSB BGB - Jump Left", test_SSS_BSB_BGB_Jump_Left);
	runTest("SSS BSB BGB - Jump Right", test_SSS_BSB_BGB_Jump_Right);
	runTest("SSS BSB BGB - Jump Up, No Health", test_SSS_BSB_BGB_Jump_Up_NoHealth);

	runTest("SSS SSS SGS - Jump Up", test_SSS_SSS_SGS_Jump_Up);
	runTest("SSS SSS SGS - Jump Left", test_SSS_SSS_SGS_Jump_Left);
	runTest("SSS SSS SGS - Jump Right", test_SSS_SSS_SGS_Jump_Right);
	runTest("SSS SSS SGS - Jump Up, No Health", test_SSS_SSS_SGS_Jump_Up_NoHealth);
}

function test_BSB_BSB_BGB_Jump_Up()
{
	initData([["B", "S", "B"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.JUMP,
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
			  status: AttributeEnum.JUMP,
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
			  status: AttributeEnum.JUMP,
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
			  status: AttributeEnum.JUMP,
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
			  status: AttributeEnum.JUMP,
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
			  status: AttributeEnum.JUMP,
			  up: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_SSS_BSB_BGB_Jump_Up()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.JUMP,
			  up: 1,
			  endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
					 	center: ActionEnum.STOP});
}

function test_SSS_BSB_BGB_Jump_Left()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.JUMP,
			  left: 1, up: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.RISE_LEFT,
						up: ActionEnum.RISE_UP,
					 	center: ActionEnum.STOP});
}

function test_SSS_BSB_BGB_Jump_Right()
{
	initData([["S", "S", "S"],
			  ["B", "S", "B"],
			  ["B", "G", "B"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.JUMP,
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
			  status: AttributeEnum.JUMP,
			  up: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}

function test_SSS_SSS_SGS_Jump_Up()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.JUMP,
			  up: 1,
			  endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
					 	center: ActionEnum.STOP});
}

function test_SSS_SSS_SGS_Jump_Left()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.JUMP,
			  left: 1, up: 1,
			  endurance: 1});

	initAction();

	validateInitAction({upLeft: ActionEnum.RISE_LEFT,
						up: ActionEnum.RISE_UP,
						left: ActionEnum.DRIFT,
					 	center: ActionEnum.STOP});
}

function test_SSS_SSS_SGS_Jump_Right()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.JUMP,
			  up: 1, right: 1,
			  endurance: 1});

	initAction();

	validateInitAction({up: ActionEnum.RISE_UP,
						upRight: ActionEnum.RISE_RIGHT,
					 	center: ActionEnum.STOP,
					 	right: ActionEnum.DRIFT});
}

function test_SSS_SSS_SGS_Jump_Up_NoHealth()
{
	initData([["S", "S", "S"],
			  ["S", "S", "S"],
			  ["S", "G", "S"]],
			 {row: 1, col: 1,
			  status: AttributeEnum.JUMP,
			  up: 1,
			  health: 0});

	initAction();

	validateInitAction({});
}
