"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenses = void 0;
let expenses = (() => {
    class expenses {
    }
    expenses.descriptionNotNul = 'A descrição não pode ser nula';
    expenses.descriptionLength = 'A descrição deve conter no mínimo 3 e no máximo 60 caracteres';
    expenses.descriptionValid = 'A descrição deve ser uma cadeia de caracteres válida';
    expenses.valueNotNull = 'O valor da não pode ser nulo';
    expenses.valueValid = 'O valor deve ser válido';
    expenses.valueMax = 'O valor dever no máximo R$ 100000';
    expenses.valueMin = 'O valor não pode ser negativo';
    expenses.typeNotNull = 'O tipo de transação é obrigatório';
    expenses.typeValid = 'O tipo de trasação deve ser uma cadeia de caracteres válida';
    expenses.dateNotNull = 'A data de registro é obrigatória';
    expenses.dateValid = 'A data de registro deve ser válida';
    expenses.detailsValid = 'Os detalhes devem ser uma cadeia de caracteres válida';
    expenses.detailsLength = 'Os detalhes devem conter no mínimo 3 e no máximo 255 caractares';
    return expenses;
})();
exports.expenses = expenses;
//# sourceMappingURL=expenses.messages.js.map