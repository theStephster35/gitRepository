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

		this.image = this.species.image;

		this.attributeMap = new Map();
		for (var attribute of this.species.attributeMap.keys())
			this.attributeMap.set(attribute, this.species.attributeMap.get(attribute));

		this.position = {row: 0, col: 0};
		this.momentum = {up: 0, left: 0, right: 0, down: 0};

	}
}
