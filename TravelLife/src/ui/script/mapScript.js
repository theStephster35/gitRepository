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
	mapTiles = document.getElementById("mapTiles");

	// Start Sky Tile
	createMapTile(0, 0, new Sky());

	// Start Ground Tile
	createMapTile(1, 0, new Ground());
}

function createMapTile(row, col, tile)
{
	var mapRows = mapTiles.children;
	var mapRow = mapRows[row];
	if (mapRow == null)
	{
		mapRow = document.createElement("div");
		mapRow.className = "mapRow";

		if (row < 0)
		{
			row++;
			player.position.row++;
			mapTiles.prepend(mapRow);
		}
		else
			mapTiles.appendChild(mapRow);
	}

	// Shift columns right in row
	for (var i = mapRow.children.length; i < col; i++)
	{
		var hiddenTile = getRandomTile(row, i);

		mapTile = document.createElement("div");
		mapTile.type = hiddenTile.type;
		mapTile.style.display = "block";
		mapTile.style.visibility = "hidden";
		mapTile.className = "mapTile " + hiddenTile.type + " hidden";
		mapTile.style.setProperty("background-color", hiddenTile.color);

		mapRow.appendChild(mapTile);
	}

	var mapTile = mapRow.children[col];
	if (mapTile == null)
	{
		if (tile == null)
			tile = getRandomTile(row, col);

		mapTile = document.createElement("div");
		mapTile.type = tile.type;
		mapTile.style.display = "block";
		mapTile.className = "mapTile " + tile.type;
		mapTile.style.setProperty("background-color", tile.color);

		if (col < 0)
		{
			player.position.col++;
			mapRow.prepend(mapTile);

			// Shift columns left going up
			for (var i = row-1; i >= 0; i--)
			{
				var hiddenTile = getRandomTile(i, col);

				mapTile = document.createElement("div");
				mapTile.type = hiddenTile.type;
				mapTile.style.display = "block";
				mapTile.style.visibility = "hidden";
				mapTile.className = "mapTile " + hiddenTile.type + " hidden";
				mapTile.style.setProperty("background-color", hiddenTile.color);

				mapRows[i].prepend(mapTile);
			}

			// Shift columns left going down
			for (var i = row+1; i < mapRows.length; i++)
			{
				var hiddenTile = getRandomTile(i, col);

				mapTile = document.createElement("div");
				mapTile.type = hiddenTile.type;
				mapTile.style.display = "block";
				mapTile.style.visibility = "hidden";
				mapTile.className = "mapTile " + hiddenTile.type + " hidden";
				mapTile.style.setProperty("background-color", hiddenTile.color);

				mapRows[i].prepend(mapTile);
			}
		}
		else
			mapRow.appendChild(mapTile);
	}
	else // Expose hidden map tile
	{
		mapTile.style.visibility = "visible";
		mapTile.className = mapTile.className.replace(" hidden", "");
	}
}

function getRandomTile(row, col)
{
	var tileTypeMap = new Map();

	// Get up probabilities
	var mapRow = mapTiles.children[row-1];
	if (mapRow != null)
	{
		// Adjust compare for new columns
		var compareCol = col;
		if (col < 0 && row > player.position.row)
			compareCol = 0;

		var mapTile = mapRow.children[compareCol];
		if (mapTile != null)
			addTileTypeProbabilities(tileTypeMap,
					getTileByTileType(mapTile.type).downMap);
	}

	// Get down probabilities
	mapRow = mapTiles.children[row+1];
	if (mapRow != null)
	{
		// Adjust compare for new columns
		var compareCol = col;
		if (col < 0 && row < player.position.row)
			compareCol = 0;

		var mapTile = mapRow.children[compareCol];
		if (mapTile != null)
			addTileTypeProbabilities(tileTypeMap,
					getTileByTileType(mapTile.type).upMap);
	}

	// Get side probabilities
	mapRow = mapTiles.children[row];
	if (mapRow != null)
	{
		// Get left probabilities
		var mapTile = mapRow.children[col-1];
		if (mapTile != null)
			addTileTypeProbabilities(tileTypeMap,
					getTileByTileType(mapTile.type).sideMap);

		// Get right probabilities
		mapTile = mapRow.children[col+1];
		if (mapTile != null)
			addTileTypeProbabilities(tileTypeMap,
					getTileByTileType(mapTile.type).sideMap);
	}

	// Get tile based on probabilities
	var max = 0;
	for (var tileProbability of tileTypeMap.values())
		max += tileProbability;

	var value = getRandomNumber(1, max);

	max = 0;
	var min = 0;
	var selectTileType;
	for (var tileType of tileTypeMap.keys())
	{
		max += tileTypeMap.get(tileType);
		if (value > min && value <= max)
		{
			selectTileType = tileType;
			break;
		}

		min = max;
	}

	return getTileByTileType(selectTileType);
}

