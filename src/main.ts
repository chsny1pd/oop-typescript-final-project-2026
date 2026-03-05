import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from './config/swagger.config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * ValidationPipe
   * ตรวจสอบ DTO validation
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ตัด field ที่ไม่มีใน DTO
      transform: true,
    }),
  );

  /**
   * Global Exception Filter
   */
  app.useGlobalFilters(new HttpExceptionFilter());

  /**
   * Global Interceptor
   * ใช้ format response
   */
  app.useGlobalInterceptors(new ResponseInterceptor());

  /**
   * Swagger
   */
  SwaggerConfig(app);

  await app.listen(3000);
}

bootstrap();