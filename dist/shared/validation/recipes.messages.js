"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipes = void 0;
let recipes = (() => {
    class recipes {
    }
    recipes.descriptionNotNul = 'A descrição não pode ser nula';
    recipes.descriptionLength = 'A descrição deve conter no mínimo 3 e no máximo 60 caracteres';
    recipes.descriptionValid = 'A descrição deve ser uma cadeia de caracteres válida';
    recipes.valueNotNull = 'O valor não pode ser nulo';
    recipes.valueValid = 'O valor deve ser válido';
    recipes.offererValid = 'O nome do ofertante deve ser válido';
    recipes.offererLength = 'O nome do ofertante deve conter no mínimo 2 e no máximo 60 caracteres';
    recipes.typeNotNull = 'O tipo de transação é obrigatório';
    recipes.typeValid = 'O tipo de trasação deve ser uma cadeia de caracteres válida';
    recipes.dateNotNull = 'A data de registro é obrigatória';
    recipes.dateValid = 'A data de registro deve ser válida';
    recipes.detailsValid = 'Os detalhes devem ser uma cadeia de caracteres válida';
    recipes.detailsLength = 'Os detalhes devem conter no mínimo 3 e no máximo 255 caractares';
    return recipes;
})();
exports.recipes = recipes;
//# sourceMappingURL=recipes.messages.js.map