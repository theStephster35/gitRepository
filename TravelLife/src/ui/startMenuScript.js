function getSpecies()
{
	var species = document.getElementById("species");
	var speciesInfo = document.getElementById("speciesInfo");
	var selectedSpecies = species.options[species.selectedIndex].value;

	if (selectedSpecies === "human")
	{
		speciesInfo.innerText = "\nYou selected Human.";
	}
	else if (selectedSpecies === "horse")
	{
		speciesInfo.innerText = "\nYou selected Horse.";
	}
	else if (selectedSpecies === "ape")
	{
		speciesInfo.innerText = "\nYou selected Ape.";
	}
	else if (selectedSpecies === "dog")
	{
		speciesInfo.innerText = "\nYou selected Dog.";
	}
	else if (selectedSpecies === "cat")
	{
		speciesInfo.innerText = "\nYou selected Cat.";
	}
	else // Unknown species
	{
		species.selectedIndex = 0;
		speciesInfo.innerText = "Select a species to get information.";
	}
}
