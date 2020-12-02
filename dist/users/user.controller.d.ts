import { UserService } from "./user.service";
import { User } from "src/shared/models/user.entity";
export declare class UserController {
    private service;
    constructor(service: UserService);
    findById(id: number): Promise<User>;
    create(user: User): Promise<void>;
    confirmUser(code: string): Promise<void>;
    resendCode(body: any): Promise<void>;
    update(user: User): Promise<void>;
    recoverAccount(body: any): Promise<{
        name: string;
        surname: string;
        username: string;
    }>;
    finalizeRecover(body: any): Promise<void>;
}
