/*
 * Copyright (c) Created by Volodymyr Kornetskyi 6/7/2018.
 */

import * as Color from 'colors/safe';
import {inspect} from 'util';
import {Context} from "koa";
import {IError} from "./errors";

export class Logger {
    private gap: string = '    ';
    private indent: string = `${this.gap}|${this.gap}`;

    constructor(readonly module: string = "Logger") {
    }

    success(message: any, ...additionalParams: Array<any>): void {
        if (message) {
            this.simpleOutput({
                color: 'green',
                type: 'SUCCESS'
            }, message, ...additionalParams)
        }
    }

    info(message: any, ...additionalParams: Array<any>): void {
        if (message) {
            this.simpleOutput({
                color: 'white',
                type: 'INFO'
            }, message, ...additionalParams)
        }
    }

    debug(message: any, ...additionalParams: Array<any>): void {
        if (message) {
            this.simpleOutput({
                color: 'grey',
                type: 'DEBUG'
            }, message, ...additionalParams)
        }
    }

    warn(message: any, ...additionalParams: Array<any>): void {
        if (message) {
            this.simpleOutput({
                color: 'yellow',
                type: 'WARN'
            }, message, ...additionalParams)
        }
    }

    error(message: any, ...additionalParams: Array<any>): void {
        if (message) {
            this.simpleOutput({
                color: 'red',
                type: 'ERROR'
            }, message, ...additionalParams)
        }
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
            console.log(Color.red(`${this.indent}DATA:\n${this.formatObject(data)}`));
        }
    }

    logRequest(context: Context): void {
        console.log(Color.blue(`[REQUEST]`));
        console.log(Color.blue(`${this.indent}URL: ${context.request.url}`));
        if (context.request.method !== 'GET' && context.request.body) {
            console.log(Color.blue(`${this.indent}BODY:\n${this.formatObject(context.request.body)}`));
        }
    }

    logResponse(context: Context): void {
        console.log(Color.blue(`[RESPONSE]`));
        console.log(Color.blue(`${this.indent}URL: ${context.request.url}`));
        if (context.response.body) {
            console.log(Color.blue(`${this.indent}BODY:\n${this.formatObject(context.response.body)}`));
        }
        console.log(Color.blue('________________________________________________________________________________'))
    }

    private formatObject(obj: any): string {
        if ((typeof obj === 'string') || (obj[Symbol.toStringTag] != null) || obj.hasOwnProperty('toString')) {
            return `${this.indent}|\t${obj}`;
        }

        const formattedObj: string = inspect(obj, {
            // breakLength: Infinity,
            compact: false
        });
        const splittedObj = formattedObj.split('\n');

        return `${this.indent}|\t` + splittedObj.join(`\n${this.indent}|\t`);
    }

    private simpleOutput(
        opts: { color?: string, type?: string } = {color: 'black', type: 'CUSTOM'},
        message: string = 'CUSTOM MESSAGE', ...objects: Array<any>): void {

        const print = (s: string): void => console.log(Color[opts.color](s));

        print(`[${opts.type}]`);
        print(`${this.indent}***[${this.module}]***`);
        print(`${this.indent}|\t${message}`);

        for (const obj of objects) {
            const objToPrint: string = this.formatObject(obj);
            print(objToPrint);
        }
    }

    // Old implementation
    // private simpleOutput(config: { color: string, type: string }, message: any, ...additionalParams: Array<any>): void {
    //     console.log(Color[config.color](`[${config.type}]`));
    //     console.log(Color[config.color](`${this.indent}***[${this.module}]***`));
    //     if (message.toString() === '[object Object]' || Array.isArray(message)) {
    //         console.log(Color[config.color](`${this.indent}`), message);
    //     } else {
    //         console.log(Color[config.color](`${this.indent}${message}`));
    //     }
    //     if (additionalParams.length) {
    //         for (let param of additionalParams) {
    //             if (param.toString() === '[object Object]' || Array.isArray(param)) {
    //                 console.log(Color[config.color](`${this.indent}`), param);
    //             } else {
    //                 console.log(Color[config.color](`${this.indent}${param}`));
    //             }
    //         }
    //     }
    // }
}
