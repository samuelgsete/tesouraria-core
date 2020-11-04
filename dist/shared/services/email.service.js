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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require('nodemailer');
let EmailService = (() => {
    let EmailService = class EmailService {
        constructor() {
            this.transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'gseteapi@gmail.com',
                    pass: 'geracaosete'
                }
            });
        }
        sendMail(message, recipient) {
            const mailOptions = {
                from: 'gseteapi@gmail.com',
                to: `${recipient}`,
                subject: 'Cofirmação de conta',
                html: `${message}`
            };
            this.transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
        verifyUser(name, recipient, code) {
            const mailOptions = {
                from: 'gseteapi@gmail.com',
                to: `${recipient}`,
                subject: 'Cofirmação de conta',
                html: `<p>Olá ${name}, utlize o seguinte código para concluir seu cadastro: ${code}<p>`
            };
            this.transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    };
    EmailService = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], EmailService);
    return EmailService;
})();
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map