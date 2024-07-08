"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
function setupSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Project management system API')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
}
async function start() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    if (process.env.CLIENT_DIR)
        app.setGlobalPrefix('api');
    if (process.env.NODE_ENV === 'development')
        setupSwagger(app);
    await app.listen(process.env.PORT || 3000);
}
start();
//# sourceMappingURL=main.js.map