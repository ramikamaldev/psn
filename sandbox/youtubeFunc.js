let { google } = require("googleapis");
let lodash = require('lodash');

let youtubeService = google.youtube(
    {
        version: 'v3',
        auth: "AIzaSyAoh5Q6zZ8II2Qcu2zJcU9cmtoHXB9EXvM"// specify your API key here
    })

function testYoutube() {
    let newPageToken = null;
    let playlistitems = [];
    youtubeService.playlistItems.list({
        "part": "snippet,contentDetails",
        "maxResults": 3,
        "playlistId": "UUuTaETsuCOkJ0H_GAztWt0Q"
    }).then(function (response) {
        // Handle the results here (response.result has the parsed body).
        //console.log("Response", response.data.items[0].snippet.title);
        //not actually a callback, just a function passed in to do some work.
        let playlistItems = lodash.filter(response.data.items, function (o) {
            return o.snippet.title.match("Mitchelton|pro|matt stephens|5|Dubai stage|GCN");
        })
        playlistItems.push(response.data.items);
        newPageToken = response.pageToken;
        if (newPageToken) {
            return this.returnPlaylistItems(playlistID, newPageToken);
        }
        else {
            return this.playlistItems;
        }
    }).catch(function (err) {
        console.error("Execute error", err);
    })
}
function callback()
{
    
}

testYoutube();