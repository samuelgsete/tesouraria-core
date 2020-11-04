"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCreatedEception = void 0;
const common_1 = require("@nestjs/common");
class IsCreatedEception extends common_1.HttpException {
    constructor(message, code) {
        super(message, code);
    }
}
exports.IsCreatedEception = IsCreatedEception;
//# sourceMappingURL=is-created.exception.js.map