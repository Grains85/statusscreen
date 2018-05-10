var socket = io();

socket.on('calendar', function(msg){
    document.getElementById("calendar").innerHTML = msg;
    //setTimeout(reload, 60*60*1000);
});

function reloadCalendar(){
  //alert("reloadCalendar!");
  socket.emit('calendarRefresh1', '');
}

document.addEventListener('DOMContentLoaded', function() {
    reloadCalendar();
    setInterval(reloadCalendar, 60*30*1000);
});
