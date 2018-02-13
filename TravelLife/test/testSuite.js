var userInput = document.getElementById("userInput");
userInput.addEventListener('submit', startTest);

var queue = [];
var results = null;

function startTest(event)
{
	results = document.getElementById("results");
	results.innerHTML = "";

	var test = document.getElementById("test").value;
	switch (test)
	{
		case "clearResults":
			break;
		case "initAction":
			testInitAction();
			break;
		default:
			assert(true, "Test");
	}

	if (event != null)
		event.preventDefault();
}

function runTest(testFunctionName, testFunction)
{
	results = document.getElementById("results");
	results = assert(true, testFunctionName)
		.appendChild(document.createElement("ul"));
	testFunction();
}

function assert(value, desc)
{
	var li = document.createElement("li");
	li.className = (value ? "pass" : "fail");
	li.appendChild(document.createTextNode(desc));
	results.appendChild(li);
	if (!value)
		li.parentNode.parentNode.className = "fail";
		
	return li;
}