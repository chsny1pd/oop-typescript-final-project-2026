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
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ปรับปรุง Pipe ให้ดักจับละเอียดขึ้น
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            // ตัดข้อมูลที่ไม่อยู่ใน DTO ทิ้ง
    transform: true,            // แปลงประเภทข้อมูลอัตโนมัติ
    forbidNonWhitelisted: true, // ถ้าส่งตัวแปรเกินมา ให้ Error 400 ทันที
  }));

  await app.listen(3000);
}
bootstrap();