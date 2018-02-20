function testCheckActionsJump()
{
	runTest("BSB BSB BGB - Jump Up", test_BSB_BSB_BGB_JumpUp);
	runTest("BSB BSB BGB - Jump Up, No Health", test_BSB_BSB_BGB_JumpUp_NoHealth);

	runTest("BSB BSB BSB - Jump Up", test_BSB_BSB_BSB_JumpUp);
	runTest("BSB BSB BSB - Jump Up, No Health", test_BSB_BSB_BSB_JumpUp_NoHealth);

	runTest("BSB BSB BWB - Jump Up", test_BSB_BSB_BSB_JumpUp);
	runTest("BSB BSB BWB - Jump Up, No Health", test_BSB_BSB_BSB_JumpUp_NoHealth);
}

function test_BSB_BSB_BGB_JumpUp()
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

function test_BSB_BSB_BGB_JumpUp_NoHealth()
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

function test_BSB_BSB_BSB_JumpUp()
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

function test_BSB_BSB_BSB_JumpUp_NoHealth()
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

function test_BSB_BSB_BWB_JumpUp()
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

function test_BSB_BSB_BWB_JumpUp_NoHealth()
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
