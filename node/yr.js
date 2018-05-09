/**document.addEventListener('DOMContentLoaded', function() {
    runYr();
    setInterval(runYr, 60 * 60 * 1000);
});
*/
var fs = require('fs');
var parser = require('xml2json');
//var parser = require('xml2json');

module.exports = {
    getWeather: function(callback) {
        fs.readFile('www/config/config.json', (err, allText) => {
            if (err) return console.log('Yr: Error loading config file:', err);
            console.log("allText: ", allText);
            var config = JSON.parse(allText);

            var yrUrl = config.yr.url;
            console.log("yrUrl: ", yrUrl);

            var request = require('request');
            request.get(yrUrl, function(err, response, body) {
                if (err) {
                    console.log("YR ERROR: ", err);
                }
                if (response.statusCode == 200) {
                  var jsonStr = parser.toJson(body);
                  var json = JSON.parse(jsonStr);
                  var times = json.weatherdata.forecast.tabular.time;
                  var temp = times[0].temperature.value;

                  console.log("YR: ", temp);
                  callback(temp);
                }
            });
        });
    }
}
