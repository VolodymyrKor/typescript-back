/*
 * Copyright (c) Created by Volodymyr Kornetskyi 9/7/2018.
 */

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import {
    IsInt,
    IsEmail,
    Min,
    Max
} from "class-validator";
import {UserRole} from "./";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 30
    })
    firstName: string;

    @Column({
        length: 30
    })
    lastName: string;

    @Column({
        length: 30,
        nullable: true
    })
    middleName: string;

    @Column({
        length: 13,
        unique: true
    })
    phoneNumber: string;

    @IsEmail()
    @Column({
        length: 50,
        unique: true
    })
    email: string;

    @IsInt()
    @Min(1)
    @Max(31)
    @Column({
        type: "int",
        length: 2
    })
    dayOfBirth: number;

    @IsInt()
    @Min(1)
    @Max(12)
    @Column({
        type: "int",
        length: 2
    })
    monthOfBirth: number;

    @IsInt()
    @Min(1930)
    @Max(new Date().getFullYear() - 16)
    @Column({
        type: "int",
        length: 4
    })
    yearOfBirth: number;

    @ManyToOne(type => UserRole, userRole => userRole.users)
    userRole: UserRole;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;

    @Column()
    isActive: boolean;

}