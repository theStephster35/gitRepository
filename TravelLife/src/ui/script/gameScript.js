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

		if (action !== ActionEnum.CENTER)
			gainSightRecovery();
	}

	resetAction();

	// Get updated attributes
	getAttributes(document.getElementById("playerAttributes"),
			player.attributeMap, player.species.attributeMap);

	// Check if player is alive
	if (player.attributeMap.get(AttributeEnum.HEALTH) === 0)
		alert("The travels of " + player.name + " the "
			+ player.species.type + " have come to an end.");
}

function endGame()
{
	resetPlayer();
	resetAction();
	resetMap();
}
