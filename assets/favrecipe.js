
var favoriteRecipe = JSON.parse(localStorage.getItem("favRecipe")) || []
for (i = 0; i < favoriteRecipe.length; i++) {

    var recipeFav = favoriteRecipe[i]
   // console.log(recipeFav)
   $(".favArea").append(`<dt id="${i}-favoriteName"></dt><dd id="${i}-favoriteDescription"></dd>`)
    lookupHisFood(recipeFav, i)
}

function lookupHisFood(food, index) {
    var queryURL = `https://api.edamam.com/search?q=${food}&app_id=2bf575c8&app_key=5b2e4bc88630bc1e0a7628be37de02fd`
    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (apiData) {
        console.log(apiData)
     
            var foodPic = apiData.hits[0].recipe.image
            var recipeTitle = apiData.hits[0].recipe.label
            var ingredients = apiData.hits[0].recipe.ingredientLines
            var recipeLink = apiData.hits[0].recipe.url
            var servings = apiData.hits[0].recipe.yield
            var caloriesPer = ((apiData.hits[0].recipe.calories) / servings).toFixed(0)

            $("#" + index + "-favoriteName").html(`<p> <a href="${recipeLink}" target="_blank">
                ${recipeTitle} | Servings: ${servings} | Calories: ${caloriesPer} per serving </a></p>`)

            $("#" + index + "-favoriteDescription").html("")
            for (var j = 0; j < ingredients.length; j++) {
                $("#" + index + "-favoriteDescription").append(`<img id="${index}-favoriteImage"><li> ${ingredients[j]} </li>`)
                $("#" + index + "-favoriteImage").attr("src", foodPic)
            }

    })
}