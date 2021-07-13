import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import './app.database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Hotel API')
    .setDescription('Hotel API')
    .build();
  const doc = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, doc);

  await app.listen(3000);
}
bootstrap();
