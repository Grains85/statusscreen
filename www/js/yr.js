/**
var socket = io();

socket.on('weather', function(msg){
    document.getElementById("weather").innerHTML = msg+"°C";
    //setTimeout(reload, 60*60*1000);
});

function reloadWeather(){
  socket.emit('weatherRefresh', '');
}

document.addEventListener('DOMContentLoaded', function() {
    reloadWeather();
    setInterval(reloadWeather, 60*30*1000);
});
