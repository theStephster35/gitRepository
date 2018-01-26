function resetAction()
{
	var action = document.getElementById("confirmAction");
	action.innerText = "Choose Action";
	action.disabled = true;

	action = document.getElementById("actionInfo");
	action.innerText = "\nSelect an action to get information.";
}

function getAction(action)
{
	var actionInfo = document.getElementById("actionInfo");
	var confirmAction = document.getElementById("confirmAction");

	confirmAction.disabled = false;

	if (action === "upLeft")
		getUpLeft(actionInfo, confirmAction);
	else if (action === "up")
		getUp(actionInfo, confirmAction);
	else if (action === "upRight")
		getUpRight(actionInfo, confirmAction);
	else if (action === "left")
		getLeft(actionInfo, confirmAction);
	else if (action === "center")
		getCenter(actionInfo, confirmAction);
	else if (action === "right")
		getRight(actionInfo, confirmAction);
	else if (action === "downLeft")
		getDownLeft(actionInfo, confirmAction);
	else if (action === "down")
		getDown(actionInfo, confirmAction);
	else if (action === "downRight")
		getDownRight(actionInfo, confirmAction);
	else // Unknown Action
		resetAction(actionInfo, confirmAction);
}

function getUpLeft(actionInfo, confirmAction)
{
	confirmAction.innerText = "Jump Left";
	actionInfo.innerText = "\nYou selected Jump Left.";
}

function getUp(actionInfo, confirmAction)
{
	confirmAction.innerText = "Climb Up";
	actionInfo.innerText = "\nYou selected Climb Up.";
}

function getUpRight(actionInfo, confirmAction)
{
	confirmAction.innerText = "Jump Left";
	actionInfo.innerText = "\nYou selected Jump Left.";
}

function getLeft(actionInfo, confirmAction)
{
	confirmAction.innerText = "Move Left";
	actionInfo.innerText = "\nYou selected Move Left.";
}

function getCenter(actionInfo, confirmAction)
{
	confirmAction.innerHTML = "Rest";
	actionInfo.innerText = "\nYou selected Rest.";
}

function getRight(actionInfo, confirmAction)
{
	confirmAction.innerHTML = "Move Right";
	actionInfo.innerText = "\nYou selected Move Right.";
}

function getDownLeft(actionInfo, confirmAction)
{
	confirmAction.innerText = "Swim Left";
	actionInfo.innerText = "\nYou selected Swim Left.";
}

function getDown(actionInfo, confirmAction)
{
	confirmAction.innerText = "Climb Down";
	actionInfo.innerText = "\nYou selected Climb Down.";
}

function getDownRight(actionInfo, confirmAction)
{
	confirmAction.innerText = "Swim Right";
	actionInfo.innerText = "\nYou selected Swim Right.";
}
