"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const IdInvalidException_1 = require("./models/IdInvalidException");
let ObjectExceptionFilter = class ObjectExceptionFilter {
    catch(ex, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        response
            .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            .json({
            codigo: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            tipo: "Erro interno",
            detalhes: ex.message,
            caminho: request.url
        });
    }
};
ObjectExceptionFilter = __decorate([
    common_1.Catch(IdInvalidException_1.IdInvalidException)
], ObjectExceptionFilter);
exports.ObjectExceptionFilter = ObjectExceptionFilter;
//# sourceMappingURL=object-exception.filter.js.map