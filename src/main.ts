// import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { AppModule } from './app.module';

// async function bootstrap(): Promise<void> {
//   const app = await NestFactory.create(AppModule);

//   // Enable CORS
//   app.enableCors();

//   // Global validation pipe
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//     }),
//   );

//   // Swagger/OpenAPI documentation
//   const config = new DocumentBuilder()
//     .setTitle('NestJS Backend API')
//     .setDescription('API Documentation for NestJS Backend Project')
//     .setVersion('1.0')
//     .addTag('api')
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);

//   const port = 3000;
//   await app.listen(port);
//   console.log(`Application is running on: http://localhost:${port}`);
//   console.log(`Swagger documentation: http://localhost:${port}/api`);
// }

// bootstrap();
// main.ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // 1. นำเข้า Swagger

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- เพิ่มบรรทัดนี้ ---
  app.enableCors(); // อนุญาตให้ Frontend เชื่อมต่อได้
  // ------------------

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // ส่วนของ Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS Backend API')
    .setDescription('API Documentation for NestJS Backend Project')
    .setVersion('1.0')
    .addTag('api') // --- เพิ่มบรรทัดนี้เพื่อจัดหมวดหมู่ ---
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();