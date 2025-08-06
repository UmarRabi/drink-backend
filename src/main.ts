import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      preflightContinue: false,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    },
  });
  // const app = await NestFactory.create(AppModule,);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  // app.useGlobalInterceptors(new StatusInterceptor());
  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Drink Product Management API')
    .setDescription([
      'API for managing bottled drink brands, products, sales and history.',
      '',
      '📄 [View raw Swagger JSON](http://localhost:3000/swagger.json)'
    ].join('\n'))
    .setVersion('1.0')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);

  // Serve the raw Swagger JSON at /swagger.json
  app.use('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDoc);
  });

  // (Optional) Save JSON to disk for versioning or external tools
  writeFileSync(join(process.cwd(), 'swagger.json'), JSON.stringify(swaggerDoc, null, 2));

  // Serve Swagger UI at /api
  SwaggerModule.setup('api', app, swaggerDoc);

  await app.listen(3000);
}
bootstrap();
