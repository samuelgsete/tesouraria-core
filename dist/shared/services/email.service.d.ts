export declare class EmailService {
    transporter: any;
    constructor();
    sendMail(message: string, recipient: string): void;
    verifyUser(name: string, recipient: string, code: string): void;
}
