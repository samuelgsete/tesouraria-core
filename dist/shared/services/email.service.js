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
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const CLIENT_ID = '189708702352-qu5lpcs8s2099mb9n7980kevapfr0kds.apps.googleusercontent.com';
const CLIENT_SECRET = '-2HmnY8ylUwM1b-sGu69LVoW';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04Y6A9lpJCycxCgYIARAAGAQSNwF-L9IrzxTdgG4MSdjhXA8T3c6RJGqZnlZtmFTcSYFUWlj0g_kxdbhCD10zxpjbSMJXbQy7KDs';
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
let EmailService = (() => {
    let EmailService = class EmailService {
        constructor() { }
        async authenticate() {
            try {
                const accessToken = await oAuth2Client.getAccessToken();
                this.transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: 'OAuth2',
                        user: 'samuelgsete@gmail.com',
                        clientId: CLIENT_ID,
                        clientSecret: CLIENT_SECRET,
                        refreshToken: REFRESH_TOKEN,
                        accessToken: accessToken
                    }
                });
            }
            catch (error) {
                console.log(error);
                return error;
            }
        }
        async sendMail(message, recipient) {
            await this.authenticate();
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
        async verifyUser(name, recipient, code) {
            await this.authenticate();
            const mailOptions = {
                from: 'Samuel de Souza Taveira - <gseteapi@gmail.com>',
                to: `${recipient}`,
                subject: 'Cofirmação de conta',
                html: `<p>Olá ${name}, Seja bem vindo! utilize o seguinte código para concluir seu cadastro no nosso sistema: ${code}<p>`
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
        async recoverUser(name, recipient, code) {
            await this.authenticate();
            const mailOptions = {
                from: 'Samuel de Souza Taveira - <gseteapi@gmail.com>',
                to: `${recipient}`,
                subject: 'Recuperação de Conta',
                html: `<p>Olá ${name}, parece que você não está conseguindo acessar sua conta. Utilize o seguinte código para recuperar seu acesso ao sistema: ${code}<p>`
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