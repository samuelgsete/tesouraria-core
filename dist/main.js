"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./shared/exceptions/http-exception.filter");
const persistense_exception_filter_1 = require("./shared/exceptions/persistense-exception.filter");
const generic_exception_filter_1 = require("./shared/exceptions/generic-exception.filter");
const is_created_exception_filter_1 = require("./shared/exceptions/is-created-exception.filter");
const validation_exception_filter_1 = require("./shared/exceptions/validation-exception.filter");
const validation_custom_pipe_1 = require("./shared/pipes/validation-custom.pipe");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.useGlobalPipes(new validation_custom_pipe_1.ValidationPipe());
    app.useGlobalFilters(new generic_exception_filter_1.GenericExceptionFilter(), new http_exception_filter_1.HttpExceptionFilter(), new persistense_exception_filter_1.PersistenceExceptionFilter(), new is_created_exception_filter_1.IsCreatedExceptionFeilter(), new validation_exception_filter_1.ValidationExceptionFilter());
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map