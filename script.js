

function searchWeather(city) {
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d0b1325148a3c9a481dc74749bc4b4df"
    console.log(queryURL1);
    var queryURL3 = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=d0b1325148a3c9a481dc74749bc4b4df"
        console.log(queryURL3);


    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        $("#general-weather").empty();

        var mainDateDt = new Date(response.dt * 1000);
        var mainLocalDate = mainDateDt.toLocaleDateString("en-US");

        var mainCardBody = $('<div>');
            mainCardBody.addClass("card-body");
            $("#general-weather").append(mainCardBody);

            var mainIconSource = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
            var mainIcon = $("<img>").attr("src", mainIconSource );


        //Get city name and disply
        var cityName = $("<h2>").text(response.name + " " + "(" + mainLocalDate + ")");
        cityName.addClass("card-title");
        mainCardBody.append(cityName);

        var mainIconSource = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        var mainIcon = $("<img>").attr("src", mainIconSource );
        mainCardBody.append(mainIcon);


        

        //get temperature and display
        console.log(response.main.temp);
        var faren = Math.round(((((response.main.temp) - 273.15) * (9 / 5)) + 32));
        console.log(faren);
        var displayFaren = $("<p>").text("Temperature: " + faren + "°F");
        displayFaren.addClass("card-text");
        mainCardBody.append(displayFaren);

        //get humidity and display
        console.log(response.main.humidity)
        var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
        mainCardBody.append(humidity);

        //get windspeed and display
        console.log(response.wind.speed);
        var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + " " + "MPH");
        mainCardBody.append(windSpeed);

        //create latitude and longitude variables for uv index parameters
        console.log(response.coord.lat);
        var latitude = (response.coord.lat);
        var longitude = (response.coord.lon);

        var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=d0b1325148a3c9a481dc74749bc4b4df&lat=" + latitude + "&lon=" + longitude
        
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            //get uv index and display
            console.log(response.value);
            var uvIndex = $("<p>").text("UV Index: " + response.value);
            $(mainCardBody).append(uvIndex);

        })


    })

    $.ajax({
        url: queryURL3,
        method: "GET"
    }).then(function(response){

        $("#days-forecast").empty();

        var forecastTitle = $("<h1>");
            forecastTitle.text("5-Day-Forecast");
            $("#days-forecast").append(forecastTitle);

        var days = [0, 8, 16, 24, 32];
        days.forEach(function(i){
            console.log(response.list[i].main.temp);

            var foreFaren = Math.round(((((response.list[i].main.temp) - 273.15) * (9 / 5)) + 32));
            console.log(foreFaren);

            var foreHumid = response.list[i].main.humidity;

            var cardDateDt = new Date(response.list[i].dt * 1000);
            var localDate = cardDateDt.toLocaleDateString("en-US");

            var forecastCard = $("<div>");
            forecastCard.addClass("card text-white bg-info mb-3 col-md-2");
            forecastCard.css("max-width", "18rem");
            $("#days-forecast").append(forecastCard);

            var cardBody = $('<div>');
            cardBody.addClass("card-body");
            forecastCard.append(cardBody);

            var cardHeader = $("<h5>");
            cardHeader.addClass("card-title");
            cardHeader.text(localDate);
            cardBody.append(cardHeader);

            
            var iconSource ="https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png"
            console.log(iconSource);
            var weatherIcon = $("<img>").attr("src", iconSource);
            cardBody.append(weatherIcon);

            var cardTemp = $("<p>");
            cardTemp.addClass("card-text");
            cardTemp.text("Temp: " + foreFaren + "°F");
            cardBody.append(cardTemp);

            var cardTemp = $("<p>");
            cardTemp.addClass("card-text");
            cardTemp.text("Humidty: " + foreHumid + "%");
            cardBody.append(cardTemp);


            
        })
    })

    $(".past-city").on("click", function (event){
        event.preventDefault();
        
        var clickCity = event.target.innerText;
        console.log(clickCity);
        searchWeather(clickCity);

        
    })

    $('#city-searchbox').val('');
}




$("#search-button").on("click", function (event) {
    event.preventDefault();
    var inputCity = $('#city-searchbox').val().trim();
    var $listItem = $('<button>');
    $listItem.addClass("list-group-item list-group-item-action past-city");
    $listItem.attr("type", "button");
    $listItem.text(inputCity);
    $("#city-list").prepend($listItem);
    

    searchWeather(inputCity);
    // fiveDayForecast(inputCity);
}
)

