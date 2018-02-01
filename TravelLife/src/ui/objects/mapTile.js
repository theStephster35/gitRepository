class Tile
{
	constructor(type, color, up, down, side)
	{
		this.width = "15px";
		this.height = "16px";

		this.type = type;
		this.color = color;

		this.up = up;
		this.down = down;
		this.side = side;
	}
}

class Ground extends Tile
{
	constructor()
	{
		var upSide = [MapTileEnum.GROUND, MapTileEnum.SKY];
		var down = [MapTileEnum.GROUND];

		super(MapTileEnum.GROUND, "rgb(34, 177, 76)",
				upSide, down, upSide);
	}
}

class Sky extends Tile
{
	constructor()
	{
		var downSide = [MapTileEnum.GROUND, MapTileEnum.SKY];
		var up = [MapTileEnum.SKY];

		super(MapTileEnum.SKY, "rgb(153, 217, 234)",
				up, downSide, downSide);
	}
}
