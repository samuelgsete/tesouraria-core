import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ValidatonCustomPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
