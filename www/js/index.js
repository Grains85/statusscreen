var oneDay = 86400000;

document.addEventListener('DOMContentLoaded', function() {
  var now = new Date();
  var millisTill05 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 5, 0, 0, 0) - now;
  if (millisTill05 < 0) {
       millisTill05 += oneDay;
  }
  setTimeout(initReload, millisTill05);
});

function initReload(){
  reloadPage();
  setInterval(reloadPage, oneDay);
}

function reloadPage() {
    document.location.reload(true);
}
