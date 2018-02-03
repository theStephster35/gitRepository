var player;
var mapTiles;

function initGame()
{
	initPlayer();
	initMapTiles();
	placePlayer();
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