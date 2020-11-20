console.log("hi")
$("#searchBtn").on("click", function(event) {
    event.preventDefault()
    console.log("hi")
    var userFood = $("#userInput").val()
    console.log(userFood)

    lookupUserFood(userFood)
})

function lookupUserFood(food) {
    var queryURL = `https://api.edamam.com/search?q=${food}&app_id=2bf575c8&app_key=5b2e4bc88630bc1e0a7628be37de02fd`
    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (apiData) {
        console.log(apiData)
})
}
