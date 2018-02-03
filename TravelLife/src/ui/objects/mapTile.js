class Tile
{
	constructor(type, color, up, down, side)
	{
		this.type = type;
		this.color = color;

		this.up = up;
		this.down = down;
		this.side = side;
	}
}

class Barrier extends Tile
{
	constructor()
	{
		var upSideDown = new Map();
		upSideDown.set(TileTypeEnum.BARRIER, 1);
		upSideDown.set(TileTypeEnum.DIRT, 1);
		upSideDown.set(TileTypeEnum.GROUND, 1);
		upSideDown.set(TileTypeEnum.SKY, 1);
		upSideDown.set(TileTypeEnum.WATER, 1);

		super(TileTypeEnum.BARRIER, "rgb(127, 127, 127)",
				upSideDown, upSideDown, upSideDown);
	}
}

class Dirt extends Tile
{
	constructor()
	{
		var up = new Map();
		up.set(TileTypeEnum.BARRIER, 1);
		up.set(TileTypeEnum.DIRT, 1);
		up.set(TileTypeEnum.GROUND, 1);

		var down = new Map();
		down.set(TileTypeEnum.BARRIER, 1);
		down.set(TileTypeEnum.DIRT, 1);
		down.set(TileTypeEnum.GROUND, 1);
		down.set(TileTypeEnum.WATER, 1);

		var side = new Map();
		side.set(TileTypeEnum.BARRIER, 1);
		side.set(TileTypeEnum.DIRT, 1);
		side.set(TileTypeEnum.GROUND, 1);
		side.set(TileTypeEnum.SKY, 1);

		super(TileTypeEnum.DIRT, "rgb(185, 122, 87)",
				up, down, side);
	}
}

class Ground extends Tile
{
	constructor()
	{
		var upSide = new Map();
		upSide.set(TileTypeEnum.BARRIER, 1);
		upSide.set(TileTypeEnum.DIRT, 1);
		upSide.set(TileTypeEnum.GROUND, 1);
		upSide.set(TileTypeEnum.SKY, 1);

		var down = new Map();
		down.set(TileTypeEnum.BARRIER, 1);
		down.set(TileTypeEnum.DIRT, 1);
		down.set(TileTypeEnum.GROUND, 1);
		down.set(TileTypeEnum.WATER, 1);

		super(TileTypeEnum.GROUND, "rgb(34, 177, 76)",
				upSide, down, upSide);
	}
}

class Sky extends Tile
{
	constructor()
	{
		var up = new Map();
		up.set(TileTypeEnum.BARRIER, 1);
		up.set(TileTypeEnum.SKY, 1);

		var down = new Map();
		down.set(TileTypeEnum.BARRIER, 1);
		down.set(TileTypeEnum.GROUND, 1);
		down.set(TileTypeEnum.SKY, 1);
		down.set(TileTypeEnum.WATER, 1);
		
		var side = new Map();
		side.set(TileTypeEnum.BARRIER, 1);
		side.set(TileTypeEnum.DIRT, 1);
		side.set(TileTypeEnum.GROUND, 1);
		side.set(TileTypeEnum.SKY, 1);

		super(TileTypeEnum.SKY, "rgb(153, 217, 234)",
				up, down, side);
	}
}

class Water extends Tile
{
	constructor()
	{
		var up = new Map();
		up.set(TileTypeEnum.BARRIER, 1);
		up.set(TileTypeEnum.DIRT, 1);
		up.set(TileTypeEnum.GROUND, 1);
		up.set(TileTypeEnum.SKY, 1);
		up.set(TileTypeEnum.WATER, 1);

		var downSide = new Map();
		downSide.set(TileTypeEnum.BARRIER, 1);
		downSide.set(TileTypeEnum.WATER, 1);

		super(TileTypeEnum.WATER, "rgb(0, 162, 232)",
				up, downSide, downSide);
	}
}
