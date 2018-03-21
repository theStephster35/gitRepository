var user;

function initUser()
{
	user = window.opener.user;
	window.opener.user = null;

	document.getElementById("username").innerHTML = user.username + "!";
	document.getElementById("welcome").style.visibility = "visible";

	document.getElementById(MenuEnum.USER).style.display = "block";
}

function deleteUser()
{
	if (confirm("Are you sure you want delete user " + user.username + "?"))
	{
		var xhttp = new XMLHttpRequest();
		xhttp.open("DELETE", ConfigEnum.API_ROOT + "/api/deleteUser", true);
		xhttp.setRequestHeader("Content-Type", "application/json");

		var userId = {userId: user._id};
		xhttp.send(JSON.stringify(userId));

		resetUser();
	}
}

function resetUser()
{
	user = null;

	document.getElementById("username").innerHTML = "";
	document.getElementById("welcome").style.visibility = "hidden";

	document.getElementById(MenuEnum.USER).style.display = "none";

	if (openNavLink != null && openNavLink.id === MenuEnum.USER)
		openMenu(MenuEnum.HOME);
}
