const lat = 58.7984;
const lng = 17.8081;
const params = 'windSpeed';

fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
  headers: {
    'Authorization': 'f04e4b50-62ac-11ec-8266-0242ac130002-f04e4c18-62ac-11ec-8266-0242ac130002'
  }
}).then((response) => response.json()).then((jsonData) => {
  // Do something with response data.
  consoleLog(jsonData);
});