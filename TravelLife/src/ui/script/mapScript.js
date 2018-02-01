<<<<<<< HEAD
function initMapTiles()
{
	var mapTiles = document.getElementById("mapTiles");

	// Start Sky Tile
	createMapTile(mapTiles, 0, 0, new Sky());

	// Start Ground Tile
	createMapTile(mapTiles, 1, 0, new Ground());
}

function createMapTile(mapTiles, row, col, tile)
{
	var append = true;

	var mapRow = mapTiles.children[row];
	if (mapRow == null)
	{
		mapRow = document.createElement("div");
		mapRow.className = "mapRow";

		if (row < 0)
		{
			append = false;
			player.row++;
		}

		if (append)
			mapTiles.appendChild(mapRow);
		else
			mapTiles.prepend(mapRow);
	}

	append = true;
	var mapTile = mapRow.children[col];
	if (mapTile == null)
	{
		mapTile = document.createElement("div");
		mapTile.className = "mapTile " + tile.type;

		if (col < 0)
		{
			append = false;
			player.col++;
		}
	}

	mapTile.style.setProperty("background-color", tile.color);

	if (append)
		mapRow.appendChild(mapTile);
	else
		mapRow.prepend(mapTile);
}

function resetMap()
{
	document.getElementById("mapTiles").innerHTML = "";
=======
var sight = 2;

function resetMap()
{
	document.getElementById("mapTiles").innerHTML = "";
}

function initMapTiles()
{
	var mapTiles = document.getElementById("mapTiles");

	mapTiles.style.setProperty("--rowNum", (sight*2)+1);
	mapTiles.style.setProperty("--colNum", (sight*2)+1);

	// Test
	mapTiles.style.setProperty("--rowNum", 50);
	mapTiles.style.setProperty("--colNum", 50);
	for (var i = 1; i <= 1; i++)
	{
		for (var x = 1; x <= 50; x++)
			mapTiles.appendChild(createTile(i, x, "rgb(" + i*10 + ", " + x*3 + ", " + i+x + ")"));
	}

	for (var i = 1; i <= 50; i++)
	{
		for (var x = 1; x <= 1; x++)
			mapTiles.appendChild(createTile(i, x, "rgb(" + i*3 + ", " + x*10 + ", " + i+x + ")"));
	}
}

function createTile(row, col, color, image)
{
	var tile = document.createElement("div");

	tile.className = "tile";
	if (image != null)
		tile.style.setProperty("image", image);
	tile.style.setProperty("background-color", color);
	tile.style.setProperty("grid-row", row + "/" + row+1);
	tile.style.setProperty("grid-column", col + "/" + col+1);

	return tile;
}

function takeAction()
{
	resetAction();
>>>>>>> refs/remotes/origin/develop
}
