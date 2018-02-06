var player;
var mapTiles;
var action;

function initGame()
{
	initPlayer();
	initMapTiles();
	placePlayer();
}

function confirmAction()
{
	switch (action)
	{
		case ActionEnum.UP_LEFT:
			moveUpLeft();
			break;
		case ActionEnum.UP:
			moveUp();
			break;
		case ActionEnum.UP_RIGHT:
			moveUpRight();
			break;
		case ActionEnum.LEFT:
			moveLeft();
			break;
		case ActionEnum.CENTER:
			stayCenter();
			break;
		case ActionEnum.RIGHT:
			moveRight();
			break;
		case ActionEnum.DOWN_LEFT:
			moveDownLeft();
			break;
		case ActionEnum.DOWN:
			moveDown();
			break;
		case ActionEnum.DOWN_RIGHT:
			moveDownRight();
			break;
		default:
			rest();
	}

	resetAction();
}

function endGame()
{
	resetPlayer();
	resetAction();
	resetMap();
}
