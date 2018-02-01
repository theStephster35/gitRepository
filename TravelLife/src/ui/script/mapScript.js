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
}
