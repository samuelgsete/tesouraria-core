"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("../users/user.module");
const user_name_unique_1 = require("./user-name-unique.");
const user_validator_service_1 = require("./user-validator.service");
let ValidatorModule = (() => {
    let ValidatorModule = class ValidatorModule {
    };
    ValidatorModule = __decorate([
        common_1.Module({
            imports: [
                user_module_1.UserModule,
                user_name_unique_1.UserNameUnique,
            ],
            providers: [user_validator_service_1.UserValidator]
        })
    ], ValidatorModule);
    return ValidatorModule;
})();
exports.ValidatorModule = ValidatorModule;
//# sourceMappingURL=validator.module.js.map