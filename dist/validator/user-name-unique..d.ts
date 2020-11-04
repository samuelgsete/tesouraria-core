import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { UserValidator } from "./user-validator.service";
export declare class UserNameUnique implements ValidatorConstraintInterface {
    private service;
    constructor(service: UserValidator);
    validate(username: string, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
