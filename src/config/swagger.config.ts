import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function SwaggerConfig(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('Example NestJS API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
}

// เปิดได้ที่ http://localhost:3000/api