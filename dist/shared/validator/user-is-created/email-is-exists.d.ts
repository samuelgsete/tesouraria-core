import { Repository } from "typeorm";
import { ValidatorConstraintInterface } from 'class-validator';
import { User } from 'src/shared/models/user.entity';
export declare class EmailIsExists implements ValidatorConstraintInterface {
    private repository;
    constructor(repository: Repository<User>);
    validate(email: string): Promise<boolean>;
}
