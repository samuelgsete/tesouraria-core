import { User } from 'src/shared/models/user.entity';
import { Repository } from 'typeorm';
import { EmailService } from 'src/shared/services/email.service';
export declare class UserService {
    private repository;
    private readonly emailService;
    constructor(repository: Repository<User>, emailService: EmailService);
    findById(id: number): Promise<User>;
    findByUserName(username: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    save(user: User): Promise<void>;
    confirmUser(code: string): Promise<void>;
    resendCode(email: string): Promise<void>;
    update(user: User): Promise<void>;
    recoverAccount(email: string): Promise<{
        name: string;
    }>;
    finalizeRecover(newUsername: string, newPassowrd: string, code: string): Promise<void>;
    private generateVerificationCode;
}
