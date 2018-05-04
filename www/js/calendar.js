var socket = io();
socket.on('calendar', function(msg){
    document.getElementById("calendar").innerHTML = msg;
    setTimeout(reload, 60*60*1000);
});

function reload(){
  socket.emit('calendarRefresh', '');
}
