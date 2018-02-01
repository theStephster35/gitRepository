var player;

function initGame()
{
	initPlayer();
	placePlayer(initMapTiles());
}

function takeAction()
{
	resetAction();
}

function endGame()
{
	resetPlayer();
	resetAction();
	resetMap();
}