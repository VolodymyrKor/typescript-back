/*
 * Copyright (c) Created by Volodymyr Kornetskyi 16/7/2018.
 */

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from "typeorm";
import {IsInt, IsEmail, Min, Max} from "class-validator";
import {User} from './';

@Entity()
export class UserRole {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    roleName: string;

    @OneToMany(type => User, user => user.userRole)
    users: User[]
}

