// set up event listener
document.addEventListener("DOMContentLoaded", bindButtons);

function bindButtons(){
	document.getElementById("exerciseSubmit").addEventListener("click", function(event)
	{
		var req = new XMLHttpRequest();
		var payload = {name:null, reps:null, weight:null, date:null, lbs:null};
		payload.name = document.getElementById('name').value;
		payload.reps = document.getElementById('reps').value;
		payload.weight = document.getElementById('weight').value;
		payload.date = document.getElementById('date').value;
		payload.lbs = document.getElementById('lbs').value;
		alert(JSON.stringify(payload));
		req.open('GET', 'http://52.34.52.113:3000/insert', false);
		req.setRequestHeader('Content-Type', 'application/json');
	})
}