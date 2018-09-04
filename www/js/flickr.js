var socket = io();

var map = new Map();
var counter = 0;

socket.on('flickr', function(msg){
    //msg += '<div class="date_taken" id="date_taken"/>';
    //document.getElementById("flickr").innerHTML = msg;
    //document.getElementById("flickr_text").innerHTML = msg;

    var date_taken = msg.shift();
    map.set(date_taken, msg);

    //addImages();


    //var date_taken = document.getElementById("flickrImg").alt;
    //document.getElementById("date_taken").innerHTML = date_taken;
    //setTimeout(reload, 60*60*1000);
});

function rotateImages(){
  if(map.size === 0){
    return;
  }
  document.getElementById("container").innerHTML = "";

  //document.getElementById("container").innerHTML = "";
  //flex-item-clock
  for (var [date, images] of map) {
    //debugger;

    var year = date.split("-")[0];

    var li = document.createElement("li");
    li.className = "flex-item";
    li.style = "order: "+year;

    var img = document.createElement("img");
    img.className = "flex-item-standing";
    var index = counter%images.length;
    img.src = images[index];
    li.appendChild(img);

    document.getElementById("container").appendChild(li);
    //var img = "<li class='flex-item'><img class='flex-item-standing' src="+images[0]+"></li>";
    //document.getElementById("container").appendChild(img);
  }
  if(counter > 1000){
    counter = 0;
  }
  else{
    counter++;
  }
}

// Update date
function reloadFlickr(){
  map.clear();
  socket.emit('flickrRefresh', '');
}

document.addEventListener('DOMContentLoaded', function() {
    reloadFlickr();
    //setInterval(reloadFlickr, 30*60*1000);
    setInterval(reloadFlickr, 24*60*60*1000);
    setInterval(rotateImages, 10*1000);
    //setInterval(reloadFlickr, 10*1000);
});
