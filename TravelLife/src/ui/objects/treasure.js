class Treasure
{
	constructor(count, type, icon, row, col, probabilityMap)
	{
		this.count = count;
		this.type = type;
		this.icon = icon;
		this.row = row;
		this.col = col;
		this.probabilityMap = probabilityMap;
	}
}

class SmallTreasure extends Treasure
{
	constructor(count, row, col)
	{
		var probabilityMap = new Map();
		probabilityMap.set(AttributeEnum.HEALTH,	2);
		probabilityMap.set(AttributeEnum.SIGHT,		1);
		probabilityMap.set(AttributeEnum.RECOVERY,	1);
		probabilityMap.set(AttributeEnum.ENDURANCE,	2);

		super(count, TreasureTypeEnum.SMALL,
				"images/Treasure/SmallTreasure.png",
				row, col, probabilityMap);

		this.attribute;
	}
}

class BigTreasure extends Treasure
{
	constructor(count, row, col)
	{
		var probabilityMap = new Map();
		probabilityMap.set(AttributeEnum.HEALTH,	1);
		probabilityMap.set(AttributeEnum.SIGHT,		1);
		probabilityMap.set(AttributeEnum.RECOVERY,	1);
		probabilityMap.set(AttributeEnum.ENDURANCE,	1);
		probabilityMap.set(AttributeEnum.CLIMB,		1);
		probabilityMap.set(AttributeEnum.JUMP,		1);
		probabilityMap.set(AttributeEnum.RUN,		1);
		probabilityMap.set(AttributeEnum.SWIM,		1);
		probabilityMap.set(AttributeEnum.DIG,		1);

		super(count, TreasureTypeEnum.BIG,
				"images/Treasure/BigTreasure.png",
				row, col, probabilityMap);
	}
}
