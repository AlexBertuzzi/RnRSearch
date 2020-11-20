$("#searchBtn").on("click", function (event) {
var food =  $("#userInput").val()
event.preventDefault()
console.log(food)
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/pairing?food="+food,
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "578be9e848msh571074644e04840p1eca5bjsnc902c4bed763",
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
	$("#exp").text(response.pairingText)
	for (var i = 0; i< response.pairedWines.length; i++){
	var pairedWines = response.pairedWines
	var pairedWinesCapitolize = splitStrings(pairedWines)
	console.log(pairedWinesCapitolize)
	// $("#wineName-"+[i]).text();
	$("#wineName-"+[i]).text(pairedWinesCapitolize[i])
	}	
})
})

var array =["merlot",
"cabernet sauvignon","pinot noir"]

splitStrings(array)



function splitStrings(arr){
	var resultArray = []
	for (var i = 0; i < arr.length; i++) {
		var arrayItem = arr[i]
		var itemStrings = arrayItem.split(" ")
		console.log(itemStrings)
		var titleCaseString = toTitleCase2(itemStrings)
		resultArray.push(titleCaseString)
	} 
	console.log(resultArray)
	return resultArray
}



function toTitleCase2(strArr){
	var result = ""
	$.each(strArr, function (key, value) {
		var titleCase = value.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
		result += (titleCase+" ")
		console.log(result)
	})
	return result

}
