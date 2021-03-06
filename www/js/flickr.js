var socket = io();

var map = new Map();
var counter = 0;

socket.on('flickr', function(msg){
    //msg += '<div class="date_taken" id="date_taken"/>';
    //document.getElementById("flickr").innerHTML = msg;
    //document.getElementById("flickr_text").innerHTML = msg;

//document.getElementById("statusBar").style.display = "block";
document.getElementById("statusBar").innerHTML = "Images received; "+msg;

    var date_taken = msg.shift();
    map.set(date_taken, msg);



    //addImages();


    //var date_taken = document.getElementById("flickrImg").alt;
    //document.getElementById("date_taken").innerHTML = date_taken;
    //setTimeout(reload, 60*60*1000);
});

function rotateImages(){

  document.getElementById("statusBar").style.display = "block";
  if(map.size === 0){
    document.getElementById("statusBar").innerHTML = "No map..."+counter;
    counter++;
    return;
  }

  document.getElementById("statusBar").style.display = "none";

  document.getElementById("container").innerHTML = "";

  //document.getElementById("container").innerHTML = "";
  //flex-item-clock
  for (var [date, images] of map) {
    //debugger;

    var year = date.split("-")[0];

    var li = document.createElement("li");
    li.style = "order: "+year;

    var img = document.createElement("img");

    var index = counter%images.length;
    img.src = images[index];


    var isStanding = img.height > img.width;
    if(isStanding){
      li.className = "flex-item-standing";
      img.className = "img-size-standing";
    }
    else{
      li.className = "flex-item-laying";
      img.className = "img-size-laying";
    }

    var progress = document.createElement("div");
    progress.id = "myProgress";
    var bar = document.createElement("div");
    bar.id = "myBar";
    progress.appendChild(bar);
    //progress.style = "border-style: solid;";

    var slideNr = document.createElement("div");
    slideNr.innerHTML = (index+1) + "/"+images.length;
    slideNr.className = "slideNr";

    var text = document.createElement("div");
    text.innerHTML = year;
    text.style = "margin-top: -20px;";

    var main = document.createElement("div");
    //main.className = "flex-item-standing";
    main.appendChild(img);
    main.appendChild(progress);
    main.appendChild(slideNr);
    main.appendChild(text);

    li.appendChild(main);

  //  document.getElementById("statusBar").innerHTML = "Appening image: "+year+", "+counter;
    document.getElementById("container").appendChild(li);
//debugger;
    if(images.length > 1){
      move(bar);
    }
    //var img = "<li class='flex-item'><img class='flex-item-standing' src="+images[0]+"></li>";
    //document.getElementById("container").appendChild(img);
  }
  if(counter > 1000){
    counter = 0;
  }
  else{
    counter++;
  }
  //move();
}

// Update date
function reloadFlickr(){
  map.clear();
  socket.emit('flickrRefresh', '');
document.getElementById("statusBar").style.display = "block";
document.getElementById("statusBar").innerHTML = "flickr images requested..";
}

function move(bar) {
    //var elem = bar;//document.getElementById("myBar");
    var width = 1;
    var id = setInterval(function() { frame(bar); }, 100);
    function frame(bar) {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            bar.style.width = width + '%';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    reloadFlickr();
//setInterval(reloadFlickr, 30*60*1000);
    //setInterval(reloadFlickr, 24*60*60*1000); // Sidan laddas om dygnsvis redan
    setInterval(rotateImages, 10*1000);
//setTimeout(reloadFlickr, 10*1000);
//setInterval(reloadFlickr, 10*1000);
});
