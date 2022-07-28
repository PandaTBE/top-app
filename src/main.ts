import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    /** добавление глобального перфикса. Все запросы к апи должны иметь в url /api/ */
    app.setGlobalPrefix('api');
    await app.listen(3000);
}
bootstrap();
