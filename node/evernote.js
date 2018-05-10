var callbackUrl = "http://localhost:3000/oauth_callback"; // your endpoint

// initialize OAuth
var Evernote = require('evernote');
var client = new Evernote.Client({
  consumerKey: 'grains',
  consumerSecret: 'a76f0b58fcb27d43',
  sandbox: true, // change to false when you are ready to switch to production
  china: false, // change to true if you wish to connect to YXBJ - most of you won't
});



  // store your token here somewhere - for this example we use req.session
  //oauthToken = oToken;
  //oauthTokenSecret = oTokenSecret;
  //res.redirect(client.getAuthorizeUrl(oTokenSecret)); // send the user to Evernote


// at callbackUrl - "http://localhost:3000/oauth_callback" in our example. User sent here after Evernote auth
/**
var client = new Evernote.Client({
  consumerKey: 'grains',
  consumerSecret: 'a76f0b58fcb27d43',
  sandbox: true,
  china: false,
});
*/

module.exports = {
  getNotes: function(callback) {

client.getRequestToken(callbackUrl, function(error, oauthToken, oauthTokenSecret) {
  if (error) {
    console.log("Error1: Evernote: "+error.toString());
    return;
  }

console.log("Evernote token: "+oauthToken);
console.log("Evernote tokenSecret: "+oauthTokenSecret);
client.getAccessToken(oauthToken,
  oauthTokenSecret,
function(error, oToken, oTokenSecret, results) {
  if (error) {
    console.log("Error2: Evernote: "+error.toString());
    return;
  }

    // oauthAccessToken is the token you need;
    var authenticatedClient = new Evernote.Client({
      token: oauthToken,
      sandbox: true,
      china: false,
    });
    var noteStore = authenticatedClient.getNoteStore();
    console.log("!!!!!!!!!"+noteStore);
    noteStore.listNotebooks().then(function(notebooks) {
      console.log(notebooks); // the user's notebooks!
    });
});
});
}
};
