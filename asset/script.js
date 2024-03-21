// API keys
const geoCodeKey = `3c59bcb5025b0f2b8ec2c41c8c07c515`; // OpenWeatherMap API key for geocoding
const cityForecastKey = `7bead9688a9468b8c6329c6df3fb0b2c`; // OpenWeatherMap API key for city forecast

// Array of days spelled out
var dayOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

function searchFromHistory(event){
    //alert(event.target.innerHTML + " clicked")
    $("#cityName").val(event.target.innerHTML)
    $("#submitButton").click()
}

// Run when document finishes loading
$(document).ready(function() {

    // Function to render previous cities   
    function renderPreviousCities() {
        var citiesExist = localStorage.getItem('cities'); // null or string
        if(citiesExist == null){
            cities = [];
        } else {
            cities = JSON.parse(citiesExist); // converting JSON string into an array
        }
        $("#history").html("")
        for(var i = 0; i < cities.length; i++) {
            $("#history").prepend(`<div class="history-city" onclick="searchFromHistory(event)">${cities[i]}</div>`);
        }
    }
    renderPreviousCities();

    // Event listener for the submit button
    $('#submitButton').on('click', function(event){
        // Prevent the default form submission behavior
        event.preventDefault();
        
        // Get the city name from the input field
        let cityName = $("#cityName").val();
        
        // API URL for geocoding
        const geoCode = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${cityForecastKey}`;
        
        // AJAX call to fetch geocoding data
        $.ajax({
            url: geoCode,
            success: function(result) {
                console.log(result);
                // Get latitude and longitude from the geocoding result
                let lat = result.city.coord.lat;
                let lon = result.city.coord.lon;
                
                // API URL for weather forecast
                const weatherapiurl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${geoCodeKey}&units=metric`;

                // AJAX call to fetch weather forecast data
                $.ajax({
                    url: weatherapiurl,
                    success: function(forecast) {
                        // Loop through the forecast data
                        var boxNum = 1;
                        for(var i = 0; i < forecast.list.length; i += 8){
                            console.log(forecast.list[i]);
                            var obtainedForecast = forecast.list[i];
                            //var obtainedDayOfWeek = dayOfWeek[new Date(obtainedForecast.dt_txt).getDay()];
                            var date = obtainedForecast.dt_txt.split(" ")[0]
                            $(".box-"+boxNum).find(".dayName").html(date);
                            $(".box-"+boxNum).find(".temp").html("Temp: "+obtainedForecast.main.temp+" celsius");
                            $(".box-"+boxNum).find("humidity").html("Humidity: "+obtainedForecast.main.humidity);
                            $(".box-"+boxNum).find(".wind_speed").html("Wind Speed: "+obtainedForecast.wind.speed);
                            $(".box-"+boxNum).find(".icon").html(`<img src="https://openweathermap.org/img/wn/${obtainedForecast.weather[0].icon}@2x.png">`);

                            boxNum++;
                        } // for

                        // TODO: LocalStorage; Refresh the left side of the page
                        // What city was just searched
                        // Does localstorage already have cities
                        // If not, create an empty array
                        // If there are cities, add the city to the array if it's not already there
                        // Save the array back to localstorage
                        // Refresh the left side of the page
                        
                        //cityName
                        //var cities
                        var citiesExist = localStorage.getItem('cities'); // null or string
                        if(citiesExist == null){
                            cities = [];
                        } else {
                            cities = JSON.parse(citiesExist); // converting JSON string into an array
                        }
                        if(cities.map(city=>city.toLowerCase()).indexOf(cityName.toLowerCase()) == -1){ // is the city missing in the array?
                            cities.push(cityName); // add the city to the array
                        }
                        localStorage.setItem('cities', JSON.stringify(cities)); // converting array into a JSON string

                        // Refresh the left side of the page
                        $("#history").html("")
                        for(var i = 0; i < cities.length; i++) {
                            $("#history").prepend(`<div class="history-city" onclick="searchFromHistory(event)">${cities[i]}</div>`);
                        }
                        //$("#history").prepend(`<div class="history-city" onclick="searchFromHistory(event)">${cityName}</div>`);
                    } // success
                })

            }
        });

    });
});

console.log('cityName' , )
