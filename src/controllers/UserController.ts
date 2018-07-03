/*
 * Copyright (c) Created by Volodymyr Kornetskyi 3/7/2018.
 */

import {JsonController, Param, Body, Get, Post, Put, Delete, HttpCode, OnUndefined, OnNull, NotFoundError} from "routing-controllers";
import { UserNotFoundError } from "../utils/errors";

@JsonController()
export class UserController {

    @Get("/users")
    @OnNull(204)
    @OnUndefined(204)
    getAll() {
        return "This action returns all users";
    }

    @Get("/users/:id")
    @OnNull(UserNotFoundError)
    @OnUndefined(UserNotFoundError)
    getOne(@Param("id") id: number) {

        const user = null;
        if (!user)
            throw new NotFoundError(`User was not found.`);

        return user;
    }

    @HttpCode(201)
    @Post("/users")
    post(@Body({ required: true }) user: any) {
        return "Saving user...";
    }

    @Put("/users/:id")
    put(@Param("id") id: number, @Body() user: any) {
        return "Updating a user...";
    }

    @Delete("/users/:id")
    remove(@Param("id") id: number) {
        return "Removing user...";
    }

}