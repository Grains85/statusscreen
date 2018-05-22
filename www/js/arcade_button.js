var socket = io();

socket.on('buttonClicked', function(msg){
    document.location.reload(true);
});
