var testWD = ""
$("#searchBtn").on("click", function (event) {
	$("#wines").empty()
	var food = $("#userInput").val()
	event.preventDefault()
	console.log(food)
	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/pairing?food=" + food,
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "578be9e848msh571074644e04840p1eca5bjsnc902c4bed763",
			"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
		}
	};

	$.ajax(settings).done(function (response) {
		console.log(response);
		$("#exp").text(response.pairingText)
		var numberOfWines = response.pairedWines.length
		for (var i = 0; i < response.pairedWines.length; i++) {
			var pairedWines = response.pairedWines
			var pairedWinesCapitolize = splitStrings(pairedWines)
			var newDT = "<dt id=" + "wineName-" + [i] + ">PlaceHolder Title</dt>"
			var newDD = "<dd id=" + "wineDescription-" + [i] + "></dd>"
			$("#wines").append(newDT)
			$("#wineName-" + [i]).after(newDD)
			$("#wineName-" + [i]).text(pairedWinesCapitolize[i])
			console.log(i)
		}
		console.log(pairedWinesCapitolize)
		for (var i = 0; i < numberOfWines; i++) {
			console.log(numberOfWines)
			const settings2 = {
				"async": true,
				"crossDomain": true,
				"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/description?wine=" + pairedWines[i] + "",
				"method": "GET",
				"headers": {
					"x-rapidapi-key": "578be9e848msh571074644e04840p1eca5bjsnc902c4bed763",
					"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
				}
			}; getDesc(i)
			
			 function getDesc (i) {
				$.ajax(settings2).done(function (response2) {
				console.log(response2);
				console.log(response2.wineDescription)
				console.log(i)
				testWD = response2.wineDescription
				$("#wineDescription-" + [i]).text(response2.wineDescription)
			

			}
			)
		}
	}
	})
})

function splitStrings(arr) {
	var resultArray = []
	for (var i = 0; i < arr.length; i++) {
		var arrayItem = arr[i]
		var itemStrings = arrayItem.split(" ")
		var titleCaseString = toTitleCase(itemStrings)
		resultArray.push(titleCaseString)
	}
	return resultArray
}

function toTitleCase(strArr) {
	var result = ""
	$.each(strArr, function (key, value) {
		var titleCase = value.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
		result += (titleCase + " ")
	})
	return result

}
