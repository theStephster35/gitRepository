function testInitAction()
{
	testCheckActionsStop();
	testCheckActionsClimb();
	testCheckActionsJump();
	testCheckActionsRun();
	testCheckActionsFall();
	testCheckActionsSwim();
}

function validateInitAction(results)
{
	validateInitActionData("upLeft", upLeftButton, results.upLeft);
	validateInitActionData("up", upButton, results.up);
	validateInitActionData("upRight", upRightButton, results.upRight);
	validateInitActionData("left", leftButton, results.left);
	validateInitActionData("center", centerButton, results.center);
	validateInitActionData("right", rightButton, results.right);
	validateInitActionData("downLeft", downLeftButton, results.downLeft);
	validateInitActionData("down", downButton, results.down);
	validateInitActionData("downRight", downRightButton, results.downRight);
}

function validateInitActionData(dataType, actualData, resultData)
{
	var result = false;

	if (resultData == null)
		result = actualData.disabled;
	else
		result = (actualData.label === resultData);

	assert(result, dataType + ": " + actualData.label);
}
