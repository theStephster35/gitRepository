function getSpecies()
{
	var species = document.getElementById("species");

	switch (species.options[species.selectedIndex].value)
	{
		case "human":
			setSpeciesDetails(species);
			document.getElementById("speciesInfo").innerText = "You selected " + species.options[species.selectedIndex].innerText + ".";
			break;
		default:
			resetSpecies(species);
	}
}

function setSpeciesDetails(species)
{
	var speciesSelect = species.options[species.selectedIndex].innerText;

	var speciesImage = document.getElementById("speciesImage");
	speciesImage.src = "images/" + species.options[species.selectedIndex].value + ".png";
	speciesImage.alt = speciesSelect;

	document.getElementById("speciesLabel").innerText = speciesSelect;

	document.getElementById("speciesTitle").style.display = "block";
}

function resetSpecies(species)
{
	if (species == null)
		species = document.getElementById("species");
	species.selectedIndex = 0;

	document.getElementById("speciesTitle").style.display = "none";

	document.getElementById("speciesInfo").innerText = "Select a species to get information.";
}
