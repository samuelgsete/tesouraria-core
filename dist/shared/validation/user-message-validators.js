"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMessageValidators = exports.TypeError = void 0;
var TypeError;
(function (TypeError) {
    TypeError["NOT_NULL"] = "23502";
    TypeError["UNIQUE"] = "23505";
    TypeError["NOT_INTEGER"] = "22P02";
})(TypeError = exports.TypeError || (exports.TypeError = {}));
class UserMessageValidators {
    constructor() {
        this.messages = [
            { type: TypeError.NOT_NULL, property: 'name', message: 'O nome não pode ser nulo' },
            { type: TypeError.NOT_NULL, property: 'surname', message: 'O sobrenome não pode ser nulo' },
            { type: TypeError.NOT_NULL, property: 'email', message: 'O email não pode ser nulo' },
            { type: TypeError.NOT_NULL, property: 'username', message: 'O usuario não pode ser nulo' },
            { type: TypeError.NOT_NULL, property: 'password', message: 'A senha não pode ser nula' },
            { type: TypeError.UNIQUE, property: 'username', message: 'O usuario já está sendo usado' },
            { type: TypeError.UNIQUE, property: 'email', message: 'O email já está sendo usado' },
        ];
    }
    getMessage(property, type) {
        let message = '';
        let result = this.messages.filter(message => {
            return message.property == property && message.type == type;
        });
        message = result[0].message;
        return message;
    }
}
exports.UserMessageValidators = UserMessageValidators;
//# sourceMappingURL=user-message-validators.js.map