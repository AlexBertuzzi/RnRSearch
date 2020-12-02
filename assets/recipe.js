var defaultRecipe = "turkey"
lookupUserFood(defaultRecipe)

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
        //console.log(apiData)
        for (var i = 0; i < 5; i++) {
            var foodPic = apiData.hits[i].recipe.image
            var recipeTitle = apiData.hits[i].recipe.label
            var ingredients = apiData.hits[i].recipe.ingredientLines
            var recipeLink = apiData.hits[i].recipe.url
            var servings = apiData.hits[i].recipe.yield
            var caloriesPer = ((apiData.hits[i].recipe.calories) / servings).toFixed(0)
            $("#" + i + "-recipeName").html(`<p> <a href="${recipeLink}" target="_blank">
                ${recipeTitle} | Servings: ${servings} | Calories: ${caloriesPer} per serving </a></p> 
                <button class="uk-align-right heartBtn" uk-icon="heart" id= "${i}-heartBtn"></button>`)
            $("#" + i + "-heartBtn").attr("data-recipe", recipeTitle)
            $("#" + i + "-recipeDescription").html("")
            for (var j = 0; j < ingredients.length; j++) {
                $("#" + i + "-recipeDescription").append(`<img id="${i}-recipeImage"><li> ${ingredients[j]} </li>`)
                $("#" + i + "-recipeImage").attr("src", foodPic)

            }
        }
        
        $(".heartBtn").on("click", function () {
            //console.log("hi")
        
            var favoriteRecipe = JSON.parse(localStorage.getItem("favRecipe")) || []
            var currentRecipe = $(this).attr("data-recipe")
            // console.log(currentRecipe)
            var checkRepeat = favoriteRecipe.indexOf(currentRecipe)
           // console.log(checkRepeat)
            if (currentRecipe !== undefined && (checkRepeat === -1 || !favoriteRecipe)) {
                favoriteRecipe.push(currentRecipe)
                localStorage.setItem("favRecipe", JSON.stringify(favoriteRecipe))
                this.classList.add("colorHeart")
            }
        
            console.log(favoriteRecipe)
        
        })
    })
}




