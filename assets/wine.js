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
		var pairedWines,
			newDT,
			newDD,
			shopBTN;
		$("#exp").text(response.pairingText)
		var numberOfWines = response.pairedWines.length
		for (var i = 0; i < numberOfWines; i++) {
			pairedWines = response.pairedWines
			newDT = "<dt class='capitolize' id=" + "wineName-" + [i] + ">PlaceHolder Title</dt>"
			newDD = "<dd id=" + "wineDescription-" + [i] + "></dd>"
			shopBTN = "<button class=" + "uk-align-right>Shop this Wine!</button>"
			$("#wines").append(newDT)
			$("#wineName-" + [i]).after(newDD)
			$("#wineName-" + [i]).after(shopBTN)
			$("#wineName-" + [i]).text(pairedWines[i])
			console.log(pairedWines[i])
		}
		for (var i = 0; i < numberOfWines; i++) {
			console.log(numberOfWines)
			getDesc(i, pairedWines)
		};

	});
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

function getDesc(i, pairedWines) {
	const settings2 = {
		"async": true,
		"crossDomain": true,
		"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/description?wine=" + pairedWines[i] + "",
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "578be9e848msh571074644e04840p1eca5bjsnc902c4bed763",
			"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
		}
	};

	$.ajax(settings2).done(function (response2) {
		console.log(response2);
		console.log(response2.wineDescription)
		console.log(i)
		$("#wineDescription-" + [i]).text(response2.wineDescription)
	}
	)
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


const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/recommendation?wine=merlot&maxPrice=50&minRating=0.7&number=3",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "578be9e848msh571074644e04840p1eca5bjsnc902c4bed763",
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});