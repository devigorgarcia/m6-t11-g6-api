import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { LoginModule } from './modules/login/login.module';
import { NestModule } from '@nestjs/common/interfaces/modules';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { RequestMethod } from '@nestjs/common/enums';
import { IsAdminOrOwnerMiddleware } from './middlewares/isaAdminOrOwner.middleware';
import { AddressesModule } from './modules/addresses/addresses.module';

@Module({
  imports: [PrismaModule, UsersModule, LoginModule, AddressesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, IsAdminOrOwnerMiddleware).forRoutes({
      path: 'users/:userId',
      method: RequestMethod.PATCH,
    });
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'users/:userId',
      method: RequestMethod.DELETE,
    });
  }
}
