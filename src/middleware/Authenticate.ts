/*
 * Copyright (c) Created by Volodymyr Kornetskyi 4/7/2018.
 */

import {KoaMiddlewareInterface} from "routing-controllers";

export class Authenticate implements KoaMiddlewareInterface { // interface implementation is optional

    use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
        return next().catch(error => {
            console.log("error handling is also here");
        });
    }

}