/*
 * Copyright (c) Created by Volodymyr Kornetskyi 9/7/2018.
 */

import {Action, UnauthorizedError} from "routing-controllers";
import {User} from "../data";
import {Logger} from "./Logger";

export class AuthorizationUtils {

    readonly logger: Logger;

    constructor() {
        this.logger = new Logger(this.constructor.name);
    }

    async authorizationChecker(action: Action, roles: string[]): Promise<boolean> {
        console.log('authorizationChecker');
        const token = action.request.headers["authorization"];
        this.logger.info(`User with token: ${token} try to call: ${action.request.url}`);
        if (!token) {
            this.logger.error('Token is not provided!');
            throw new UnauthorizedError('Token is not provided!');
        }
        return true;
    }

    async currentUserChecker(action: Action): Promise<User> {
        console.log('currentUserChecker');
        const token = action.request.headers["authorization"];
        if (!token) {
            this.logger.error('Token is not provided!');
            throw new UnauthorizedError('Token is not provided!');
        }
        return new User();
    }
}