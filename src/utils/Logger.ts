/*
 * Copyright (c) Created by Volodymyr Kornetskyi 6/7/2018.
 */

import * as Color from 'colors/safe';
import {Context} from "koa";
import {IError} from "./errors";

export class Logger {
    private gap: string = '    ';
    private indent: string = `${this.gap}|${this.gap}`;

    constructor(readonly module: string = "Logger") {
    }

    log(message?: string, obj?: any): void {
        console.log(Color.grey(`${this.indent}***[${this.module}]***`))
        if (message) {
            console.log(Color.grey(`${this.indent}${message}`));
        }
        if (obj) {
            console.log(Color.grey(`${this.indent}`), obj)
        }
    }

    error({message, error, data}: IError): void {
        console.log(Color.red(`[ERROR]\n${this.indent}***[${this.module}]***`));

        if (!message && !error && !data) {
            console.log(Color.red(`${this.indent}Something went wrong! Please, check stack trace!`));
        }

        if (message) {
            console.log(Color.red(`${this.indent}MESSAGE: ${message}`));
        }
        if (error) {
            console.log(Color.red(`${this.indent}ERROR: ${error}`));
        }
        if (message) {
            console.log(Color.red(`${this.indent}DATA: `), data);
        }
    }

    logRequest(context: Context): void {
        console.log(Color.blue(`[REQUEST]`));
        console.log(Color.blue(`${this.indent}URL: ${context.request.url}`));
        if (context.request.body) {
            console.log(Color.blue(`${this.indent}BODY: `), context.request.body);
        }
    }

    logResponse(context: Context): void {
        console.log(Color.blue(`[RESPONSE]`));
        console.log(Color.blue(`URL: ${context.request.url}`));
        if (context.response.body) {
            console.log(Color.blue(`${this.indent}BODY:`), context.response.body);
        }
        console.log(Color.blue('________________________________________________________________________________'))
    }
}
