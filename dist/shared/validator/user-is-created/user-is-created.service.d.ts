import { ValidatorConstraintInterface } from 'class-validator';
import { UserService } from 'src/users/user.service';
export declare class UserIsCreated implements ValidatorConstraintInterface {
    private readonly userService;
    constructor(userService: UserService);
    validate(text: string): Promise<boolean>;
}
