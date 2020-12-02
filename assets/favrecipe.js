// JS for favorites tab

// Get the recipe titles of each favorited recipe in our local storage
var favoriteRecipe = JSON.parse(localStorage.getItem("favRecipe")) || []
for (i = 0; i < favoriteRecipe.length; i++) {
    var recipeFav = favoriteRecipe[i]

    // dynamically adding our elements for each favorite
    $(".favArea").append(`<dt id="${i}-favoriteName"></dt><dd id="${i}-favoriteDescription"></dd>`)

    // for each index in the local storage array, we are going to call the function
    lookupHisFood(recipeFav, i)
}

function lookupHisFood(food, index) {
    var queryURL = `https://api.edamam.com/search?q=${food}&app_id=2bf575c8&app_key=5b2e4bc88630bc1e0a7628be37de02fd`
    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (apiData) {

        // we want the [0] hit of the ajax call for that food because that is what the user favorites by default
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