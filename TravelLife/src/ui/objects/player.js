class Player
{
	constructor(name, speciesType)
	{
		this.name = name;
		this.species = getSpeciesByType(speciesType, true);

		this.image = this.species.image;

		this.attributeMap = new Map();
		for (var attribute of this.species.attributeMap.keys())
			this.attributeMap.set(attribute, this.species.attributeMap.get(attribute));

		this.status = ActionEnum.STOP;
		this.position = {row: 0, col: 0};
		this.momentum = {up: 0, left: 0, right: 0, down: 0};

	}
}
