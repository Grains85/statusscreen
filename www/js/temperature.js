var socket = io();

socket.on('tempOut', function(msg){
    document.getElementById("tempOut").innerHTML = "Ute: "+msg+"°C";
});

socket.on('tempIn', function(msg){
    document.getElementById("tempIn").innerHTML = "Inne: "+msg+"°C";
});

function reloadTemperature(){
  socket.emit('temperatureOutdoor', '');
  socket.emit('temperatureIndoor', '');
}

document.addEventListener('DOMContentLoaded', function() {
    reloadTemperature();
    setInterval(reloadTemperature, 60*1000);
});
