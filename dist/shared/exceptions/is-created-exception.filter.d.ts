import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
export declare class IsCreatedExceptionFeilter implements ExceptionFilter {
    catch(ex: any, host: ArgumentsHost): void;
}
