"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
let users = (() => {
    class users {
    }
    users.nomeNotNull = 'O nome não pode ser vázio';
    users.nomeLength = 'O nome deve conter no mínimo 2 e no máximo 15 caractares';
    users.nomeValid = 'O nome deve ser uma cadeia de caracteres';
    users.sobrenomeNotNull = 'O sobrenome não pode ser vázio';
    users.sobrenomeLength = 'O sobrenome deve conter no mínimo 2 e no máximo 15 caractares';
    users.sobrenomeValid = 'O sobrenome deve ser uma cadeia de caracteres';
    users.emailNotNull = 'O email não pode ser vázio';
    users.emailLength = 'O email deve conter no mínimo 10 e no máximo 30 caractares';
    users.emailValid = 'O email deve ser válido';
    users.emailCreated = 'O email já está em uso';
    users.usernameNotNull = 'O usuário não pode ser vázio';
    users.usernameLength = 'O usuário deve conter no mínimo 4 e no máximo 15 caractares';
    users.usernameValid = 'O usuário deve ser uma cadeia de caracteres';
    users.usernameCreated = 'O usuário já está em uso';
    users.passwordNotNull = 'A senha não pode ser vázia';
    users.passwordLength = 'A senha deve conter no mínimo 4 e no máximo 15 caractares';
    users.passwordValid = 'A senha deve ser uma cadeia de caracteres';
    users.whatzappNotNull = 'O whatzapp não pode ser vázio';
    users.whatzappLength = 'O whatzapp deve conter no mínimo 10 caracteres e no máximo 15';
    users.whatzappValid = 'O whatzapp deve ser válido';
    return users;
})();
exports.users = users;
//# sourceMappingURL=user.messages.js.map