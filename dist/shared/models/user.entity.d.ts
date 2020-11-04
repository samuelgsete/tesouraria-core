import { EntityBase } from "./entity-base.entity";
export declare class User extends EntityBase {
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;
    whatzapp: string;
    isActive: boolean;
    codeVerify: string;
    updated: Date;
    constructor(values?: Object);
}
