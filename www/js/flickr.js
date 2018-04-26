document.addEventListener('DOMContentLoaded', function() {
  console.log("!Flickr 1!!!!");
  initFlickr();
});

var flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "0331815b12e05f3a93849ac499681834",
      secret: "11594bc956dc61e8"
    };


function initFlickr(){
  flickr.authenticate(flickrOptions, function(error, flickr) {
    if(error){
      console.log(err);
      return;
    }

    flickr.photos.search({
        user_id: flickr.options.user_id,
        page: 1,
        per_page: 500
      }, function(err, result) {
        if(err){
          console.log(err);
          return;
        }
        console.log(result);
      });
    });
}
