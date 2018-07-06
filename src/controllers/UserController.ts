/*
 * Copyright (c) Created by Volodymyr Kornetskyi 3/7/2018.
 */

import {Authenticate, LogRequests, LogResponses} from "../middleware";
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
    UseAfter
} from "routing-controllers";

@JsonController()
@UseBefore(Authenticate)
@UseBefore(LogRequests)
@UseAfter(LogResponses)
export class UserController {

    readonly logger: Logger;

    constructor() {
        this.logger = new Logger(this.constructor.name);
    }

    @Get("/users")
    @OnNull(204)
    @OnUndefined(204)
    getAll() {
        console.log("This action returns all users");
        return "This action returns all users";
    }

    @Get("/users/:id")
    @OnNull(UserNotFoundError)
    @OnUndefined(UserNotFoundError)
    getOne(@Param("id") id: number) {
        console.log("Get user by id");
        const user = null;
        if (!user)
            throw new NotFoundError(`User was not found.`);

        return user;
    }

    @HttpCode(201)
    @Post("/users")
    post(@Body({required: true}) user: any) {
        this.logger.log("Add new user");
        this.logger.log(user);
        this.logger.error({
            message: 'Error message',
            error: 'e',
            data: {
                customField: [
                    "cf",
                    "cf2"
                ]
            }
        });
        return "Saving user...";
    }

    @Put("/users/:id")
    put(@Param("id") id: number, @Body() user: any) {
        console.log("Update user");
        console.log(user);
        return "Updating a user...";
    }

    @Delete("/users/:id")
    remove(@Param("id") id: number) {
        console.log("Delete user");
        return "Removing user...";
    }

}