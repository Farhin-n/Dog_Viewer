const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";

function handleChange(event) {

	var selectedBreed = event.target.value;
	document.getElementById('dogImage').classList.add('show');
	document.getElementById('loader').classList.remove('show');

	fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			document.getElementById('dogImage').src = data.message;
		})
}

function init() {

	//populate the breeds dropdown list
	fetch(BREEDS_URL)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			let breed_list = Object.keys(data.message);
			for (var i = 0; i < breed_list.length; i++) {
				var option = document.createElement('option');
				option.text = breed_list[i];
				option.value = breed_list[i];
				var select = document.getElementById('dogBreeds');
				select.appendChild(option);
			}
		})

	//initial dog image
	fetch("https://dog.ceo/api/breeds/image/random")
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			document.getElementById('dogImage').src = data.message;
		})

	document.getElementById('dogBreeds').addEventListener('change', handleChange);
	document.getElementById('dogImage').addEventListener('load', function () {
		document.getElementById('dogImage').classList.add('show');
		document.getElementById('loader').classList.remove('show');
	});

}

init();