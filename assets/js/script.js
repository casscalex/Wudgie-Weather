var button = document.querySelector('.submit');
var input = document.querySelector('.search_input');
var city = document.querySelector('.city');
var state = document.querySelector('.state');
var cond = document.querySelector('.cond');
var temp_f = document.querySelector('.temp');

var header = $('body');

// var backgrounds = new Array(
//     'url(https://images.unsplash.com/photo-1559627755-42212e5c5fdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)'
//   , 'url(https://images.unsplash.com/photo-1520443240718-fce21901db79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2187&q=80)'
//   , 'url(https://images.unsplash.com/photo-1520845071703-ee5ef9e42aca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2187&q=80)'
//   , 'url(https://images.unsplash.com/photo-1523606772308-64a28db0ef2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2264&q=80)'
// );

// var current = 0;

// function nextBackground() {
//     current++;
//     current = current % backgrounds.length;
//     header.css('background-image', backgrounds[current]);
// }
// setInterval(nextBackground, 100);

// header.css('background-image', backgrounds[0]);

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