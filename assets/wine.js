$(document).ready(function () {
	$("#searchBtn").on("click", function (event) {
		$("#wines").empty()
		var food = $("#userInput").val()
		event.preventDefault()
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
			var pairedWines,
				newDT,
				newDD,
				wineName,
				shopBTN;
			$("#exp").text(response.pairingText)
			var numberOfWines = response.pairedWines.length
			for (var i = 0; i < numberOfWines; i++) {
				pairedWines = response.pairedWines;
				wineName = pairedWines[i];
				newDT = "<dt class='capitolize' id=" + "wineName-" + [i] + ">PlaceHolder Title</dt>"
				newDD = "<dd id=" + "wineDescription-" + [i] + "></dd>"
				// shopBTN = "<button id='shop-" + [i] + "'>Recommendations</button>"
				shopBTN = $('<button></button>').attr("id", "shop-"+i).text("Recommendations")
				shopBTN.data("wine",wineName)
				shopBTN.on("click", function(event){
					var wineName = $(event.target).data("wine")

					wineRec(wineName)
				})
				$("#wines").append(newDT)
				$("#wineName-" + [i]).after(newDD)
				$("#wineName-" + [i]).after(shopBTN)
				$("#wineName-" + [i]).text(wineName)
				$("#shop-" + [i]).addClass("uk-align-right")
			}
			for (var i = 0; i < numberOfWines; i++) {
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
function wineRec(wine) {
	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/recommendation?wine=" + wine + "&maxPrice=200&minRating=0.7&number=4",
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "578be9e848msh571074644e04840p1eca5bjsnc902c4bed763",
			"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
		}
	};
	$.ajax(settings).done(function (response) {
		var recommendedWines = response.recommendedWines;
		for (var i = 0; i <recommendedWines.length; i++) {
			$("#card-"+(i+1)).find("h3").text(recommendedWines[i].title)
			$("#card-"+(i+1)).find("p").text(recommendedWines[i].description)
			$("#card-"+(i+1)).find("a").attr("href",recommendedWines[i].link).attr("target", "_blank")
			$("#card-"+(i+1)).find("img").attr("src",recommendedWines[i].imageUrl)
		}

	});
}
})