/*
 * Copyright (c) Created by Volodymyr Kornetskyi 3/7/2018.
 */

import {HttpError} from "routing-controllers";

export class UserNotFoundError extends HttpError {
    constructor() {
        super(404, "User not found!");
    }
}