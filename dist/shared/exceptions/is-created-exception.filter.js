"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCreatedExceptionFeilter = void 0;
const common_1 = require("@nestjs/common");
const is_created_exception_1 = require("./models/is-created.exception");
let IsCreatedExceptionFeilter = (() => {
    let IsCreatedExceptionFeilter = class IsCreatedExceptionFeilter {
        catch(ex, host) {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse();
            response
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({
                status: common_1.HttpStatus.BAD_REQUEST,
                details: ex.message,
                redirect: false
            });
        }
    };
    IsCreatedExceptionFeilter = __decorate([
        common_1.Catch(is_created_exception_1.IsCreatedEception)
    ], IsCreatedExceptionFeilter);
    return IsCreatedExceptionFeilter;
})();
exports.IsCreatedExceptionFeilter = IsCreatedExceptionFeilter;
//# sourceMappingURL=is-created-exception.filter.js.map