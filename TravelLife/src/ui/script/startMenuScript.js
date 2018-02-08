function getSpecies()
{
	var species = document.getElementById("species");

	switch (species.options[species.selectedIndex].value)
	{
		case SpeciesEnum.HUMAN:
			setSpeciesDetails(new Human());
			break;
		default:
			resetSpecies(species);
	}
}

function setSpeciesDetails(species)
{
	// Species
	var speciesImage = document.getElementById("speciesImage");
	speciesImage.src = species.image;
	speciesImage.alt = species.type;
	document.getElementById("speciesLabel").innerText = species.type;
	document.getElementById("speciesTitle").style.display = "block";

	// Species Attributes
	document.getElementById("speciesInfo").innerText =
		species.description + "\n\n" + "Starting Attributes:";
	getAttributes(document.getElementById("speciesAttributes"), species.attributeMap);
}

function resetSpecies(species)
{
	if (species == null)
		species = document.getElementById("species");
	species.selectedIndex = 0;

	document.getElementById("speciesTitle").style.display = "none";

	document.getElementById("speciesInfo").innerText = "Select a species to get information.";

	document.getElementById("speciesAttributes").innerHTML = "";
}
