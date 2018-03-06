var treasureProbabilityMap = new Map();
treasureProbabilityMap.set("None",				   125);
treasureProbabilityMap.set(TreasureTypeEnum.SMALL,   2);
treasureProbabilityMap.set(TreasureTypeEnum.BIG,     1);

var treasureMap = new Map();

var treasureCount = 0;

function initTreasure(row, col)
{
	var treasure;

	switch (getProbableResult(treasureProbabilityMap))
	{
		case TreasureTypeEnum.SMALL:
			treasure = new SmallTreasure(++treasureCount, row, col);
			break;
		case TreasureTypeEnum.BIG:
			treasure = new BigTreasure(++treasureCount, row, col);
			break;
	}

	if (treasure != null)
	{
		if (!treasureMap.has(treasure.row))
			treasureMap.set(treasure.row, new Map());
		treasureMap.get(treasure.row).set(treasure.col, treasure);

		var treasureIcon = document.createElement("img");
		treasureIcon.id = treasure.count;
		treasureIcon.src = treasure.icon;
		treasureIcon.alt = treasure.type;
		treasureIcon.type = treasure.type;
		treasureIcon.style.display = "block";
		treasureIcon.style.width = (tileWidth*zoom) + "px";
		treasureIcon.style.height = (tileHeight*zoom) + "px";
		treasureIcon.className = "treasureIcon";

		map.prepend(treasureIcon);
	}
}

function placeTreasures()
{
	for (var treasureColMap of treasureMap.values())
	{
		for (var treasure of treasureColMap.values())
		{
			var treasureTile = mapTiles.children[treasure.row].children[treasure.col];
			var treasureIcon = document.getElementById(treasure.count);
			if (treasureIcon != null)
			{
				treasureIcon.style.top = treasureTile.offsetTop + "px";
				treasureIcon.style.left = treasureTile.offsetLeft + "px";
			}
		}
	}
}

function adjustTreasures(addRow, addCol)
{
	var tempTreasureMap = new Map();

	for (var treasureColMap of treasureMap.values())
	{
		for (var treasure of treasureColMap.values())
		{
			treasure.row += addRow;
			treasure.col += addCol;

			if (!tempTreasureMap.has(treasure.row))
				tempTreasureMap.set(treasure.row, new Map());
			tempTreasureMap.get(treasure.row).set(treasure.col, treasure);
		}
	}

	treasureMap = tempTreasureMap;
}

function getProbableResult(probabilityMap)
{
	// Get attribute based on probabilities
	var max = 0;
	for (var probableValue of probabilityMap.values())
		max += probableValue;

	var value = getRandomNumber(1, max);

	max = 0;
	var min = 0;
	var result;
	for (var probableKey of probabilityMap.keys())
	{
		max += probabilityMap.get(probableKey);
		if (value > min && value <= max)
		{
			result = probableKey;
			break;
		}

		min = max;
	}

	return result;
}

function resetTreasures()
{
	for (var treasureColMap of treasureMap.values())
	{
		for (var treasure of treasureColMap.values())
			map.removeChild(document.getElementById(treasure.count));
	}

	treasureMap = new Map();
}
