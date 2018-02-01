function adjustMapContents(height)
{
	var map = document.getElementById("map");
	map.style.minHeight = (height - getHeightOffset(map)) + "px";
	map.style.maxHeight = map.style.minHeight;
	map.style.minWidth = (window.innerWidth- getWidthOffset(map)) + "px";
	map.style.maxWidth = map.style.minWidth;
}

function initMapTiles()
{
	var mapTiles = document.getElementById("mapTiles");

	// Start Sky Tile
	createMapTile(mapTiles, 0, 0, new Sky());

	// Start Ground Tile
	createMapTile(mapTiles, 1, 0, new Ground());

	return mapTiles;
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
			player.position.row++;
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
			player.position.col++;
		}
	}

	mapTile.style.display = "block";
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

function takeAction()
{
	resetAction();
}
