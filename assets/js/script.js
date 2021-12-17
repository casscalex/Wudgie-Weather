var redirectUri = "https://casscalex.github.io/Atmosphere/callback/"

var client_id = ""
var client_secret =""
// authorization
function requestAuthorization() {
  client_id = document.getElementById(clientId).value;
  client_secret = documetn.getElementById(clientSecret).value;
  localStorage.setItem("client_id", client_id)
  localStorage.setItem("client_secret", client_secret);

  let url = AUTHORIZE;
  url =+ "?client_id=" + client_id;
  url =+ "&response_type=code";
  url =+ "&redirect_uri=" + encodeURI(redirectUri)
  url =+ "&show_dialog=ture";
  url =+ "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position";
  window.location.href = url;

}
