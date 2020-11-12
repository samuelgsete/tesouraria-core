"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const validation_exception_1 = require("../exceptions/models/validation.exception");
let ValidationPipe = (() => {
    let ValidationPipe = class ValidationPipe {
        async transform(value, { metatype }) {
            if (!metatype || !this.toValidate(metatype)) {
                return value;
            }
            const object = class_transformer_1.plainToClass(metatype, value);
            const errors = await class_validator_1.validate(object);
            console.log(errors);
            if (errors.length > 0) {
                throw new validation_exception_1.ValidationException('Houve um erro de validação', common_1.HttpStatus.BAD_REQUEST, errors);
            }
            return value;
        }
        toValidate(metatype) {
            const types = [String, Boolean, Number, Array, Object];
            return !types.includes(metatype);
        }
    };
    ValidationPipe = __decorate([
        common_1.Injectable()
    ], ValidationPipe);
    return ValidationPipe;
})();
exports.ValidationPipe = ValidationPipe;
//# sourceMappingURL=validation-custom.pipe.js.map