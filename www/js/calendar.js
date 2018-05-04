var socket = io();
socket.on('calendar', function(msg){
    document.getElementById("calendar").innerHTML = msg;
});
