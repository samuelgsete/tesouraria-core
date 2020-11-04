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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../shared/models/user.entity");
const typeorm_2 = require("typeorm");
const is_created_exception_1 = require("../shared/exceptions/models/is-created.exception");
const Id_invalid_exception_1 = require("../shared/exceptions/models/Id-invalid.exception");
const email_service_1 = require("../shared/services/email.service");
let UserService = (() => {
    let UserService = class UserService {
        constructor(repository, emailService) {
            this.repository = repository;
            this.emailService = emailService;
        }
        async findById(id) {
            if (id <= 0) {
                throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
            }
            return this.repository.findOne(id);
        }
        async findByUserName(username) {
            let result = await this.repository.find({ where: { username: username } });
            let user = result[0];
            return user;
        }
        async findByEmail(email) {
            let result = await this.repository.find({ where: { email: email } });
            let user = result[0];
            return user;
        }
        async save(user) {
            let result = await this.findByUserName(user.username);
            if (result) {
                throw new is_created_exception_1.IsCreatedEception('O usuário já está sendo utilizado', common_1.HttpStatus.BAD_REQUEST);
            }
            result = await this.findByEmail(user.email);
            if (result) {
                throw new is_created_exception_1.IsCreatedEception('O email já está sendo utilizado', common_1.HttpStatus.BAD_REQUEST);
            }
            const code = this.generateVerificationCode();
            user.codeVerify = code;
            this.emailService.verifyUser(user.name, user.email, user.codeVerify);
            return this.repository
                .save(user)
                .then(e => {
                return {
                    message: 'Aguardando confirmação'
                };
            });
        }
        async confirmUser(code) {
            const result = await this.repository.find({ where: { codeVerify: code } });
            let user = result[0];
            if (user) {
                user.isActive = true;
                return this.repository
                    .save(user)
                    .then(e => {
                    return {
                        message: 'Criado com sucesso'
                    };
                });
            }
            throw new Id_invalid_exception_1.IdInvalidException('Codigo de verificação inválido');
        }
        async resendCode(email) {
            const result = await this.repository.find({ where: { email: email } });
            const user = result[0];
            if (!user) {
                throw new common_1.HttpException('Usuário não está cadastrado', common_1.HttpStatus.NOT_FOUND);
            }
            const code = this.generateVerificationCode();
            user.codeVerify = code;
            this.emailService.verifyUser(user.name, user.email, user.codeVerify);
            return this.repository
                .save(user)
                .then(() => {
                return {
                    message: 'Código reenviado'
                };
            });
        }
        async update(user) {
            if (user.id == null || user.id <= 0) {
                throw new Id_invalid_exception_1.IdInvalidException('O ID informado é inválido');
            }
            let result = await this.findByUserName(user.username);
            if (result) {
                if (result.id != user.id) {
                    throw new is_created_exception_1.IsCreatedEception('O usuário já está sendo utilizado', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            result = await this.findByEmail(user.email);
            if (result) {
                if (result.id != user.id) {
                    throw new is_created_exception_1.IsCreatedEception('O email já está sendo utilizado', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            return this.repository
                .save(user)
                .then(e => {
                return {
                    message: 'Atualizado com sucesso'
                };
            });
        }
        generateVerificationCode() {
            return `${Math.floor(Math.random() * 90000) + 10000}`;
        }
    };
    UserService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
        __metadata("design:paramtypes", [typeorm_2.Repository,
            email_service_1.EmailService])
    ], UserService);
    return UserService;
})();
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map