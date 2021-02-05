//create the necessary variables 

var WeatherExamples = []

//3 functions
//general forecast search
$("#searchButton").on("click", function(event){
 event.preventDefault()
    var city = $(".searchValue").val()
    console.log(city)
    weatherSearch(city)
    forecastSearch(city)
    // weatherUV(city)
})

//on click even to bring up locations. 
// Create local storage for persistant data json 
// create a for loop to populate out the the five day forecast
    // var weather = $(this).attr("data-name");
function weatherSearch(city) {
    var urlKey = "976ceebd985f546e6f616442814d3818";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=" + urlKey + "&units=imperial"
    
    $.ajax({
        url: queryURL,
        method: "get"
    }).then(function(response) { console.log(response)
        $("#weather-view").text(JSON.stringify(response))
        var location = $("<p>").addClass("").text(response.name);
        var temperature = $("<h2>").text(response.main.temp)
        var humidity = $("<p>").text(response.main.humidity)
        var windSpeed = $("<p>").text(response.wind.speed)
       


        
       $(".windSpeed").append(location, windSpeed)
       $(".humidityp").append(location, humidity)
       $(".mainForecast").append(location, temperature)

    })

}
function forecastSearch(city) {
    var urlKey = "976ceebd985f546e6f616442814d3818";
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q="+ city + "&appid=" + urlKey +"&units=imperial";
    
    $.ajax({
        url: queryURL,
        method: "get"
    }).then(function(response) { console.log(response)
        $("#weather-view").text(JSON.stringify(response))
        $(".fiveDayForecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
        for (var i = 0; i < response.list.length; i++ ) {
            if (response.list[i].dt_txt.indexOf("9:00:00")!== -1) {
                
                var maxTemp = $("<h2>").text("maxTemp: " + response.list[i].main.temp_max)

                $(".fiveDayForecast").append(maxTemp)


           
            }
        }
    })

}
// make a function that creates a row with the city name in it. So it appends a row each time dynamically. So that when you click search it'll create the row but will also put it into local storage and create a get local storage so that it persists through a refresh. 

// function weatherUV() {
//     var urlKey = "976ceebd985f546e6f616442814d3818";
//     var queryURL = "http://api.openweathermap.org/data/2.5/uvi?q="+ city + "&appid=" + urlKey;
    
//     $.ajax({
//         url: queryURL,
//         method: "get"
//     }).then(function(response) {
//         $("#weather-view").text(JSON.stringify(response))
//         // var uv = $("<h3>")
//         console.log(response)

//     })

// }
