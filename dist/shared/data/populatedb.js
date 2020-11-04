"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopulateDB = void 0;
const typeorm_1 = require("typeorm");
class PopulateDB {
    constructor() { }
    async load() {
        console.log('Povoando banco de dados');
        const user = await typeorm_1.getConnection()
            .createQueryBuilder()
            .select("user");
    }
}
exports.PopulateDB = PopulateDB;
//# sourceMappingURL=populatedb.js.map