function addTileTypeProbabilities(tileTypeMap, upSideDown)
{
	var firstVisit = (tileTypeMap.size === 0);
	var tileTypeSet = new Set(tileTypeMap.keys());

	for (var tileType of upSideDown.keys())
	{
		var tileProbability = upSideDown.get(tileType);

		if (tileTypeMap.has(tileType))
			tileTypeMap.set(tileType, tileTypeMap.get(tileType) + tileProbability);
		else if (firstVisit)
			tileTypeMap.set(tileType, tileProbability);

		tileTypeSet.delete(tileType);
	}

	for (var tileType of tileTypeSet)
		tileTypeMap.delete(tileType);
}

function getTileByTileType(tileType)
{
	var tile;

	switch (tileType)
	{
		case TileTypeEnum.BARRIER:
			tile = new Barrier();
			break;
		case TileTypeEnum.DIRT:
			tile = new Dirt();
			break;
		case TileTypeEnum.GROUND:
			tile = new Ground();
			break;
		case TileTypeEnum.SKY:
			tile = new Sky();
			break;
		case TileTypeEnum.WATER:
			tile = new Water();
			break;
		default:
			tile = new Barrier();
	}

	return tile;
}

function exposeMapTiles()
{
	var sight = player.attributeMap.get(AttributeEnum.SIGHT);

	// Expose up column
	for (var row = player.position.row-1, rowSight = 0;
			rowSight < sight; (row < 0 ? row = -1 : row--), rowSight++)
		createMapTile(row, player.position.col);

	// Expose down column
	for (var row = player.position.row+1, rowSight = 0; rowSight < sight; row++, rowSight++)
		createMapTile(row, player.position.col);

	// Expose left row
	for (var col = player.position.col-1, colSight = 0;
			colSight < sight; (col < 0 ? col = -1 : col--), colSight++)
		createMapTile(player.position.row, col);

	// Expose right row
	for (var col = player.position.col+1, colSight = 0; colSight < sight; col++, colSight++)
		createMapTile(player.position.row, col);

	// Expose up rows
	for (var row = player.position.row-1, rowSight = 0;
		rowSight < sight; (row < 0 ? row = -1 : row--), rowSight++)
	{
		// Expose up left rows
		for (var col = player.position.col-1, colSight = 0;
				colSight < sight; (col < 0 ? col = -1 : col--), colSight++)
			createMapTile(row, col);

		// Expose up right rows
		for (var col = player.position.col+1, colSight = 0; colSight < sight; col++, colSight++)
			createMapTile(row, col);
	}

	// Expose down rows
	for (var row = player.position.row+1, rowSight = 0; rowSight < sight; row++, rowSight++)
	{
		// Expose down left rows
		for (var col = player.position.col-1, colSight = 0;
				colSight < sight; (col < 0 ? col = -1 : col--), colSight++)
			createMapTile(row, col);

		// Expose down right rows
		for (var col = player.position.col+1, colSight = 0; colSight < sight; col++, colSight++)
			createMapTile(row, col);
	}
}

function resetMap()
{
	document.getElementById("mapTiles").innerHTML = "";
}
