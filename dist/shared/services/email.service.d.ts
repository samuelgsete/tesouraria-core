export declare class EmailService {
    transporter: any;
    constructor();
    authenticate(): Promise<any>;
    sendMail(message: string, recipient: string): Promise<void>;
    verifyUser(name: string, recipient: string, code: string): Promise<void>;
    recoverUser(name: string, recipient: string, code: string): Promise<void>;
}
