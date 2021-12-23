var button = document.querySelector('.submit');
var input = document.querySelector('.search_input');
var city = document.querySelector('.city');
var state = document.querySelector('.state');
var cond = document.querySelector('.cond');
var temp_f = document.querySelector('.temp');


button.addEventListener('click', function(){
fetch('https://api.weatherapi.com/v1/current.json?key=75fddf772d5247e68e714612211512&q='+input.value+'&aqi=no')
.then(response => response.json())
.then(data => {
    var cityValue = data['location']['name'];
    var stateValue = data['location']['region'];
    var tempValue = data['current']['temp_f'];
    var condValue = data['current']['condition']['text'];
    city.innerHTML = cityValue+', ';
    state.innerHTML = stateValue;
    temp_f.innerHTML = tempValue;
    cond.innerHTML = condValue;
    input.value = "";
})

})