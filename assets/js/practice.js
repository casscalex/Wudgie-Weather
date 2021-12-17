let key = '75fddf772d5247e68e714612211512';

searchForm.addEventListener('submit', submitSearch);

var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');

button.addEventListener('click', function(name){
fetch('https://api.weatherapi.com/v1/forecast.json?key=75fddf772d5247e68e714612211512&q='+input.value+'&days=1&aqi=no&alerts=no')
.then(response => response.json())
.then(data => {
  var tempValue = data['main']['temp'];
  var nameValue = data['name'];
  var descValue = data['weather'][0]['description'];

  main.innerHTML = nameValue;
  desc.innerHTML = "Desc - "+descValue;
  temp.innerHTML = "Temp - "+tempValue;
  input.value ="";

})

.catch(err => alert("Wrong city name!"));
})




// function() {

//     $('.weather-temperature').openWeather({
//         key: '75fddf772d5247e68e714612211512',
//         city: 'Los Angeles',
//         descriptionTarget: '.weather-description',
//         windSpeedTarget: '.weather-wind-speed',
//         minTemperatureTarget: '.weather-min-temperature',
//         maxTemperatureTarget: '.weather-max-temperature',
//         humidityTarget: '.weather-humidity',
//         sunriseTarget: '.weather-sunrise',
//         sunsetTarget: '.weather-sunset',
//         placeTarget: '.weather-place',
//         iconTarget: '.weather-icon',
//         customIcons: '../src/img/icons/weather/',
//         success: function(data) {
//             // show weather
//             $('.weather-wrapper').show();
//             console.log(data);
//         },
//         error: function(data) {
//             console.log(data.error);
//             $('.weather-wrapper').remove();
//         }
//     });

// });


// {
//     "location": {
//         "name": "London",
//         "region": "City of London, Greater London",
//         "country": "United Kingdom",
//         "lat": 51.52,
//         "lon": -0.11,
//         "tz_id": "Europe/London",
//         "localtime_epoch": 1639532979,
//         "localtime": "2021-12-15 1:49"
//     },
//     "current": {
//         "last_updated_epoch": 1639532700,
//         "last_updated": "2021-12-15 01:45",
//         "temp_c": 11.0,
//         "temp_f": 51.8,
//         "is_day": 0,
//         "condition": {
//             "text": "Partly cloudy",
//             "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
//             "code": 1003
//         },
//         "wind_mph": 9.4,
//         "wind_kph": 15.1,
//         "wind_degree": 220,
//         "wind_dir": "SW",
//         "pressure_mb": 1028.0,
//         "pressure_in": 30.36,
//         "precip_mm": 0.0,
//         "precip_in": 0.0,
//         "humidity": 87,
//         "cloud": 75,
//         "feelslike_c": 9.5,
//         "feelslike_f": 49.2,
//         "vis_km": 10.0,
//         "vis_miles": 6.0,
//         "uv": 1.0,
//         "gust_mph": 12.8,
//         "gust_kph": 20.5
//     }
// }