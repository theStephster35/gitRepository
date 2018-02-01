class Species
{
	constructor(type, image, description, sight)
	{
		this.type = type;
		this.image = image;
		this.description = description;

		this.attributes = {sight};
	}
}

class Human extends Species
{
	constructor()
	{
		var description = "The human is well-rounded and performs acceptably at most tasks.";
		super(SpeciesEnum.HUMAN, "images/human.png", description, 1);
	}
}
