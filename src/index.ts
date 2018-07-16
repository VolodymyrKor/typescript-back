/*
 * Copyright (c) Created by Volodymyr Kornetskyi 2/7/2018.
 */

import "reflect-metadata";
import {createConnection, getConnection} from "typeorm";
import {User} from './data/enitity';
// import * as http from "http";
// import * as https from "https";

import {createKoaServer, Action} from "routing-controllers";
import {AuthorizationUtils} from "./utils";
import * as Controllers from "./controllers";
const config = require("./../config.json");

const authUtils = new AuthorizationUtils();

(async () => {
    try {
        const app = createKoaServer({
            authorizationChecker: (action: Action, roles: string[]) => authUtils.authorizationChecker(action, roles),
            currentUserChecker: (action: Action) => authUtils.currentUserChecker(action),
            cors: true,
            controllers: [
                Controllers.UserController
            ]
        });

        await createConnection();
        //
        // const user = new User();
        // user.firstName = '132';
        // await user.save()


        app.listen(process.env.PORT || config.server.PORT);
        console.log(`Server listen port: ${process.env.PORT || config.server.PORT}`)
    } catch (e) {
        console.log(`Impossible to start server.`, e)
    }
})();
