import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
export declare class ValidationExceptionFilter implements ExceptionFilter {
    private constraints;
    catch(ex: any, host: ArgumentsHost): void;
    getConstraintsResponsive(errors: any[]): void;
    getMessage(constraints: any): string;
}
