document.addEventListener('DOMContentLoaded', function() {
  initVasttrafik(true);
});

var vasttrafikToken = "";
var config = "";

function runVasttrafik() {

  // For todays date;
  Date.prototype.today = function() {
    return (this.getFullYear() + "-" + (((this.getMonth() + 1) < 10)
      ? "0"
      : "") + (this.getMonth() + 1) + "-" + ((this.getDate() < 10)
      ? "0"
      : "") + this.getDate());
  }

  // For the time now
  Date.prototype.timeNow = function() {
    return ((this.getHours() < 10)
      ? "0"
      : "") + this.getHours() + "%3A" + ((this.getMinutes() < 10)
      ? "0"
      : "") + this.getMinutes();
  }

  var newDate = new Date();
  var station = config.vasttrafik.parameters.station_id;
  var timeSpan = config.vasttrafik.parameters.timeSpan;
  var maxDeparturesPerLine = config.vasttrafik.parameters.maxDeparturesPerLine;
  var vasttrafikUrl = 'https://api.vasttrafik.se/bin/rest.exe/v2/departureBoard?id=' + station + '&date=' + newDate.today() + '&time=' + newDate.timeNow() + '&timeSpan=' + timeSpan + '&maxDeparturesPerLine=' + maxDeparturesPerLine;
  console.log(vasttrafikUrl);
debugger;
  //var reload = function () {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    //debugger;
    if (req.status == 401) {
      initVasttrafik(false);
      return;
    }
    if (req.readyState == 4 && req.status == 200) {
      var xmlDoc = req.responseXML;
      var txt = "";
      var departures = xmlDoc.childNodes[0].getElementsByTagName("Departure");
      for (i = 0; i < departures.length; i++) {
        var departure = departures[i];
        txt += '<div class=bussRow>';
        txt += '<div class=bussLine>' + departure.getAttribute('sname') + '</div>';
        txt += '<div class=bussName>' + departure.getAttribute('direction') + '</div>';
        //           if (departure.getAttribute('rtTime')) {
        //                txt += '<div class=bussTime>' + departure.getAttribute('rtTime');
        //                 if (departure.getAttribute('rtTime') != departure.getAttribute('time')) {
        //                      txt += "*";
        //                   }
        //                    txt += "</div>";
        //} else {
        txt += '<div class=bussTime>' + departure.getAttribute('time') + '</div>';
        txt += '</div>';
        //}
      }
      document.getElementById('vasttrafik').innerHTML = txt;
      //alert(txt);
    }
  };
  req.open('get', vasttrafikUrl, true);
  req.setRequestHeader("Authorization", vasttrafikToken);
  req.send();

  /**
                document.addEventListener('DOMContentLoaded', function () {
                    // Reload images from server every minute
                    reload();
                    setInterval(function() {
                        reload();
                    }, 60000);

                });
                */
}

function initVasttrafik(isStart) {

  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", "config/config.json", false);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        var conf = JSON.parse(allText);

        var authReq = new XMLHttpRequest();
        authReq.onreadystatechange = function() {
          //debugger;
          if (authReq.readyState == 4 && authReq.status == 200) {
            var result = JSON.parse(authReq.responseText);
            vasttrafikToken = "Bearer " + result.access_token;
            config = conf;
            if (isStart) {
              runVasttrafik();
            }
          }
        }
        authReq.open('post', 'https://api.vasttrafik.se:443/token', true);
        authReq.setRequestHeader("Authorization", conf.vasttrafik.credentials.authorization); //"Basic TVduY3k3cmZGNUEwSE1scEpnSmREcVlxZ19ZYTo1TEpaQlJMZnVIYmZpZFluUURuUFd1ZTA5a1Fh");
        authReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        authReq.send('grant_type=client_credentials');
      }
    }
  }
  rawFile.send(null);
}
