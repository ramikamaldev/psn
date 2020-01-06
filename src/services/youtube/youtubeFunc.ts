import { google } from "googleapis";
import { createAndReturnPromise } from "../../common-functions/utility-functions"
import { resolve } from "dns";
import * as lodash from "lodash";

export class YoutubeServiceFunctionality {

    public playlistItems;
    public youtubeService;
    constructor() {
        this.youtubeService = google.youtube(
            {
                version: 'v3',
                auth: process.env.PSN_YOUTUBE_API_KEY// specify your API key here
            });
        this.playlistItems = [];
    }
    public async getChannelIDs(userNames: []) {
        let channelIDArr = [];
        let getChannelIDsFunction = function (resolve, reject) {
            for (let i = 0; i < userNames.length; i++) {
                this.youtubeService.channels.list({
                    "part": "snippet,contentDetails",
                    "forUsername": userNames[i] //"GlobalCyclingNetwork"
                }).then(function (response) {
                    // Handle the results here (response.result has the parsed body).
                    channelIDArr.push(response.data.items[0].id)
                    if (i < userNames.length - 1) {
                        return resolve(this.channelIDs);
                    }
                }).catch(function (err) {
                    return reject(err);
                })
            }
        }
        return createAndReturnPromise(getChannelIDsFunction);
    }

        public async getChannelPlaylists(playlistIDs: []) {
            let playlistIDArr = [];
        let youtubeGetChannelPromise = function (resolve, reject) {
            this.youtubeService.channels.list({
                "part": "snippet,contentDetails",
                "id": playlistIDArr //["UC_A--fhX5gea0i4UtpD99Gg", "UCuTaETsuCOkJ0H_GAztWt0Q"]
            }).then(function (response) {
                // Handle the results here (response.result has the parsed body).
                playlistIDArr.push(response.data.items.relatedPlaylists.uploads);
                return resolve(playlistIDArr);
            }).catch(function (err) {
                return reject(err);
            })
        }
        return createAndReturnPromise(youtubeGetChannelPromise);
    };
    public returnPlayListItems(playlistID, pageToken?: string) {
        let newPageToken = null;
        let playlistitems = [];
       this. youtubeService.playlistItems.list({
            "part": "snippet,contentDetails",
            "maxResults": 3,
            "playlistId": "UUuTaETsuCOkJ0H_GAztWt0Q"
        }).then(function (response) {
            let variable = 'hello';
            // Handle the results here (response.result has the parsed body).
            //console.log("Response", response.data.items[0].snippet.title);
            //not actually a callback, just a function passed in to do some work.
            let playlistItems = lodash.filter(response.data.items, function (playlistItemData) {
                return playlistItemData.snippet.title.match("Mitchelton|pro|matt stephens|5|Dubai stage|GCN");
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
}


//syntax used on async/await function result. 
//youtubeQuery().catch(console.error);