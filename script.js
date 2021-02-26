//create the necessary variables 

var weatherExamples = []

//3 functions
//general forecast search
$("#searchButton").on("click", function(event){
 event.preventDefault()
    var city = $(".searchValue").val()
    weatherExamples.push(city)
    weatherSearch(city)
    forecastSearch(city)
    console.log(weatherExamples)
    render()
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
        $('.windSpeed').empty();
        $('.humidity').empty();
        $('.mainForecast').empty();
        $("#weather-view").text(JSON.stringify(response))
        var location = $("<h2>").addClass("").text(response.name);
        var temperature = $("<p>").text("Temperature: " + response.main.temp + "°")
        var humidity = $("<p>").text("Humidity: " + response.main.humidity +"%")
        var windSpeed = $("<p>").text(`Wind Speed: ${response.wind.speed} MPH`)
       


        
       $(".windSpeed").append(location, windSpeed)
       $(".humidity").append(location, humidity)
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
                
                var column = $("<div>").addClass("col-md-2")
                var card = $("<div>").addClass("card bg-primary text-white")
                var body = $("<div>").addClass("card-body p-2")
                var title = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString())
                var image = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png")
                var humidity = $("<p>").addClass("card-text").text("humidity: " + response.list[i].main.humidity)
                var temperature = $("<p>").addClass("card-text").text("Temperature: " + response.list[i].main.temp_max)
                column.empty()
                column.append(card.append(body.append(title, image, temperature, humidity)))
                $(".fiveDayForecast").append(column)
            }
        }
    })

}
function previousSearches() {
    var buttonVariable = this.textContent;
    forecastSearch(buttonVariable);
    weatherSearch(buttonVariable);
};
function render(){console.log(weatherExamples)

    // for each item in the searchHistory array
    weatherExamples.forEach((weather)=>{
        var newButton = $('<button>').text(weather).on("click", previousSearches);
        $(".newUl").append(newButton);
        // append the new button the ul 
    })     
    
};


