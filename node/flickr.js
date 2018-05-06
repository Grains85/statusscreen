const fs = require('fs');

var Flickr = require("flickrapi");

module.exports = {
    getImage: function(callback) {

        fs.readFile('www/config/config.json', (err, settings) => {
            if (err) return console.log('Error loading client secret file:', err);

            var flickrOptions = JSON.parse(settings).flickr;

            Flickr.authenticate(flickrOptions, function(error, flickr) {
                if (error) {
                    console.log(error);
                    return;
                }
                //console.log("Flickr set up!!!! ");

                var start = new Date();
                start.setHours(0);
                start.setMinutes(0);
                start.setSeconds(0);
                start.setMilliseconds(0);
                start.setFullYear(start.getFullYear() - 1);

                var end = new Date();
                end.setHours(0);
                end.setMinutes(0);
                end.setSeconds(0);
                end.setMilliseconds(0);
                end.setFullYear(end.getFullYear() - 1);
                end.setDate(end.getDate() + 7);

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
                        console.log("No photos found...");
                    }
                });
            });
        });
    }
};
