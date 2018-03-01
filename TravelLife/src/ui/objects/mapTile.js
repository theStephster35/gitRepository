class Tile
{
	constructor(type, solid, durability, color, upMap, downMap, sideMap)
	{
		this.type = type;
		this.solid = solid;
		this.durability = durability;
		this.color = color;

		this.upMap = upMap;
		this.downMap = downMap;
		this.sideMap = sideMap;
	}
}

class Barrier extends Tile
{
	constructor()
	{
		var upSideDownMap = new Map();
		upSideDownMap.set(TileTypeEnum.BARRIER,  1);
		upSideDownMap.set(TileTypeEnum.DIRT,    15);
		upSideDownMap.set(TileTypeEnum.GROUND,  15);
		upSideDownMap.set(TileTypeEnum.SKY,     15);
		upSideDownMap.set(TileTypeEnum.WATER,    3);

		super(TileTypeEnum.BARRIER, true, -1, "rgb(127, 127, 127)",
				upSideDownMap, upSideDownMap, upSideDownMap);
	}
}

class Dirt extends Tile
{
	constructor()
	{
		var upMap = new Map();
		upMap.set(TileTypeEnum.BARRIER,  1);
		upMap.set(TileTypeEnum.DIRT,     5);
		upMap.set(TileTypeEnum.GROUND,  10);

		var downMap = new Map();
		downMap.set(TileTypeEnum.BARRIER, 1);
		downMap.set(TileTypeEnum.DIRT,    5);
		downMap.set(TileTypeEnum.GROUND,  5);
		downMap.set(TileTypeEnum.WATER,   5);

		var sideMap = new Map();
		sideMap.set(TileTypeEnum.BARRIER,  1);
		sideMap.set(TileTypeEnum.DIRT,    15);
		sideMap.set(TileTypeEnum.GROUND,  10);
		sideMap.set(TileTypeEnum.SKY,      5);

		super(TileTypeEnum.DIRT, false, -1, "rgb(185, 122, 87)",
				upMap, downMap, sideMap);
	}
}

class Ground extends Tile
{
	constructor()
	{
		var upMap = new Map();
		upMap.set(TileTypeEnum.BARRIER,  1);
		upMap.set(TileTypeEnum.DIRT,     5);
		upMap.set(TileTypeEnum.GROUND,   5);
		upMap.set(TileTypeEnum.SKY,     10);

		var downMap = new Map();
		downMap.set(TileTypeEnum.BARRIER, 1);
		downMap.set(TileTypeEnum.DIRT,    5);
		downMap.set(TileTypeEnum.GROUND,  5);
		downMap.set(TileTypeEnum.WATER,   5);

		var sideMap = new Map();
		sideMap.set(TileTypeEnum.BARRIER,  1);
		sideMap.set(TileTypeEnum.DIRT,     5);
		sideMap.set(TileTypeEnum.GROUND,  15);
		sideMap.set(TileTypeEnum.SKY,      5);

		super(TileTypeEnum.GROUND, true, 3, "rgb(34, 177, 76)",
				upMap, downMap, sideMap);

		this.transformTile = new Dirt();
	}
}

class Sky extends Tile
{
	constructor()
	{
		var upMap = new Map();
		upMap.set(TileTypeEnum.BARRIER, 1);
		upMap.set(TileTypeEnum.SKY,     1);

		var downMap = new Map();
		downMap.set(TileTypeEnum.BARRIER, 1);
		downMap.set(TileTypeEnum.GROUND,  5);
		downMap.set(TileTypeEnum.SKY,     5);
		downMap.set(TileTypeEnum.WATER,   5);

		var sideMap = new Map();
		sideMap.set(TileTypeEnum.BARRIER,  1);
		sideMap.set(TileTypeEnum.DIRT,     5);
		sideMap.set(TileTypeEnum.GROUND,   3);
		sideMap.set(TileTypeEnum.SKY,     10);

		super(TileTypeEnum.SKY, false, -1, "rgb(153, 217, 234)",
				upMap, downMap, sideMap);
	}
}

class Water extends Tile
{
	constructor()
	{
		var upMap = new Map();
		upMap.set(TileTypeEnum.BARRIER,  1);
		upMap.set(TileTypeEnum.DIRT,    15);
		upMap.set(TileTypeEnum.GROUND,   5);
		upMap.set(TileTypeEnum.SKY,     15);
		upMap.set(TileTypeEnum.WATER,    5);

		var downMap = new Map();
		downMap.set(TileTypeEnum.BARRIER, 1);
		downMap.set(TileTypeEnum.WATER,   2);

		var sideMap = new Map();
		sideMap.set(TileTypeEnum.BARRIER, 1);
		sideMap.set(TileTypeEnum.WATER,   1);

		super(TileTypeEnum.WATER, false, -1, "rgb(0, 162, 232)",
				upMap, downMap, sideMap);
	}
}
