import { createAndReturnPromise } from "../common-functions"
import { YoutubeServiceFunctionality } from "../services/youtube/youtubeFunc"

/**
 * Encapsulation for returning HTTP Payload endpoint.
 */
export function returnYoutubeQueryPayload(endpointPayload) {
    let youtubeServiceFunctionality = new YoutubeServiceFunctionality();

    let payloadHTTPFunction = (async function (resolve, reject) {
        try {
            let httpEndpointParameters = await youtubeServiceFunctionality.getChannel(endpointPayload);
            let result = await youtubeServiceFunctionality.returnPlayListItems(httpEndpointParameters, null);
            resolve(result);
        }
        catch (httpPayloadError) {
            reject(httpPayloadError);
        }
    }).bind(this);
    return createAndReturnPromise(payloadHTTPFunction);
}