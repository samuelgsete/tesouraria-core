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
    save(user: User): Promise<{
        message: string;
    }>;
    confirmUser(code: string): Promise<{
        message: string;
    }>;
    resendCode(email: string): Promise<{
        message: string;
    }>;
    update(user: User): Promise<{
        message: string;
    }>;
    private generateVerificationCode;
}
