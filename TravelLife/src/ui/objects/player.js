class Player
{
	constructor(name, speciesType)
	{
		this._id = null;

		this.name = name;
		this.species = getSpeciesByType(speciesType, true);

		this.status = StatusEnum.STOPPED;
		this.momentum = {up: 0, left: 0, right: 0, down: 0};

		this.image = this.species.image;

		this.attributeMap = new Map();
		for (var attribute of this.species.attributeMap.keys())
			this.attributeMap.set(attribute, this.species.attributeMap.get(attribute));

		this.statisticsMap = new Map();
		this.statisticsMap.set(StatsEnum.TILES_EXPOSED, 0);
		this.statisticsMap.set(StatsEnum.TILES_TRAVELED, 0);
		this.statisticsMap.set(StatsEnum.TREASURES_COLLECTED, 0);

		this.position = {row: 0, col: 0};
	}
}
