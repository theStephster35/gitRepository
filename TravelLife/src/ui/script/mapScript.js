var map = document.getElementById("map");
var mapTiles;
var zoom = 3;
var tileWidth = 15;
var tileHeight = 16;

function adjustMapContents()
{
	map.style.minHeight = (window.innerHeight - getHeightOffset(map)) + "px";
	map.style.maxHeight = map.style.minHeight;
	map.style.minWidth = (window.innerWidth - getWidthOffset(map)) + "px";
	map.style.maxWidth = map.style.minWidth;

	adjustMapTilesContents();
}

function adjustMapTilesContents()
{
	if (gameOn)
	{
		var playerTile = mapTiles.children[player.position.row].children[player.position.col];
		while (playerIcon.style.top !== playerTile.offsetTop + "px"
			|| playerIcon.style.left !== playerTile.offsetLeft + "px")
		{
			placePlayer();
			placeTreasures();
		}

		if (document.getElementById("autoLocatePlayer").checked)
			locatePlayer();
	}
}

function jumpToLocation(offsetTop, offsetLeft)
{
	map.scrollTop = offsetTop;
	map.scrollLeft = offsetLeft;
}

function zoomMapInOut(zoomType)
{
	var zoomInOut = false;
	switch (zoomType)
	{
		case "zoomIn":
			if (zoom < 5)
			{
				zoom++;
				zoomInOut = true;
			}
			break;
		case "zoomOut":
			if (zoom > 1)
			{
				zoom--;
				zoomInOut = true;
			}
			break;
	}

	if (zoomInOut
	 && mapTiles != null && mapTiles.children != null)
	{
		var zoomWidth = (tileWidth*zoom) + "px";
		var zoomHeight = (tileHeight*zoom) + "px";

		for (var row = 0; row < mapTiles.children.length; row++)
		{
			var mapRow = mapTiles.children[row];
			if (mapRow.children != null)
			{
				for (var col = 0; col < mapRow.children.length; col++)
				{
					var mapTile = mapRow.children[col];

					mapTile.style.width = zoomWidth;
					mapTile.style.height = zoomHeight;
				}
			}
		}

		for (var treasureColMap of treasureMap.values())
		{
			for (var treasure of treasureColMap.values())
			{
				var treasureIcon = document.getElementById(treasure.count);
				if (treasureIcon != null)
				{
					treasureIcon.style.width = zoomWidth;
					treasureIcon.style.height = zoomHeight;
				}
			}
		}

		playerIcon.style.width = zoomWidth;
		playerIcon.style.height = zoomHeight;
	}

	adjustMapTilesContents();
}

