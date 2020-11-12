"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treasuries = void 0;
let treasuries = (() => {
    class treasuries {
    }
    treasuries.nameNotNull = 'O nome não pode ser vázio';
    treasuries.nameLength = 'O nome deve conter no mínimo 4 e no máximo 30 caractares';
    treasuries.nameValid = 'O nome deve ser uma cadeia de caracteres';
    treasuries.initialAmountNotNull = 'O montante inicial não pode ser nulo';
    treasuries.initialAmountValid = 'O montante inicial deve ser numérico';
    treasuries.initialAmountMax = 'O montante inicial dever no máximo R$ 100000';
    treasuries.initialAmountMin = 'O montante inicial não pode ser negativo';
    treasuries.detailsValid = 'Os detalhes devem ser uma cadeia de caracteres';
    treasuries.detailsLength = 'Os detalhes devem conter no mínimo 4 e no máximo 255 caractares';
    return treasuries;
})();
exports.treasuries = treasuries;
//# sourceMappingURL=treasuries.messages.js.map