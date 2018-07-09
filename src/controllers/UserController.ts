/*
 * Copyright (c) Created by Volodymyr Kornetskyi 3/7/2018.
 */

import {v4 as uuid} from 'uuid';

import {LogRequests, LogResponses} from "../middleware";
import {Logger, UserNotFoundError} from "../utils";
import {
    JsonController,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete,
    HttpCode,
    OnUndefined,
    OnNull,
    NotFoundError,
    UseBefore,
    UseAfter,
    Authorized
} from "routing-controllers";

@JsonController("/users")
@UseBefore(LogRequests)
@UseAfter(LogResponses)
export class UserController {

    readonly logger: Logger;

    constructor() {
        this.logger = new Logger(this.constructor.name);
    }

    @Get("/")
    @Authorized()
    @OnNull(204)
    @OnUndefined(204)
    getAll() {
        // this.logger.debug(this);

        throw new Error('FUCKING SHIT!!!');

        return "This action returns all users";
    }

    @Get("/:id")
    @Authorized()
    @OnNull(UserNotFoundError)
    @OnUndefined(UserNotFoundError)
    getOne(@Param("id") id: number) {
        const user = null;
        if (!user) {
            this.logger.error(`User with id: ${id} does not exist!`);
            throw new NotFoundError(`User was not found.`);
        }

        return user;
    }

    @HttpCode(201)
    @Authorized()
    @Post("/")
    post(@Body({required: true}) user: any) {
        let a: string = uuid();
        let c = [];
        this.logger.error(c);

        return "Saving user...";
    }

    @Put("/:id")
    @Authorized()
    put(@Param("id") id: number, @Body() user: any) {
        return "Updating a user...";
    }

    @Delete("/:id")
    @Authorized()
    remove(@Param("id") id: number) {
        return "Removing user...";
    }

}