function initPlayer()
{
	var species = document.getElementById("species");
	player = new Player(document.getElementById("name").value,
						species.options[species.selectedIndex].value);

	document.getElementById("playerIcon").src = player.species.image;

	setPlayerDetails();	
}

function placePlayer(mapTiles)
{
	if (mapTiles == null)
		mapTiles = document.getElementById("mapTiles");
	var playerTile = mapTiles.children[player.position.row].children[player.position.col];

	var map = document.getElementById("map");
	var playerIcon = document.getElementById("playerIcon");
	playerIcon.style.display = "block";
	playerIcon.style.top = (playerTile.offsetTop - map.offsetTop) + "px";
	playerIcon.style.left = (playerTile.offsetLeft - map.offsetLeft) + "px";
}

function resetPlayer()
{
	document.getElementById("name").value = "";
	document.getElementById("playerIcon").style.display = "none";

	resetSpecies();
}
