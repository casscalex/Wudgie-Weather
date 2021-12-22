var button = document.querySelector(".submit");
var input = document.querySelector(".search_input");
var city = document.querySelector(".city");
var state = document.querySelector(".state");
var cond = document.querySelector(".cond");
var temp_f = document.querySelector(".temp");
var card = document.querySelector(".card")

button.addEventListener("click", function () {
  fetch(
    "https://api.weatherapi.com/v1/current.json?key=75fddf772d5247e68e714612211512&q=" +
      input.value +
      "&aqi=no"
  )
    .then((response) => response.json())
    .then((data) => {
      var cityValue = data["location"]["name"];
      var stateValue = data["location"]["region"];
      var tempValue = data["current"]["temp_f"];
      var condValue = data["current"]["condition"]["text"];
      city.innerHTML = cityValue + ", ";
      state.innerHTML = stateValue;
      temp_f.innerHTML = tempValue;
      cond.innerHTML = condValue;
      input.value = "";
    });
  async function showWeather() {
    weatherResponse = await fetch(
      "https://api.weatherapi.com/v1/current.json?key=75fddf772d5247e68e714612211512&q=" +
        input.value +
        "&aqi=no"
    );
    weatherData = await weatherResponse.json();
    let lat = weatherData.location.lat;
    let lon = weatherData.location.lon;
    const params = 'waveHeight,swellHeight'

    surfResponse = await fetch(
      `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lon}&params=${params}&start=1640433600&end=1640433600
      `,
      {
        headers: {
          Authorization: "4c238208-62a1-11ec-8990-0242ac130002-4c238280-62a1-11ec-8990-0242ac130002",
        },
      }
    );
    surfData = await surfResponse.json();
    console.log(surfData)
    let swellHeightM = surfData.hours[0].swellHeight.meteo*3.2808
    let swellHeightF = "The swell will be: " + swellHeightM.toFixed(2) + "ft"
    let waveHeightM =  surfData.hours[0].waveHeight.meteo*3.2808
    let waveHeightF = "The wave height will be: " + waveHeightM.toFixed(2) + "ft"
    console.log(waveHeightF)
    var newDiv = document.createElement("div");
    newDiv.innerHTML = "<p>" + swellHeightF + "</p>" + "</br>" + "<p>" + waveHeightF + "</p>"
    newDiv.classList.add("card")
    document.body.appendChild(newDiv)

  }
  showWeather();
});
