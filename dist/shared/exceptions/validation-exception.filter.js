"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const validation_exception_1 = require("./models/validation.exception");
let ValidationExceptionFilter = (() => {
    let ValidationExceptionFilter = class ValidationExceptionFilter {
        constructor() {
            this.constraints = [];
        }
        catch(ex, host) {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse();
            const errors = ex.errors;
            this.getConstraintsResponsive(errors);
            let message = this.getMessage(this.constraints[0]);
            this.constraints = [];
            response
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({
                status: common_1.HttpStatus.BAD_REQUEST,
                details: message,
                redirect: false
            });
        }
        getConstraintsResponsive(errors) {
            errors.forEach(error => {
                if (error.constraints) {
                    this.constraints.push(error.constraints);
                }
                if (error.children) {
                    this.getConstraintsResponsive(error.children);
                }
            });
        }
        getMessage(constraints) {
            if (!constraints) {
                return '';
            }
            if (constraints.isNotEmpty) {
                return constraints.isNotEmpty;
            }
            if (constraints.isString) {
                return constraints.isString;
            }
            if (constraints.isInt) {
                return constraints.isInt;
            }
            if (constraints.isNumber) {
                return constraints.isNumber;
            }
            if (constraints.length) {
                return constraints.length;
            }
            if (constraints.isEmail) {
                return constraints.isEmail;
            }
            if (constraints.isDateString) {
                return constraints.isDateString;
            }
            if (constraints.isOptional) {
                return constraints.isOptional;
            }
            return '';
        }
    };
    ValidationExceptionFilter = __decorate([
        common_1.Catch(validation_exception_1.ValidationException)
    ], ValidationExceptionFilter);
    return ValidationExceptionFilter;
})();
exports.ValidationExceptionFilter = ValidationExceptionFilter;
//# sourceMappingURL=validation-exception.filter.js.map