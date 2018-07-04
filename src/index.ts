/*
 * Copyright (c) Created by Volodymyr Kornetskyi 2/7/2018.
 */

import "reflect-metadata";
// import * as http from "http";
// import * as https from "https";

import {createKoaServer} from "routing-controllers";
import * as Controllers from "./controllers";
const config = require("./../config.json");

try {
    const app = createKoaServer({
        cors: true,
        controllers: [
            Controllers.UserController
        ]
    });

    app.listen(process.env.PORT || config.server.PORT);
    console.log(`Server listen port: ${process.env.PORT || config.server.PORT}`)
} catch (e) {
    console.log(`Impossible to start server. ${e}`)
}
