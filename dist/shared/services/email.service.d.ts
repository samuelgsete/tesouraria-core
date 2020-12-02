export declare class EmailService {
    transporter: any;
    constructor();
    authenticate(): Promise<any>;
    sendMail(message: string, recipient: string): Promise<void>;
    verifyUser(name: string, surname: string, recipient: string, code: string): Promise<void>;
    recoverUser(name: string, surname: string, recipient: string, code: string): Promise<void>;
    private generatePageWelcome;
    private generatePageRecover;
}
