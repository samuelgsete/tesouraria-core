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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const entity_base_entity_1 = require("./entity-base.entity");
const user_messages_1 = require("../validation/user.messages");
let User = (() => {
    let User = class User extends entity_base_entity_1.EntityBase {
        constructor(values = {}) {
            super();
            Object.assign(this, values);
        }
    };
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${user_messages_1.users.nomeNotNull}` }),
        class_validator_1.IsString({ message: `${user_messages_1.users.nomeValid}` }),
        class_validator_1.Length(2, 15, { message: `${user_messages_1.users.nomeLength}` }),
        typeorm_1.Column({ length: 15, unique: false, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${user_messages_1.users.nomeNotNull}` }),
        class_validator_1.IsString({ message: `${user_messages_1.users.sobrenomeValid}` }),
        class_validator_1.Length(2, 15, { message: `${user_messages_1.users.sobrenomeLength}` }),
        typeorm_1.Column({ length: 15, unique: false, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "surname", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${user_messages_1.users.emailNotNull}` }),
        class_validator_1.Length(10, 30, { message: `${user_messages_1.users.emailLength}` }),
        class_validator_1.IsEmail({}, { message: `${user_messages_1.users.emailValid}` }),
        typeorm_1.Column({ length: 30, unique: true, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${user_messages_1.users.usernameNotNull}` }),
        class_validator_1.IsString({ message: `${user_messages_1.users.usernameValid}` }),
        class_validator_1.Length(4, 15, { message: `${user_messages_1.users.usernameLength}` }),
        typeorm_1.Column({ length: 15, unique: true, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${user_messages_1.users.passwordNotNull}` }),
        class_validator_1.IsString({ message: `${user_messages_1.users.passwordValid}` }),
        class_validator_1.Length(4, 15, { message: `${user_messages_1.users.passwordLength}` }),
        typeorm_1.Column({ length: 15, unique: false, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${user_messages_1.users.whatzappNotNull}` }),
        class_validator_1.IsString({ message: `${user_messages_1.users.whatzappValid}` }),
        class_validator_1.Length(10, 15, { message: `${user_messages_1.users.whatzappValid}` }),
        typeorm_1.Column({ length: 15, unique: false, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "whatzapp", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], User.prototype, "isActive", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "codeVerify", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], User.prototype, "updated", void 0);
    User = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Object])
    ], User);
    return User;
})();
exports.User = User;
//# sourceMappingURL=user.entity.js.map