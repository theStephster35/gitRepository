class Treasure
{
	constructor(count, type, name, icon, row, col, probabilityMap)
	{
		this.count = count;
		this.type = type;
		this.name = name;
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
		probabilityMap.set(AttributeEnum.HEALTH,	3);
		probabilityMap.set(AttributeEnum.SIGHT,		1);
		probabilityMap.set(AttributeEnum.RECOVERY,	1);
		probabilityMap.set(AttributeEnum.ENDURANCE,	2);

		super(count, TreasureTypeEnum.SMALL, "Small Treasure",
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
		probabilityMap.set(AttributeEnum.HEALTH,	2);
		probabilityMap.set(AttributeEnum.SIGHT,		2);
		probabilityMap.set(AttributeEnum.RECOVERY,	2);
		probabilityMap.set(AttributeEnum.ENDURANCE,	1);
		probabilityMap.set(AttributeEnum.CLIMB,		3);
		probabilityMap.set(AttributeEnum.JUMP,		3);
		probabilityMap.set(AttributeEnum.RUN,		3);
		probabilityMap.set(AttributeEnum.SWIM,		3);
		probabilityMap.set(AttributeEnum.DIG,		3);

		super(count, TreasureTypeEnum.BIG, "Big Treasure",
				"images/Treasure/BigTreasure.png",
				row, col, probabilityMap);
	}
}
