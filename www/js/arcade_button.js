var socket = io();

socket.on('buttonClicked', function(msg){
    play();
});

function play(){
  var vid = document.getElementById("babblarna")
  if(vid.currentTime == 0 || vid.paused){
    vid.play();
    document.getElementById("overlay").style.display = "block";
    setTimeout(stop, 60*1000);
  }
}

function stop(){
  document.getElementById("babblarna").pause();
  document.getElementById("overlay").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("babblarna").loop = true;
  //play();
});
