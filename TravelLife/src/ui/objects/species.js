class Species
{
	constructor(type, image, description, attributeMap)
	{
		this.type = type;
		this.image = image;
		this.description = description;
		this.attributeMap = attributeMap;
	}
}

class Human extends Species
{
	constructor()
	{
		var description = "The human is well-rounded and performs acceptably at most tasks.";

		var attributeMap = new Map();
		attributeMap.set(AttributeEnum.HEALTH,    3);
		attributeMap.set(AttributeEnum.SIGHT,     3);
		attributeMap.set(AttributeEnum.RECOVERY,  3);
		attributeMap.set(AttributeEnum.ENDURANCE, 5);
		attributeMap.set(AttributeEnum.RUN,   	  5);

		super(SpeciesEnum.HUMAN, "images/human.png", description, attributeMap);
	}
}
