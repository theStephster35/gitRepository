class Player
{
	constructor(name, speciesValue)
	{
		this.name = name;

		switch (speciesValue)
		{
			case SpeciesEnum.HUMAN:
				this.species = new Human();
				break;
			default:
				this.species = new Human();
		}

		this.position = {row: 0, col: 0};
	}
}
