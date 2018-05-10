var socket = io();

socket.on('evernote', function(msg){
    document.getElementById("evernote").innerHTML = msg;
});

function reloadEvernote(){
  socket.emit('evernoteRefresh', '');
}

document.addEventListener('DOMContentLoaded', function() {
    reloadEvernote();
    setInterval(reloadEvernote, 60*30*1000);
});
