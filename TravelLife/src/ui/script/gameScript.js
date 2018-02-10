var player;
var mapTiles;
var action;

function initGame()
{
	initPlayer();
	initMapTiles();
	placePlayer();
	initAction();
}

function confirmAction()
{
	var actionFunction = actionFunctionMap.get(action);
	if (actionFunction != null)
	{
		var actionButton = document.getElementById(action);
		if (actionButton != null)
			actionFunction(actionButton.label, true);

		if (action !== ActionEnum.CENTER
		 && player.status !== ActionEnum.FALL)
			gainSightRecovery();
	}

	resetAction();

	// Get updated attributes
	getAttributes(document.getElementById("playerAttributes"),
			player.attributeMap, player.species.attributeMap);

	// Check if player is alive
	if (player.attributeMap.get(AttributeEnum.HEALTH) === 0)
	{
		if (getTileByPosition((player.position.row+1), player.position.col).solid)
			updatePlayerIcon("images/" + player.species.type + "/SolidEnd.png");
		else
			updatePlayerIcon("images/" + player.species.type + "/SuspendedEnd.png");

		alert("The travels of " + player.name + " the "
			+ player.species.type + " have come to an end.");
	}
}

function endGame()
{
	resetPlayer();
	resetAction();
	resetMap();
}
