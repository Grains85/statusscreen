setInterval(reload, 30*60*1000);

var socket = io();

socket.on('flickr', function(msg){
    msg += '<div class="date_taken" id="date_taken"/>';
    document.getElementById("flickr").innerHTML = msg;
    var date_taken = document.getElementById("flickrImg").alt;
    document.getElementById("date_taken").innerHTML = date_taken;
    //setTimeout(reload, 60*60*1000);
});

function reload(){
  socket.emit('flickrRefresh', '');
}
