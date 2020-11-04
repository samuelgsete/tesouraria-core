import { HttpException, HttpStatus } from "@nestjs/common";
export declare class ValidationException extends HttpException {
    errors: any;
    constructor(message: string, code: HttpStatus, errors: any);
}
