var search = function(){
    console.log("in secrch");

    $("#searchBtn").on("click", function(){
        alert("click");
        var text = $("#zipcode").val();
        console.log(text);
        var apiUrl = "https://api.weatherapi.com/v1/current.json?key=eaaac1acb7a04000a8c201133211112&q=" + text + "&aqi=no";
        var response = fetch(apiUrl)
        .then(function(response) {
                response.json().then(function(data) {
                console.log(data.location.name);    
                console.log(data.current.condition.text);
            });
        });
        
    });


};


search();

