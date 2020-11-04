import { UserService } from './user.service';
import { ValidatorConstraintInterface } from 'class-validator';
export declare class EmailIsCreated implements ValidatorConstraintInterface {
    private readonly userService;
    constructor(userService: UserService);
    validate(email: string): Promise<boolean>;
    defaultMessage(): string;
}
