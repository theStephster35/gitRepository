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
		var description = "The human is a well-rounded species and performs acceptably at most tasks.";

		var attributeMap = new Map();
		attributeMap.set(AttributeEnum.HEALTH,	  3);
		attributeMap.set(AttributeEnum.SIGHT,	  3);
		attributeMap.set(AttributeEnum.RECOVERY,  3);
		attributeMap.set(AttributeEnum.ENDURANCE, 5);
		attributeMap.set(AttributeEnum.CLIMB,	  3);
		attributeMap.set(AttributeEnum.JUMP,	  2);
		attributeMap.set(AttributeEnum.RUN,		  5);
		attributeMap.set(AttributeEnum.SWIM,	  4);
		attributeMap.set(AttributeEnum.DIG, 	  3);

		super(SpeciesEnum.HUMAN, "images/Human/Species.png", description, attributeMap);
	}
}

class Dog extends Species
{
	constructor()
	{
		var description = "The dog has endurance, but poor sight; can dig and run but struggles to climb.";

		var attributeMap = new Map();
		attributeMap.set(AttributeEnum.HEALTH,	  3);
		attributeMap.set(AttributeEnum.SIGHT,	  2);
		attributeMap.set(AttributeEnum.RECOVERY,  3);
		attributeMap.set(AttributeEnum.ENDURANCE, 6);
		attributeMap.set(AttributeEnum.CLIMB,	  1);
		attributeMap.set(AttributeEnum.JUMP,	  2);
		attributeMap.set(AttributeEnum.RUN,		  6);
		attributeMap.set(AttributeEnum.SWIM,	  4);
		attributeMap.set(AttributeEnum.DIG, 	  4);

		super(SpeciesEnum.DOG, "images/Dog/Species.png", description, attributeMap);
	}
}
