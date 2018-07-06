/*
 * Copyright (c) Created by Volodymyr Kornetskyi 6/7/2018.
 */

import {KoaMiddlewareInterface} from "routing-controllers";
import {Logger} from "../utils";

export class LogRequests implements KoaMiddlewareInterface {
    private logger: Logger = new Logger();

    use(context: any, next: (err?: any) => Promise<any>): Promise<any> {

        this.logger.logRequest(context);
        return next().catch(error => {
            console.log("error handling is also here");
        });
    }

}