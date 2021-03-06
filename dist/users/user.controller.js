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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_entity_1 = require("../shared/models/user.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let UserController = (() => {
    let UserController = class UserController {
        constructor(service) {
            this.service = service;
        }
        findById(id) {
            return this.service.findById(id);
        }
        create(user) {
            return this.service.save(user);
        }
        confirmUser(code) {
            return this.service.confirmUser(code);
        }
        resendCode(body) {
            return this.service.resendCode(body.email);
        }
        update(user) {
            return this.service.update(user);
        }
        recoverAccount(body) {
            return this.service.recoverAccount(body.email);
        }
        finalizeRecover(body) {
            return this.service.finalizeRecover(body.username, body.password, body.code);
        }
    };
    __decorate([
        common_1.Get(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Param('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "findById", null);
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [user_entity_1.User]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "create", null);
    __decorate([
        common_1.Post(':code'),
        __param(0, common_1.Param('code')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "confirmUser", null);
    __decorate([
        common_1.Put('resend'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "resendCode", null);
    __decorate([
        common_1.Put(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [user_entity_1.User]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "update", null);
    __decorate([
        common_1.Put('recover/account'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "recoverAccount", null);
    __decorate([
        common_1.Put('finalize/recover'),
        __param(0, common_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], UserController.prototype, "finalizeRecover", null);
    UserController = __decorate([
        common_1.Controller('user'),
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], UserController);
    return UserController;
})();
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map