var socket = io();

socket.on('flickr', function(msg){
    document.getElementById("flickr").innerHTML = msg;
    setTimeout(reload, 60*60*1000);
});

function reload(){
  socket.emit('flickrRefresh', '');
}
