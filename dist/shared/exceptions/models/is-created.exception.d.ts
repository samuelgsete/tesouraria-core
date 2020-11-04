import { HttpException, HttpStatus } from "@nestjs/common";
export declare class IsCreatedEception extends HttpException {
    constructor(message: string, code: HttpStatus);
}
