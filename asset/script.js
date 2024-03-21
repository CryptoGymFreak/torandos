const geoCodeKey = `3c59bcb5025b0f2b8ec2c41c8c07c515`;
const cityForecastKey = `7bead9688a9468b8c6329c6df3fb0b2c`;
let lat = '';
let lon = '';
var dayOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
$(document).ready(function() {
    $('#submitButton').on('click', function(event){
        // event.preventDefault() is added to prevent the default action of the form - which is to submit the form using post / get
        event.preventDefault();
        let cityName = $("#cityName").val();
        const geoCode = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${cityForecastKey}`;
        $.ajax({
            url: geoCode,
            success: function(result) {
                console.log(result);
                let lat = result.city.coord.lat;
                let lon = result.city.coord.lon;
                const weatherapiurl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${geoCodeKey}&units=metric`;

                $.ajax({
                    url: weatherapiurl,
                    success: function(forecast) {
                        for(var i = 0; i < forecast.list.length;i+=8){
                            console.log(forecast.list[i]);
                            var obtainedForecast = forecast.list[i];
                            var obtainedDayOfWeek = dayOfWeek[new Date(obtainedForecast.dt_txt).getDay()];
                            var children = $(".results").children("div");
                            for(var m = 0; m <children.length; m++) {
                                var theDay = $(children[m]).find('.dayName').html();
                                if (theDay === obtainedDayOfWeek) {
                                    $(children[m]).find(".temp").html("Temp: "+obtainedForecast.main.temp+" celsius");
                                    $(children[m]).find(".humidity").html("Humidity: "+obtainedForecast.main.humidity);
                                    $(children[m]).find(".wind_speed").html("Wind Speed: "+obtainedForecast.wind.speed);
                                    // https://openweathermap.org/img/wn/10d@2x.png
                                    $(children[m]).find(".icon").html(`<img src="https://openweathermap.org/img/wn/${obtainedForecast.weather[0].icon}@2x.png">`);
                                }
                            }
                        }
                    }
                })

            }
        });

    });
});

console.log('cityName' , )