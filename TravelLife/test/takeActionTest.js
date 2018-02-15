function testTakeAction()
{
	testMoveUpLeftRight();
	testMoveCenterLeftRight();
	testMoveDownLeftRight();
}

function validateResults(results)
{
	validateResultsData("rows", mapTiles.children.length, -1, results.rows);
	validateResultsData("cols", mapTiles.children[1].children.length, -1, results.cols);
	validateResultsData("image", player.image, "images/" + player.species.type + "/Species.png", results.image);
	validateResultsData("row", player.position.row, -1, results.row);
	validateResultsData("col", player.position.col, -1, results.col);
	validateResultsData("status", player.status, ActionEnum.STOP, results.status);
	validateResultsData("up", player.momentum.up, 0, results.up);
	validateResultsData("left", player.momentum.left, 0, results.left);
	validateResultsData("right", player.momentum.right, 0, results.right);
	validateResultsData("down", player.momentum.down, 0, results.down);
	validateResultsData("health", player.attributeMap.get(AttributeEnum.HEALTH),
			player.species.attributeMap.get(AttributeEnum.HEALTH), results.health);
	validateResultsData("sight", player.attributeMap.get(AttributeEnum.SIGHT),
			player.species.attributeMap.get(AttributeEnum.SIGHT), results.sight);
	validateResultsData("recovery", player.attributeMap.get(AttributeEnum.RECOVERY),
			player.species.attributeMap.get(AttributeEnum.RECOVERY), results.recovery);
	validateResultsData("endurance", player.attributeMap.get(AttributeEnum.ENDURANCE),
			player.species.attributeMap.get(AttributeEnum.ENDURANCE), results.endurance);
	validateResultsData("climb", player.attributeMap.get(AttributeEnum.CLIMB),
			player.species.attributeMap.get(AttributeEnum.CLIMB), results.climb);
	validateResultsData("jump", player.attributeMap.get(AttributeEnum.JUMP),
			player.species.attributeMap.get(AttributeEnum.JUMP), results.jump);
	validateResultsData("run", player.attributeMap.get(AttributeEnum.RUN),
			player.species.attributeMap.get(AttributeEnum.RUN), results.run);
}

function validateResultsData(dataType, actualData, defaultData, resultData)
{
	var result = false;

	if (resultData == null)
		resultData = defaultData;

	if (resultData.min == null && resultData.max == null)
		result = (actualData === resultData);
	else
	{
		if (resultData.min != null)
			result = (resultData.min <= actualData);
		if (result && resultData.max != null)
			result = (actualData <= resultData.max);
	}

	assert(result, dataType + ": " + actualData);
}
