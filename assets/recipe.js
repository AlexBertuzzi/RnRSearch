$("#searchBtn").on("click", function (event) {
    event.preventDefault()
    var userFood = $("#userInput").val()

    lookupUserFood(userFood)
})

function lookupUserFood(food) {
    var queryURL = `https://api.edamam.com/search?q=${food}&app_id=2bf575c8&app_key=5b2e4bc88630bc1e0a7628be37de02fd`
    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (apiData) {
        console.log(apiData)
        for (var i = 0; i < 5; i++) {
            var recipeTitle = apiData.hits[i].recipe.label
            var ingredients = apiData.hits[i].recipe.ingredientLines
            var recipeLink = apiData.hits[i].recipe.url
            var servings = apiData.hits[i].recipe.yield
            $("#" + i + "-recipeName").html(`<p> <a href="${recipeLink}" target="_blank">
            ${recipeTitle} | Servings: ${servings} </a></p>`)

            $("#" + i + "-recipeDescription").text(ingredients)
        }

    })
}
