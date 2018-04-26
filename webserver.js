var port = 9800;
var serverUrl = "127.0.0.1";

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var http = require("http");
var path = require("path");
var fs = require("fs");
var url = require('url');
var checkMimeType = false;
var calendar = require('./node/calendar');
var flickr = require('./node/flickr');
const sortMap = require('sort-map')

console.log("Starting web server at " + serverUrl + ":" + port);

var calPage = "";
var flickrPage = "";

function setFlickrPage(content) {
  content += "<img src="+content+">";
  flickrPage = content;
}

function setCalendarPage(content) {
    var eventsArr = content.split("\n");
    var map = new Map();

    for(var i=0; i<eventsArr.length; i++){
      var eventArr = eventsArr[i].split(";");
      var date = eventArr[0];
      if(!date){
        continue;
      }
      var time = eventArr[1];
      var title = eventArr[2];

      var rows = [];
      if(map.has(date)){
        rows = map.get(date);
      }
      rows.push(time+";"+title);
      map.set(date, rows);
    }

    const sortedMap = sortMap(map)
    Array.from(sortedMap.keys())

    var result = "<table cellspacing='0' class='te_table'><tr><td class='te_columnHeaders'>";
    result += "tid";
    result += "</td><td class='te_columnHeaders'>";
    result += "händelse";
    result += "</td></tr>";
    for (let [k, v] of sortedMap) {
      result += "<tr><td colspan='2' class='te_dateRow'>";
      result += k;
      result += "</td></tr>";
      v.sort();
      for(var i=0; i<v.length; i++){
        var row = v[i].split(";");
        result += "<tr><td class='te_time'>";
        result += row[0];
        result += "</td><td class='te_content'>";
        result += row[1];
        result += "</td></tr>";
      }
    }
    result += "</table>";
    calPage = result;
    //console.log("Setting calendar content: " + calPage);
}

http.createServer(function(req, res) {
    var request = req;
    var filename = req.url;
    //console.log("====================");
    //console.log(filename);
    if (filename == '/') {
        filename = "/index.html";
    }
    sendFile(filename, res);

}).listen(port, serverUrl);

function getMimeType(filename) {
    var ext = path.extname(filename);

    var validExtensions = {
        ".html": "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
        ".txt": "text/plain",
        ".jpg": "image/jpeg",
        ".gif": "image/gif",
        ".png": "image/png",
        ".woff": "application/font-woff",
        ".woff2": "application/font-woff2"
    };
    return validExtensions[ext];
}

function sendFile(filename, res) {
    var localPath = __dirname;
    localPath += ("/www" + filename);
    fs.exists(localPath, function(exists) {
        if (exists) {
            let mimeType = getMimeType(filename);
            getFile(localPath, res, mimeType);
        } else {
            console.log("File not found: " + localPath);
            res.writeHead(404);
            res.end();
        }
    });
}

function getFile(localPath, res, mimeType) {
    fs.readFile(localPath, function(err, contents) {
        if (!err) {

            if (mimeType != undefined) {
                res.setHeader("Content-Type", mimeType);
            }
            res.statusCode = 200;

            if (localPath.includes("flickr.html")) {
              flickr.getImage(setFlickrPage);
              var flickrContent = getHtmlPage(flickrPage);
              res.setHeader("Content-Length", flickrContent.length);
              res.end(flickrContent);
            }
            else if (localPath.includes("calendar.html")) {
                calendar.getEvents(setCalendarPage);
                var calContent = getHtmlPage(calPage);
                res.setHeader("Content-Length", calContent.length);
                res.end(calContent);
            } else {
                res.setHeader("Content-Length", contents.length);
                res.end(contents);
            }
        } else {
            res.writeHead(500);
            res.end();
        }
    });

    function getHtmlPage(text) {
        var html = '<html><head>';
        html += '<meta charset="UTF-8">';
        html += '<title></title>';
        html += '<link rel="stylesheet" type="text/css" href="css/index.css"/>';
        html += '</head>';
        html += '<body>';
        html += text;
        html += '</body>';
        html += '</html>';
        return html;
    }
}
