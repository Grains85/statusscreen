const fs = require('fs');

var Flickr = require("flickrapi");

module.exports = {
    getImage: function(callback, date) {

        fs.readFile('www/config/config.json', (err, settings) => {
            if (err) return console.log('Error loading client secret file:', err);

            var flickrOptions = JSON.parse(settings).flickr;

            Flickr.authenticate(flickrOptions, function(error, flickr) {
                if (error) {
                    console.log(error);
                    return;
                }
                //console.log("Flickr set up!!!! ");

                var start;
                var end;
                // Date not given: Default: One year back
                if(!date){
                  start = getDate(-1,0);
                  end = getDate(-1,7);
                }
                else{
                  start = date;
                  end = new Date(date.getTime());
                  end.setDate(end.getDate() + 1);
                }
                //console.log("Start: " + start);
                //console.log("End: " + end);

                flickr.photos.search({
                    api_key: flickr.options.api_key,
                    user_id: flickr.options.user_id,
                    authenticated: true,
                    min_taken_date: start.getTime() / 1000,
                    max_taken_date: end.getTime() / 1000,
                    extras: 'date_taken',
                    per_page: 100
                }, function(err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    var photos = result.photos;
                    //console.log("Total photos: " + photos.total);
                    if (photos.total > 0) {
                        var index = Math.floor(Math.random() * (Math.min(photos.total, 100)));
                        //console.log("index: " + index);
                        var photo = photos.photo[index];
                        //if(!photo){
                        //    photo = photos.photo[0];
                        //  }
                        var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_z.jpg";
                        //console.log("First: " + url);

                        callback(url, photo.datetaken);
                        //debugger;
                    } else {
                        console.log("Flickr: No photos found..."+date.getFullYear());
                        callback(date,undefined);
                    }
                });
            });
        });
    }
};

function getDate(yearOffset, dayOffset){
  var date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  date.setFullYear(date.getFullYear() + yearOffset);
  date.setDate(date.getDate() + dayOffset);
  return date;
}
