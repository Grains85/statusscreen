/**
 * @license
 * Copyright Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// [START quickstart]
const fs = require('fs');
const mkdirp = require('mkdirp');
const readline = require('readline');
const {google} = require('googleapis');
const OAuth2Client = google.auth.OAuth2;
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = 'extra/google_credentials.json';

var config;

// Load client secrets from a local file.
module.exports = {
  getEvents: function(callback) {
    fs.readFile('www/config/config.json', (err, content) => {
      if (err)
        return console.log('Error loading client secret file:', err);

      // Authorize a client with credentials, then call the Google Drive API.
      config = JSON.parse(content);
      return authorize(config.google.client_secret, callback);
    });
  }
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err)
      return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    return listAllEvents(oAuth2Client, callback);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({access_type: 'offline', scope: SCOPES});
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({input: process.stdin, output: process.stdout});
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return callback(err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err)
          console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
/**
function listEvents(auth, callback) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, {data}) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = data.items;
    if (events.length) {
      result = "";
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
        result += `${start} - ${event.summary} <br>`;
      });
      callback(result);
    } else {
      console.log('No upcoming events found.');
    }
  });
  */

function listAllEvents(auth, callback) {
  const api = google.calendar({version: 'v3', auth});
  //moment().tz("America/Los_Angeles").format();
  api.calendarList.list({
    'maxResults': '100'
  }, (err, {data}) => {
    if (err) {
      return console.log('The API returned an error: ' + err);
    }

    var calendars = data.items;
    //console.log("Numer of calendars: "+calendars.length);
    var result = "";
    for (i = 0; i < calendars.length; i++) {
      var calendar = calendars[i];
      var summary = calendar.summary;

      //console.log("calendarId: "+calendar.id);
      var subStrArr = config.google.parameters.subStringCalendars;
      var found = false;
      subStrArr.forEach(function(e){
        if (summary.includes(e)) {
          found = true;
        }
      });
      if (!found)
        continue;

      var calendarId = calendar.id;

      var startTime = new Date();
      startTime.setMilliseconds(0);
      startTime.setSeconds(0);
      startTime.setMinutes(0);
      startTime.setHours(0);

      var endTime = new Date();
      endTime.setMilliseconds(0);
      endTime.setSeconds(0);
      endTime.setMinutes(0);
      endTime.setHours(0);
      endTime.setDate(endTime.getDate() + config.google.parameters.nrOfDays);

      api.events.list({
        'calendarId': calendarId,
        'timeMin': startTime.toISOString(),
        'timeMax': endTime.toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': config.google.parameters.maxNrOfEvents,
        'orderBy': 'startTime'
      }, (err, {data}) => {
        if (err) {
          return console.log('The API returned an error: ' + err);
        }
        var events = data.items;
        if (events.length > 0) {
          events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            const end = event.end.dateTime || event.end.date;

            // 2018-04-02T17:00:00+02:00
            //console.log(start);
            var dateString = getDateString(start, end);

            //console.log(dateString + ";" + event.summary);
            result += dateString + ";" + event.summary + "\n";
          });

          // TODO: Improve: Needs to be runned when call is finished. Relace with emit?
          callback(result);
        }
      });
    }
  });
}

// 2018-04-02T17:00:00+02:00
function getDateString(startDateTime, endDateTime) {
  var startStr = getDateStringHelper(startDateTime, false);
  var endStr = getDateStringHelper(endDateTime, true);
  return startStr + "-" + endStr;
}

function getDateStringHelper(dateTime, onlyTime) {
  var year = dateTime.substring(0, 4);
  //console.log("year: "+year);
  var month = dateTime.substring(5, 7);
  //console.log("month: "+month);
  var date = dateTime.substring(8, 10);
  //console.log("date: "+date);
  var hour = dateTime.substring(11, 13);
  //console.log("hour: "+hour);
  var minute = dateTime.substring(14, 16);
  //console.log("minute: "+minute);

  if (dateTime.includes("Z")) {
    hour = parseInt(hour) + 2;
  } else {
    hour = parseInt(hour);
  }
  hour = ("0" + hour).slice(-2)
  if (onlyTime) {
    return hour + ":" + minute;
  } else {
    return year + "-" + month + "-" + date + ";" + hour + ":" + minute;
  }
}
