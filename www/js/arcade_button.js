var socket = io();

socket.on('buttonClicked', function(msg){
    play();
});

function play(){
  document.getElementById("babblarna").play();
  document.getElementById("overlay").style.display = "block";
  setTimeout(stop, 60*1000);
}

function stop(){
  document.getElementById("babblarna").pause();
  document.getElementById("overlay").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("babblarna").loop = true;
  play();
});
