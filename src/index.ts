/*
 * Copyright (c) Created by Volodymyr Kornetskyi 2/7/2018.
 */

import "reflect-metadata";
// import * as http from "http";
// import * as https from "https";

import {createKoaServer} from "routing-controllers";
const config = require("./../config.json");

try {
    const app = createKoaServer({
        cors: true,
        controllers: [
            __dirname + "./controllers/*.ts"
        ]
    });

    app.listen(process.env.PORT || config.server.PORT);
    console.log(`Server listen port: ${process.env.PORT || config.server.PORT}`)
} catch (e) {
    console.log(`Impossible to start server. ${e}`)
}
