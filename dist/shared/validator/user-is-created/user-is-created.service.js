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
exports.UserIsCreated = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const user_service_1 = require("../../../users/user.service");
let UserIsCreated = (() => {
    let UserIsCreated = class UserIsCreated {
        constructor(userService) {
            this.userService = userService;
        }
        async validate(text) {
            const user = await this.userService.findByEmail(text);
            return !user;
        }
    };
    UserIsCreated = __decorate([
        common_1.Injectable(),
        class_validator_1.ValidatorConstraint({ name: 'UserIsCreated', async: true }),
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], UserIsCreated);
    return UserIsCreated;
})();
exports.UserIsCreated = UserIsCreated;
//# sourceMappingURL=user-is-created.service.js.map