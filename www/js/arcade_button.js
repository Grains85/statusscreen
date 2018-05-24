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

    var currentdate = new Date();
    setStatus("Playing video! (second: "+currentdate.getSeconds()+")");
  }
  else{
    //setStatus("Not playing video: Pause="+vid.paused);
    document.location.reload(true);
    setStatus("Video playing: Reload page");
  }
}

function stop(){
  document.getElementById("babblarna").pause();
  document.getElementById("overlay").style.display = "none";
}

function setStatus(msg){
  document.getElementById("statusBar").style.display = "block";
  document.getElementById("statusBar").innerHTML = msg;
  setTimeout(hideStatus, 5*1000);
}

function hideStatus(){
  document.getElementById("statusBar").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("babblarna").loop = true;

  var vid = document.getElementById("myVideo");
  vid.onerror = function() {
    alert("Error: Video onerror triggered!");
  };
  vid.onstalled = function() {
    alert("Error: Video onstalled triggered!");
  };
  vid.onsuspend = function() {
    alert("Error: Video onsuspend triggered!");
  };

  //play();
});
