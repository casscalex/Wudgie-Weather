var cityForecastEl = document.querySelector("#cityForecast");
var cityHistory = document.querySelector("#cityHistory");
var citySearch = document.querySelector("#city-search");
var cityInput = document.querySelector("#city");
var searchBtnEL = document.querySelector("#searchBtn");
var savedCitySearch = JSON.parse(localStorage.getItem("cities")) ?? [];

function citySearchFunc(event){
    event.preventDefault();
    var cityNameSearch = cityInput.value.trim();
    if(cityNameSearch){
        cityWeatherData(cityNameSearch);
    }
};


function cityWeatherData(cityNameSearch){
    cityForecastEl.textContent = "";
    cityInput.value = "";

    var currentDay = "https://api.openweathermap.org/data/2.5/weather?q=" 
    + cityNameSearch + "&units=imperial" + "&appid=" + "9748a7662a4a49b6eb42998ba0359300";

    fetch(currentDay).then(function(response){
        if(response.ok){
            response.json().then(function(response){
                let lon = response.coord.lon;
                let lat = response.coord.lat;

                var FiveDay = "https://api.openweathermap.org/data/2.5/onecall?lat=" 
                + lat + "&lon=" + lon + "&exclude=hourly&units=imperial&appid=" + "9748a7662a4a49b6eb42998ba0359300";

                fetch(FiveDay).then(function(nextResponse){
                    if(nextResponse.ok){
                        nextResponse.json().then(function(nextResponse){
                            Promise.all([response, nextResponse]).then(function(values){
                                showWeather(values);
                            })
                        })
                    }
                })
            })
        }
    })
}

function showWeather(data){
    cityForecastEl.classList.add("card");
    let city =
    {
        cityName: data[0].name,
        temperature: data[0].main.temp,
        windSpeed: data[0].wind.speed,
        humidity: data[0].main.humidity,
        uvIndex: data[1].current.uvi,
        cloudInfo: data[0].weather[0].description,
        weatherIcon: data[0].weather[0].icon
    };

    if(!savedCitySearch.includes(city.cityName)){
        savedCitySearch.push(city.cityName);
        localStorage.setItem("cities", JSON.stringify(savedCitySearch));

        searchCityHistory(city.cityName);
    }

    var currentDay = getTheDay(data, 0, 1);
    currentDayStr = currentDay.toString();
    
    var cityNameH3 = document.createElement("h3");
    cityNameH3.textContent = city.cityName + ": (" + currentDayStr + ")";
    cityForecastEl.appendChild(cityNameH3);

    var weatherIconsURL = "http://openweathermap.org/img/wn/" + city.weatherIcon + ".png";
    var weatherIconCurr = document.createElement("img");
    weatherIconCurr.className = "icon";
    weatherIconCurr.setAttribute("src", weatherIconsURL);
    cityForecastEl.appendChild(weatherIconCurr);

    var weatherUl = document.createElement("ul");
    cityForecastEl.appendChild(weatherUl);

    var tempLi = document.createElement("li");
    var windLi = document.createElement("li");
    var humiLi = document.createElement("li");
    var uvLi = document.createElement("li");

    tempLi.innerHTML = "Temperature: "+ city.temperature + "℉";
    windLi.textContent = "Wind: "+city.windSpeed + "mph";
    humiLi.textContent = "Humidity: "+city.humidity + "%";
    uvLi.textContent = "UV index: "+city.uvIndex;

    weatherUl.appendChild(tempLi);
    weatherUl.appendChild(windLi);
    weatherUl.appendChild(humiLi);
    weatherUl.appendChild(uvLi);

    var fiveDayH3 = document.querySelector("#fiveDay");
    fiveDayH3.innerHTML = "<h2>5-Day Forecast:<h3><div class='fiveDayCont row justify-space-between'>";
    var fiveDayCont = document.querySelector(".fiveDayCont");


    for(var i = 1; i < 6; i++){
        var div = document.createElement("div");
        div.className = "card";
        div.classList.add("fiveDay")

        var dayDate = getTheDay(data, i, 0);
        dayDateStr = dayDate.toString();

        var dayIcon = data[1].daily[i].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + dayIcon + ".png";
        var iconEl = document.createElement("img");
        iconEl.className = "icon";
        iconEl.setAttribute("src", iconUrl);

        var dayDate = document.createElement("h3");
        dayDate.textContent = dayDateStr;
        div.appendChild(dayDate);
        div.appendChild(iconEl);

        var fiveDayList = document.createElement("ul");
        var fiveDayTemp = document.createElement("li");
        var fiveDayWind = document.createElement("li");
        var fiveDayHumid = document.createElement("li");

        fiveDayTemp.textContent = "Temp: " + data[1].daily[i].temp.day + "℉";
        fiveDayWind.textContent = "Wind: " + data[1].daily[i].wind_speed + " MPH";
        fiveDayHumid.textContent = "Humidity " + data[1].daily[i].humidity + "%";

        fiveDayList.appendChild(fiveDayTemp);
        fiveDayList.appendChild(fiveDayWind);
        fiveDayList.appendChild(fiveDayHumid);
        div.appendChild(fiveDayList);

        fiveDayCont.appendChild(div);
    }
};

function getTheDay(data, i, currOrDaily){

    if(currOrDaily === 1){
        // it is the current weather date
        var infoTime = data[0].dt;
    }
    else{ //it is the daily weather date
        var infoTime = data[1].daily[i].dt;
    }

    // converts the date received for readability
    var theDate = new Date(infoTime * 1000);
    const months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    var theMonth = months[theDate.getMonth()];
    var theDay = theDate.getDate();
    var theYear = theDate.getFullYear();

    var theFullDate = theMonth + "/" + theDay + "/" + theYear;

    return theFullDate;
};

function searchCityHistory(cityName){
    let searchBtn = document.createElement("button");
    searchBtn.setAttribute("data-city", cityName);
    searchBtn.setAttribute("onclick", "cityWeatherData('" + cityName + "')");
    searchBtn.className = "cityBtn";
    searchBtn.textContent = cityName;
    cityHistory.appendChild(searchBtn);

}

window.addEventListener('load', (event) => {
    for(var i = 0; i < savedCitySearch.length; i++){
        searchCityHistory(savedCitySearch[i]);
    }
});

citySearch.addEventListener("submit", citySearchFunc);
