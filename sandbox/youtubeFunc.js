let { google } = require("googleapis");

let youtubeService = google.youtube(
    {
        version: 'v3',
        auth: "AIzaSyAsmKbjsSAXARfIZ9XO0RmvU4iLMnU3dCc "// specify your API key here
    })

function testYoutube() {
    return youtubeService.channels.list({
        "part": "snippet,contentDetails",
        "id": ["UCuTaETsuCOkJ0H_GAztWt0Q", "UC_A--fhX5gea0i4UtpD99Gg"]
    }).then(function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response, "\n\n\n**********\n\n\n");
        console.log("Items:", JSON.stringify(response.data.items));
    }).catch(function (err) {
        console.error("Execute error", err);
    })
}
testYoutube();