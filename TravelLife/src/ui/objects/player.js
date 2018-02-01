class Player
{
	constructor(name, speciesValue)
	{
		this.row = 0;
		this.col = 0;

		this.width = "15px";
		this.height = "16px";

		this.name = name;

		switch (speciesValue)
		{
			case SpeciesEnum.HUMAN:
				this.species = new Human();
				break;
			default:
				this.species = new Human();
		}
	}
}
