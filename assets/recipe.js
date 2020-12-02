// JS for Home Page


//  Upon landing page in Home, automatic recipes will generate for turkey as an example
var defaultRecipe = "turkey"
lookupUserFood(defaultRecipe)

// when user types something into input box and clicks the magnifying glass, will call ajax function
$("#searchBtn").on("click", function (event) {
    event.preventDefault()
    var userFood = $("#userInput").val()

    lookupUserFood(userFood)
})

// function that will run the ajax call of whatever food user inputted 
function lookupUserFood(food) {
    var queryURL = `https://api.edamam.com/search?q=${food}&app_id=2bf575c8&app_key=5b2e4bc88630bc1e0a7628be37de02fd`
    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (apiData) {

        // loop for only 5 recipes because that is the limit on the APi per minute
        for (var i = 0; i < 5; i++) {
            var foodPic = apiData.hits[i].recipe.image
            var recipeTitle = apiData.hits[i].recipe.label
            var ingredients = apiData.hits[i].recipe.ingredientLines
            var recipeLink = apiData.hits[i].recipe.url
            var servings = apiData.hits[i].recipe.yield
            var caloriesPer = ((apiData.hits[i].recipe.calories) / servings).toFixed(0)

            // the title with the Recipe Name will have a link to the actual recipe webpage
            $("#" + i + "-recipeName").html(`<p> <a href="${recipeLink}" target="_blank">
                ${recipeTitle} | Servings: ${servings} | Calories: ${caloriesPer} per serving </a></p> 
                <button class="uk-align-right heartBtn" uk-icon="heart" id= "${i}-heartBtn"></button>`)

            // data attribute added so we can reference it for our local storage
            $("#" + i + "-heartBtn").attr("data-recipe", recipeTitle)

            $("#" + i + "-recipeDescription").html("")

            //loop through the entire ingredients and make a list item for each one
            for (var j = 0; j < ingredients.length; j++) {
                $("#" + i + "-recipeDescription").append(`<img id="${i}-recipeImage"><li> ${ingredients[j]} </li>`)
                $("#" + i + "-recipeImage").attr("src", foodPic)
            }
        }

        // listener for the favorite button
        $(".heartBtn").on("click", function () {

            var favoriteRecipe = JSON.parse(localStorage.getItem("favRecipe")) || []
            var currentRecipe = $(this).attr("data-recipe")

            //to avoid repeated favorites or if the user clicks on a heart icon without a recipe 
            var checkRepeat = favoriteRecipe.indexOf(currentRecipe)
            if (currentRecipe !== undefined && (checkRepeat === -1 || !favoriteRecipe)) {
                favoriteRecipe.push(currentRecipe)
                localStorage.setItem("favRecipe", JSON.stringify(favoriteRecipe))
                this.classList.add("colorHeart")
            }
        })
    })
}




