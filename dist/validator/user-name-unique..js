"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNameUnique = void 0;
const class_validator_1 = require("class-validator");
const user_validator_service_1 = require("./user-validator.service");
let UserNameUnique = (() => {
    let UserNameUnique = class UserNameUnique {
        constructor(service) {
            this.service = service;
        }
        async validate(username, args) {
            return true;
        }
        defaultMessage(args) {
            return "O usuario já está sendo usado";
        }
    };
    UserNameUnique = __decorate([
        class_validator_1.ValidatorConstraint({ name: "userNameUnique", async: true }),
        __metadata("design:paramtypes", [user_validator_service_1.UserValidator])
    ], UserNameUnique);
    return UserNameUnique;
})();
exports.UserNameUnique = UserNameUnique;
//# sourceMappingURL=user-name-unique..js.map