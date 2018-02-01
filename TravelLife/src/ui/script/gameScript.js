var player;

function initGame()
{
	initPlayer();
	initMapTiles();
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