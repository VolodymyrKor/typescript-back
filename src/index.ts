/*
 * Copyright (c) Created by Volodymyr Kornetskyi 2/7/2018.
 */

import "reflect-metadata";
// import * as http from "http";
// import * as https from "https";

import {createKoaServer, Action} from "routing-controllers";
import {AuthorizationUtils} from "./utils";
import * as Controllers from "./controllers";
const config = require("./../config.json");

const authUtils = new AuthorizationUtils();

try {
    const app = createKoaServer({
        authorizationChecker: (action: Action, roles: string[]) => authUtils.authorizationChecker(action, roles),
        cors: true,
        controllers: [
            Controllers.UserController
        ]
    });

    app.listen(process.env.PORT || config.server.PORT);
    console.log(`Server listen port: ${process.env.PORT || config.server.PORT}`)
} catch (e) {
    console.log(`Impossible to start server.`, e)
}