function initMapTiles()
{
	mapTiles = document.getElementById("mapTiles");

	// Start Sky Tile
	createMapTile(0, 0, new Sky());

	// Start Ground Tile
	createMapTile(1, 0, new Ground());

	exposeMapTiles();

	document.getElementById("mapMenu").style.visibility = "visible";
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
			adjustTreasures(1, 0);
			mapTiles.insertBefore(mapRow, mapTiles.children[0]);
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
		mapTile.value = hiddenTile.durability;
		mapTile.style.width = (tileWidth*zoom) + "px";
		mapTile.style.height = (tileHeight*zoom) + "px";
		mapTile.className = "mapTile " + hiddenTile.type + " hidden";
		mapTile.style.setProperty("background", hiddenTile.color);
		mapTile.traveled = false;

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
		mapTile.value = tile.durability;
		mapTile.className = "mapTile " + tile.type;
		mapTile.style.width = (tileWidth*zoom) + "px";
		mapTile.style.height = (tileHeight*zoom) + "px";
		mapTile.style.setProperty("background", tile.color);
		mapTile.traveled = false;

		player.statsMap.set(StatsEnum.TILES_EXPOSED, (player.statsMap.get(StatsEnum.TILES_EXPOSED)+1));

		if (col < 0)
		{
			player.position.col++;
			adjustTreasures(0, 1);
			mapRow.insertBefore(mapTile, mapRow.children[0]);

			// Shift columns left going up
			for (var i = row-1; i >= 0; i--)
			{
				var hiddenTile = getRandomTile(i, col);

				mapTile = document.createElement("div");
				mapTile.type = hiddenTile.type;
				mapTile.style.display = "block";
				mapTile.style.visibility = "hidden";
				mapTile.value = hiddenTile.durability;
				mapTile.style.width = (tileWidth*zoom) + "px";
				mapTile.style.height = (tileHeight*zoom) + "px";
				mapTile.className = "mapTile " + hiddenTile.type + " hidden";
				mapTile.style.setProperty("background", hiddenTile.color);
				mapTile.traveled = false;

				mapRows[i].insertBefore(mapTile, mapRows[i].children[0]);
			}

			// Shift columns left going down
			for (var i = row+1; i < mapRows.length; i++)
			{
				var hiddenTile = getRandomTile(i, col);

				mapTile = document.createElement("div");
				mapTile.type = hiddenTile.type;
				mapTile.style.display = "block";
				mapTile.style.visibility = "hidden";
				mapTile.value = hiddenTile.durability;
				mapTile.style.width = (tileWidth*zoom) + "px";
				mapTile.style.height = (tileHeight*zoom) + "px";
				mapTile.className = "mapTile " + hiddenTile.type + " hidden";
				mapTile.style.setProperty("background", hiddenTile.color);
				mapTile.traveled = false;

				mapRows[i].insertBefore(mapTile, mapRows[i].children[0]);
			}

			col++;
		}
		else
			mapRow.appendChild(mapTile);

		if (!tile.solid || tile.durability > 0)
			initTreasure(row, col);
	}
	else if (mapTile.style.visibility === "hidden")
	{
		mapTile.style.visibility = "visible";
		mapTile.className = mapTile.className.replace(" hidden", "");

		player.statsMap.set(StatsEnum.TILES_EXPOSED, (player.statsMap.get(StatsEnum.TILES_EXPOSED)+1));

		tile = getTileByTileType(mapTile.type);
		if (!tile.solid || tile.durability > 0)
			initTreasure(row, col);
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
	return getTileByTileType(getProbableResult(tileTypeMap));
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

function getTileByPosition(row, col)
{
	return getTileByTileType(mapTiles.children[row].children[col].type);
}

function exposeMapTiles()
{
	var sight = player.attributeMap.get(AttributeEnum.SIGHT);
	var playerTile = mapTiles.children[player.position.row].children[player.position.col];

	if (!playerTile.traveled)
	{
		playerTile.traveled = true;
		player.statsMap.set(StatsEnum.TILES_TRAVELED, (player.statsMap.get(StatsEnum.TILES_TRAVELED)+1));
	}

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

function transformMapTile(row, col)
{
	var mapTileTransformed = false;
	var mapTile = mapTiles.children[row].children[col];
	var tile = getTileByTileType(mapTile.type);
	var transformTile = tile.transformTile;

	mapTile.value--;

	// Transform map tile
	if (mapTile.value === 0)
	{
		mapTile.value = -1;
		mapTile.type = transformTile.type;
		mapTile.className = "mapTile " + transformTile.type;
		mapTile.style.setProperty("background", transformTile.color);

		mapTileTransformed = true;
	}
	else // Map tile lost durability
	{
		var gradient = Math.ceil(100-(((mapTile.value/tile.durability)*100)));
		mapTile.style.setProperty("background",
				"radial-gradient(" + transformTile.color + " " + gradient + "%, " + tile.color + " 0%)");
	}

	return mapTileTransformed;
}

function resetMap()
{
	if (!document.getElementById("rememberMe").checked)
		zoom = 3;


	document.getElementById("mapTiles").innerHTML = "";

	document.getElementById("mapMenu").style.visibility = "hidden";
}
