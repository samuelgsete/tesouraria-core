"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treasury = void 0;
let treasury = (() => {
    class treasury {
    }
    treasury.nameNotNull = 'O nome não pode ser vázio';
    treasury.nameLength = 'O nome deve conter no mínimo 2 e no máximo 30 caractares';
    treasury.nameValid = 'O nome deve ser uma cadeia de caracteres';
    treasury.balanceCurrentNotNull = 'O saldo Atual não pode ser nulo';
    treasury.balanceCurrentNumeric = 'O saldo atual deve ser numérico';
    treasury.openingBalanceNotNull = 'O saldo inicial não pode ser nulo';
    treasury.openingBalanceNumeric = 'O saldo inicial deve ser numérico';
    treasury.detailsValid = 'Os detalhes devem ser uma cadeia de caracteres';
    treasury.detailsLength = 'O nome deve conter no mínimo 2 e no máximo 255 caractares';
    treasury.userIdNotNull = 'O userId não pode ser nulo';
    treasury.userIdNumeric = 'O userId deve ser númerico';
    return treasury;
})();
exports.treasury = treasury;
//# sourceMappingURL=treasury.messages.js.map