import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class JsonToObjectPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
