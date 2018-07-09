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

    success(message: any, ...additionalParams: Array<any>): void {
        console.log(Color.green(`[SUCCESS]`));
        console.log(Color.green(`${this.indent}***[${this.module}]***`));
        if (message.toString() === '[object Object]' || Array.isArray(message)) {
            console.log(Color.green(`${this.indent}`), message);
        } else {
            console.log(Color.green(`${this.indent}${message}`));
        }
        for (let param of additionalParams) {
            if (param.toString() === '[object Object]' || Array.isArray(param)) {
                console.log(Color.green(`${this.indent}`), param);
            } else {
                console.log(Color.green(`${this.indent}${param}`));
            }
        }
    }

    info(message: any, ...additionalParams: Array<any>): void {
        console.log(Color.white(`[INFO]`));
        console.log(Color.white(`${this.indent}***[${this.module}]***`));
        if (message.toString() === '[object Object]' || Array.isArray(message)) {
            console.log(Color.white(`${this.indent}`), message);
        } else {
            console.log(Color.white(`${this.indent}${message}`));
        }
        for (let param of additionalParams) {
            if (param.toString() === '[object Object]' || Array.isArray(param)) {
                console.log(Color.white(`${this.indent}`), param);
            } else {
                console.log(Color.white(`${this.indent}${param}`));
            }
        }
    }

    debug(message: any, ...additionalParams: Array<any>): void {
        console.log(Color.grey(`[DEBUG]`));
        console.log(Color.grey(`${this.indent}***[${this.module}]***`));
        if (message.toString() === '[object Object]' || Array.isArray(message)) {
            console.log(Color.grey(`${this.indent}`), message);
        } else {
            console.log(Color.grey(`${this.indent}${message}`));
        }
        for (let param of additionalParams) {
            if (param.toString() === '[object Object]' || Array.isArray(param)) {
                console.log(Color.grey(`${this.indent}`), param);
            } else {
                console.log(Color.grey(`${this.indent}${param}`));
            }
        }
    }

    warn(message: any, ...additionalParams: Array<any>): void {
        console.log(Color.yellow(`[WARN]`));
        console.log(Color.yellow(`${this.indent}***[${this.module}]***`));
        if (message.toString() === '[object Object]' || Array.isArray(message)) {
            console.log(Color.yellow(`${this.indent}`), message);
        } else {
            console.log(Color.yellow(`${this.indent}${message}`));
        }
        for (let param of additionalParams) {
            if (param.toString() === '[object Object]' || Array.isArray(param)) {
                console.log(Color.yellow(`${this.indent}`), param);
            } else {
                console.log(Color.yellow(`${this.indent}${param}`));
            }
        }
    }

    error(message: any, ...additionalParams: Array<any>):void {

        console.log('----')
        console.log(additionalParams)
        console.log('----')

        if (message) {
            this.simpleOutput({
                color: 'red',
                type: 'ERROR'
            }, message, additionalParams)
        }

        // console.log(Color.red(`[ERROR]`));
        // console.log(Color.red(`${this.indent}***[${this.module}]***`));
        // if (message.toString() === '[object Object]' || Array.isArray(message)) {
        //     console.log(Color.red(`${this.indent}`), message);
        // } else {
        //     console.log(Color.red(`${this.indent}${message}`));
        // }
        // for (let param of additionalParams) {
        //     if (param.toString() === '[object Object]' || Array.isArray(param)) {
        //         console.log(Color.red(`${this.indent}`), param);
        //     } else {
        //         console.log(Color.red(`${this.indent}${param}`));
        //     }
        // }
    }

    errorDetails({message, error, data}: IError): void {
        console.log(Color.red(`[ERROR]`));
        console.log(Color.red(`${this.indent}***[${this.module}]***`));

        if (!message && !error && !data) {
            console.log(Color.red(`${this.indent}Something went wrong! Please, check stack trace!`));
        }

        if (message) {
            console.log(Color.red(`${this.indent}MESSAGE: ${message}`));
        }
        if (error) {
            console.log(Color.red(`${this.indent}ERROR: ${error}`));
        }
        if (data) {
            console.log(Color.red(`${this.indent}DATA: `), data);
        }
    }

    logRequest(context: Context): void {
        console.log(Color.blue(`[REQUEST]`));
        console.log(Color.blue(`${this.indent}URL: ${context.request.url}`));
        if (context.request.method !== 'GET' && context.request.body) {
            if (context.request.body.toString() === '[object Object]' || Array.isArray(context.request.body)) {
                console.log(Color.blue(`${this.indent}BODY: `), context.request.body);
            } else {
                console.log(Color.blue(`${this.indent}BODY: ${context.request.body}`));
            }
        }
    }

    logResponse(context: Context): void {
        console.log(Color.blue(`[RESPONSE]`));
        console.log(Color.blue(`${this.indent}URL: ${context.request.url}`));
        if (context.response.body) {
            if (context.response.body.toString() === '[object Object]' || Array.isArray(context.response.body)) {
                console.log(Color.blue(`${this.indent}BODY:`), context.response.body);
            } else {
                console.log(Color.blue(`${this.indent}BODY: ${context.response.body}`));
            }
        }
        console.log(Color.blue('________________________________________________________________________________'))
    }

    private simpleOutput(config: {color: string, type: string}, message: any, ...additionalParams: Array<any>):void {
        console.log(Color[config.color](`[${config.type}]`));
        console.log(Color[config.color](`${this.indent}***[${this.module}]***`));
        if (message.toString() === '[object Object]' || Array.isArray(message)) {
            console.log(Color[config.color](`${this.indent}`), message);
        } else {
            console.log(Color[config.color](`${this.indent}${message}`));
        }
        for (let param of additionalParams) {
            if (param.toString() === '[object Object]' || Array.isArray(param)) {
                console.log(Color[config.color](`${this.indent}`), param);
            } else {
                console.log(Color[config.color](`${this.indent}${param}`));
            }
        }
    }
}
