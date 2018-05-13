function reloadNest(){
  document.getElementById('nest_back').src = document.getElementById('nest_back').src
}

document.addEventListener('DOMContentLoaded', function() {
    setInterval(reloadNest, 60*60*1000);
});
