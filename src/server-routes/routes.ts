import express from "express";
import * as cryptoRandomString from "crypto-random-string";

/**
 * Creates the express router, with desired endpoints.
 */
export function createAndReturnPSNRouter() {
    let router = express.Router();

    /** Functional Endpoints */

    //Youtube return endpoint

    //SQL return all results endpoint

    //SQL Return ID Query

    //SQL Search Term Endpoint


    /** Utility Endpoints */

    /** Root Endpoint */
    //Declared last, so that it is the last fallback - if not declared last, any HTTP call will default to it.
    router.use("/", rootFunction);
    return router;
}

/**
 * Root Callback function. Sends a happy message :)
 */
function rootFunction(req: express.Request, res: express.Response) {
    console.log("Calling rootFunction")
    res.status(200).send(`hi, happy :)\n${req.body}`);
}