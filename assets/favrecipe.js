//favorites tab area

console.log("hi")

function lookupFavFood(food) {
    var queryURL = `https://api.edamam.com/search?q=${food}&app_id=2bf575c8&app_key=5b2e4bc88630bc1e0a7628be37de02fd`
    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (apiData) {
        //console.log(apiData)
        for (var i = 0; i < 5; i++) {
            var foodPic = apiData.hits[i].recipe.image
            var recipeTitle = apiData.hits[i].recipe.label
            var ingredients = apiData.hits[i].recipe.ingredientLines
            var recipeLink = apiData.hits[i].recipe.url
            var servings = apiData.hits[i].recipe.yield
            var caloriesPer = ((apiData.hits[i].recipe.calories) / servings).toFixed(0)
            $("#" + i + "-recipeName").html(`<p> <a href="${recipeLink}" target="_blank">
                ${recipeTitle} | Servings: ${servings} | Calories: ${caloriesPer} per serving </a></p>`)
            $("#" + i + "-heartBtn").attr("data-recipe", recipeTitle)
            $("#" + i + "-recipeDescription").html("")
            for (var j = 0; j < ingredients.length; j++) {
                $("#" + i + "-recipeDescription").append(`<img id="${i}-recipeImage"><li> ${ingredients[j]} </li>`)
                $("#" + i + "-recipeImage").attr("src", foodPic)
            }
        }

    })
}