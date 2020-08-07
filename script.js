




function searchWeather(city) {
    var queryURL1= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d0b1325148a3c9a481dc74749bc4b4df"
    console.log(queryURL1);

    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        //Get city name and disply
        var cityName = $("<h2>").text(response.name);
        $("#general-weather").append(cityName);

        //get temperature and display
        console.log(response.main.temp);
        var faren = ((((response.main.temp) - 273.15) * (9/5)) +32);
        console.log(faren);
        var displayFaren = $("<h4>").text("Temperature: " + faren);
        $("#general-weather").append(displayFaren);

        //get humidity and display
        console.log(response.main.humidity)
        var humidity = $("<h4>").text("Humidity: " + response.main.humidity);
        $("#general-weather").append(humidity);

        //get windspeed and display
        console.log(response.wind.speed);
        var windSpeed = $("<h4>").text("Wind Speed: " + response.wind.speed);
        $("#general-weather").append(windSpeed);

        //create latitude and longitude variables for uv index parameters
        console.log(response.coord.lat);
        var latitude = (response.coord.lat);
        var longitude = (response.coord.lon);

        var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=d0b1325148a3c9a481dc74749bc4b4df&lat=" + latitude + "&lon=" + longitude

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(response){

            console.log(response);

            //get uv index and display
            console.log(response.value);
            var uvIndex = $("<h4>").text("UV Index: " + response.value);
            $("#general-weather").append(uvIndex);
            
        })

        
    })
}












$("button").on("click", function(event) {
    event.preventDefault();
    var inputCity = $('#city-searchbox').val().trim();
    var $listItem = $('<li>');
    $listItem.addClass("list-group-item");
    $listItem.text(inputCity);
    $("#city-list").prepend($listItem);
    
    searchWeather(inputCity); 
}
)