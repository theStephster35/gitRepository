window.onload = init;

var user;
var userInput = document.getElementById("userInput");
userInput.addEventListener('submit', signIn);

function init()
{
	user = null;
	document.getElementById("signInStatus").innerHTML = "Enter credentials.";
}

function signIn(event)
{
	user = null;

	var signInStatus = document.getElementById("signInStatus");
	signInStatus.innerHTML = "Enter credentials.";

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function()
	{
		if (this.readyState === 4)
		{
			// Redirect to Main
			if (this.status === 200)
			{
				user = new User(JSON.parse(this.responseText));
				signInStatus.innerHTML = "Valid credentials.";

				goToGame();
			}
			else if (this.status === 500)
				signInStatus.innerHTML = "Unable to validate credentials.";
			else // Error
				signInStatus.innerHTML = JSON.parse(this.responseText).error;
		}
		else
			signInStatus.innerHTML = "Validating credentials..."
	};

	xhttp.open("POST", ConfigEnum.API_ROOT + "/api/signIn", true);
	xhttp.setRequestHeader("Content-Type", "application/json");

	var credentials = {username: document.getElementById("username").value,
					   password: document.getElementById("password").value};
	xhttp.send(JSON.stringify(credentials));

	if (event != null)
		event.preventDefault();	
}

function goToGame()
{
	document.getElementById("signInStatus").innerHTML = "Enter credentials.";

	document.getElementById("username").value = "";
	document.getElementById("password").value = "";

	window.open(ConfigEnum.API_ROOT + "/TravelLifeGame");
}
