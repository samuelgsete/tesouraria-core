import { UserService } from "./user.service";
import { User } from "src/shared/models/user.entity";
export declare class UserController {
    private service;
    constructor(service: UserService);
    findById(id: number): Promise<User>;
    create(user: User): Promise<{
        message: string;
    }>;
    confirmUser(code: string): Promise<{
        message: string;
    }>;
    resendCode(body: any): Promise<{
        message: string;
    }>;
    update(user: User): Promise<{
        message: string;
    }>;
}
