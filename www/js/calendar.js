var socket = io();

socket.on('calendar', function(msg){
    document.getElementById("calendar").innerHTML = msg;
    //setTimeout(reload, 60*60*1000);
});

function reloadCalendar(){
  socket.emit('calendarRefresh', '');
}

document.addEventListener('DOMContentLoaded', function() {
    reloadCalendar();
    setInterval(reloadCalendar, 60*30*1000);
});
