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
		var description = "The human is a well-rounded species and performs acceptably at most tasks.\n"
						+ "Recommended for beginners.";

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

		super(SpeciesEnum.HUMAN, "images/Species/Human/Species.png", description, attributeMap);
	}
}

class Dog extends Species
{
	constructor()
	{
		var description = "The dog has good endurance, but poor sight;\n"
						+ "can dig and run but struggles to climb.";

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

		super(SpeciesEnum.DOG, "images/Species/Dog/Species.png", description, attributeMap);
	}
}

class Cat extends Species
{
	constructor()
	{
		var description = "The cat has good sight and recovery, but lacks endurance;\n"
						+ "can climb and jump but struggles to swim and dig.";

		var attributeMap = new Map();
		attributeMap.set(AttributeEnum.HEALTH,	  3);
		attributeMap.set(AttributeEnum.SIGHT,	  4);
		attributeMap.set(AttributeEnum.RECOVERY,  4);
		attributeMap.set(AttributeEnum.ENDURANCE, 3);
		attributeMap.set(AttributeEnum.CLIMB,	  5);
		attributeMap.set(AttributeEnum.JUMP,	  4);
		attributeMap.set(AttributeEnum.RUN,		  5);
		attributeMap.set(AttributeEnum.SWIM,	  1);
		attributeMap.set(AttributeEnum.DIG, 	  2);

		super(SpeciesEnum.CAT, "images/Species/Cat/Species.png", description, attributeMap);
	}
}
