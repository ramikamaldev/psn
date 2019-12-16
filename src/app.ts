/**
 * PlaySportsNetworkApp (PSN) HTTP payload retrieval application.
 * Author: Remi Kamal
 */

//External package imports.
import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import * as path from "path";

//Internal function imports.
import { createAndReturnPSNRouter } from "./server-routes/";
import { createAndReturnPromise, connectToPSNSQL } from "./common-functions";

/**
 * PSNApp which instantiates the infrastructure of the application, including server, and relevant endpoints.
 */
class PSNApp {
    public server: express.Application;
    /**
     * Beings construction of the PSNApp, imports config.env file.
     */
    constructor() {
        this.server = express();
        dotenv.config({
            path: path.resolve(__dirname, "../config/config.env"),
        });
        this.instantiateApplicationInfrastructure();
    }

    /**
     * Instantiates the applications' infrastructure
     *  - Connects to MongoDB
     *  - Instantiates server middleware
     *  - Starts Express server
     */
    public async instantiateApplicationInfrastructure() {
        let result = connectToPSNSQL()
            .then(async function (result) {
                await psnApp.instantiateMiddleware();
                psnApp.startExpress();
            })
            .catch(function (error) {
            });
        return;
    }

    /**
     * Instantiates Server Middleware including:
     *  - Helmet
     *  - Bodyparser : JSON
     *  - Routes throught router
     * 
     * A promise returner function is used in order to ease the binding of 'this'
     */
    public async instantiateMiddleware() {
        let promiseFunction = function (resolve, reject) {
            this.server.use(helmet());
            this.server.use(bodyParser.json());
            let psnRouter = createAndReturnPSNRouter();
            this.server.use(psnRouter);
            this.server.get("/testServerRoutes", function (req, res) {
                res.send("Server is running correctly.");
            });
            return resolve(0);
        }.bind(this);
        createAndReturnPromise(promiseFunction);
    }

    /**
     * Starts the express application on port 5050, if using a local environment
     * If using a webhosted env then it will default to the assigned port.
     */
    public async startExpress() {
        this.server.listen(process.env.PORT);
        console.log(
            `PSN Server Started! Listening on port: ${process.env.PORT}`
        );
    }
}

/**
 * Singleton method to instantiate the PSN Server.
 */
let psnApp: PSNApp;
function createSingletonApplication() {
    if (!psnApp) {
        console.log("Instantiating Singleton PSN Application");
        psnApp = new PSNApp();
        return 0;
    } else {
        return 1;
    }
}

/********************************************
 * Instantiates the application and server!!
 ********************************************/
createSingletonApplication();
