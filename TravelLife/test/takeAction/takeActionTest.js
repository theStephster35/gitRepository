function testTakeAction()
{
	testMoveUpLeftRight();
	testMoveUpCenterDown();
	testMoveLeftRight();
	testMoveDownLeftRight();
}

function validateTakeAction(results)
{
	validateTakeActionData("rows", mapTiles.children.length, -1, results.rows);
	validateTakeActionData("cols", mapTiles.children[1].children.length, -1, results.cols);
	validateTakeActionData("image", player.image, "images/Species/" + player.species.type + "/Species.png", results.image);
	validateTakeActionData("row", player.position.row, -1, results.row);
	validateTakeActionData("col", player.position.col, -1, results.col);
	validateTakeActionData("status", player.status, ActionEnum.STOP, results.status);
	validateTakeActionData("up", player.momentum.up, 0, results.up);
	validateTakeActionData("left", player.momentum.left, 0, results.left);
	validateTakeActionData("right", player.momentum.right, 0, results.right);
	validateTakeActionData("down", player.momentum.down, 0, results.down);
	validateTakeActionData("health", player.attributeMap.get(AttributeEnum.HEALTH),
			player.species.attributeMap.get(AttributeEnum.HEALTH), results.health);
	validateTakeActionData("sight", player.attributeMap.get(AttributeEnum.SIGHT),
			player.species.attributeMap.get(AttributeEnum.SIGHT), results.sight);
	validateTakeActionData("recovery", player.attributeMap.get(AttributeEnum.RECOVERY),
			player.species.attributeMap.get(AttributeEnum.RECOVERY), results.recovery);
	validateTakeActionData("endurance", player.attributeMap.get(AttributeEnum.ENDURANCE),
			player.species.attributeMap.get(AttributeEnum.ENDURANCE), results.endurance);
	validateTakeActionData("climb", player.attributeMap.get(AttributeEnum.CLIMB),
			player.species.attributeMap.get(AttributeEnum.CLIMB), results.climb);
	validateTakeActionData("jump", player.attributeMap.get(AttributeEnum.JUMP),
			player.species.attributeMap.get(AttributeEnum.JUMP), results.jump);
	validateTakeActionData("run", player.attributeMap.get(AttributeEnum.RUN),
			player.species.attributeMap.get(AttributeEnum.RUN), results.run);
	validateTakeActionData("swim", player.attributeMap.get(AttributeEnum.SWIM),
			player.species.attributeMap.get(AttributeEnum.SWIM), results.swim);
	validateTakeActionData("dig", player.attributeMap.get(AttributeEnum.DIG),
			player.species.attributeMap.get(AttributeEnum.DIG), results.dig);
	validateTakeActionData("tilesExposed", player.stats.tilesExposed, 0, results.tilesExposed);
	validateTakeActionData("tilesTraveled", player.stats.tilesTraveled, 0, results.tilesTraveled);
	validateTakeActionData("treasuresCollected", player.stats.treasuresCollected, 0, results.treasuresCollected);
}

function validateTakeActionData(dataType, actualData, defaultData, resultData)
{
	var result = false;

	if (resultData == null)
		resultData = defaultData;

	if (resultData.min != null)
	{
		result = (resultData.min <= actualData);
		if (result && resultData.max != null)
			result = (actualData <= resultData.max);
	}
	else if (resultData.option != null)
	{
		for (var option of resultData.option)
		{
			if (actualData === option)
			{
				result = true;
				break;
			}
		}
	}
	else
		result = (actualData === resultData);

	assert(result, dataType + ": " + actualData);
}
