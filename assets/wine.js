$(document).ready(function () {
	var food = "turkey"
	start(food)
	//When you open the page it displays results for turkey
	$("#searchBtn").on("click", function (event) {
		$("#wines").empty()
		food = $("#userInput").val()
		event.preventDefault()
		start(food)
	}) //ajax call to get the recommended wines for that type of food
	function start() {
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
			//declare the variables for the call response to create dynamic html
			$("#exp").text(response.pairingText)
			var numberOfWines = response.pairedWines.length
			// for loop to go through all the lists of wines and create elements for them
			for (var i = 0; i < numberOfWines; i++) {
				pairedWines = response.pairedWines;
				wineName = pairedWines[i];
				newDT = "<dt class='capitolize' id=" + "wineName-" + [i] + ">PlaceHolder Title</dt>"
				newDD = "<dd id=" + "wineDescription-" + [i] + "></dd>"
				shopBTN = $('<button></button>').attr("id", "shop-" + i).text("Recommendations")
				// gives the shop button the name for the next ajax call
				shopBTN.data("wine", wineName)
				shopBTN.on("click", function (event) {
					var wineName = $(event.target).data("wine")
					// calls a function sending the name of the wines with it
					wineRec(wineName)
				})
				// making sure all the elements go to the right spot
				$("#wines").append(newDT)
				$("#wineName-" + [i]).after(newDD)
				$("#wineName-" + [i]).after(shopBTN)
				$("#wineName-" + [i]).text(wineName)
				$("#shop-" + [i]).addClass("uk-align-right")
			}
			// does a for loop to get the description for each wine calling a function that has the ajax call in it
			for (var i = 0; i < numberOfWines; i++) {
				getDesc(i, pairedWines)
			};

		});
	}
	// this function gets the description for that specific wine in the loop and displays it in the generated html element
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
	// this function gets the wine in the box that is clicked and searches it and finds recommended wine of that varietal and displays four of them with the name, description, a picture and link to buy it
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
			for (var i = 0; i < recommendedWines.length; i++) {
				$("#card-" + (i + 1)).find("h3").text(recommendedWines[i].title)
				$("#card-" + (i + 1)).find("p").text(recommendedWines[i].description)
				$("#card-" + (i + 1)).find("a").attr("href", recommendedWines[i].link).attr("target", "_blank")
				$("#card-" + (i + 1)).find("img").attr("src", recommendedWines[i].imageUrl)
			}

		});
	}
})