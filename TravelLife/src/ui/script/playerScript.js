function initPlayer()
{
	var species = document.getElementById("species");
	player = new Player(document.getElementById("name").value,
						species.options[species.selectedIndex].value);

	setPlayerDetails();	
}

function resetPlayer()
{
	document.getElementById("name").value = "";

	resetSpecies();
}
