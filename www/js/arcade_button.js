var socket = io();
var video = document.getElementById("myVideo");

socket.on('buttonClicked', function(msg){
    document.getElementById("overlay").style.display = "block";
    video.play();
    setTimeout(stop, 60*1000);
});

function stop(){
  video.pause();
  document.getElementById("overlay").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {

});
