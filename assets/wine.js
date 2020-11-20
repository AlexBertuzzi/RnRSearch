$(".uk-form-icon").on("click", function (event) {
var food =  $(".uk-form-width-large").val()
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
})
})