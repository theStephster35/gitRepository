function initPlayer()
{
	var species = document.getElementById("species");
	player = new Player(document.getElementById("name").value,
						species.options[species.selectedIndex].value);

	document.getElementById("playerIcon").src = player.species.image;

	setPlayerDetails();	
}

function placePlayer()
{
	exposeMapTiles();

	var playerTile = mapTiles.children[player.position.row].children[player.position.col];

	var map = document.getElementById("map");
	var playerIcon = document.getElementById("playerIcon");
	playerIcon.style.display = "block";
	playerIcon.style.top = (playerTile.offsetTop - map.offsetTop) + "px";
	playerIcon.style.left = (playerTile.offsetLeft - map.offsetLeft) + "px";
}

function moveUpLeft()
{
	player.position.row -= 1;
	player.position.col -= 1;
	exposeMapTiles();
	placePlayer();
}

function moveUp()
{
	player.position.row -= 1;
	exposeMapTiles();
	placePlayer();
}

function moveUpRight()
{
	player.position.row -= 1;
	player.position.col += 1;
	exposeMapTiles();
	placePlayer();
}

function moveLeft()
{
	player.position.col -= 1;
	exposeMapTiles();
	placePlayer();
}

function stayCenter()
{
}

function moveRight()
{
	player.position.col += 1;
	exposeMapTiles();
	placePlayer();
}

function moveDownLeft()
{
	player.position.row += 1;
	player.position.col -= 1;
	exposeMapTiles();
	placePlayer();
}

function moveDown()
{
	player.position.row += 1;
	exposeMapTiles();
	placePlayer();
}

function moveDownRight()
{
	player.position.row += 1;
	player.position.col += 1;
	exposeMapTiles();
	placePlayer();
}

function resetPlayer()
{
	if (document.getElementById("rememberMe").checked !== true)
	{
		document.getElementById("name").value = "";
		document.getElementById("playerIcon").style.display = "none";

		resetSpecies();
	}
}
