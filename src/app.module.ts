import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { EjsModule } from './ejs/ejs.module';

@Module({
  imports: [AuthModule, ChatModule, EjsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
