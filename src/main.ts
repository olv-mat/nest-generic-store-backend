import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/*
npx @nestjs/cli new <project>
cd <project>
*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
