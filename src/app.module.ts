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
import { AddressesModule } from './modules/addresses/addresses.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { CommentsModule } from './modules/comments/comments.module';
import { IsOrOwnerMiddleware } from './middlewares/isOwner.middleware';
import { IsAdminMiddleware } from './middlewares/isadmin.middleware';
@Module({
  imports: [
    PrismaModule,
    UsersModule,
    LoginModule,
    AddressesModule,
    VehiclesModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, IsOrOwnerMiddleware).forRoutes({
      path: 'users/:userId',
      method: RequestMethod.PATCH,
    });
    consumer.apply(AuthMiddleware, IsOrOwnerMiddleware).forRoutes({
      path: 'users/:userId',
      method: RequestMethod.DELETE,
    });
    consumer
      .apply(AuthMiddleware, IsAdminMiddleware)
      .forRoutes({ path: 'vehicles', method: RequestMethod.POST });
    consumer
      .apply(AuthMiddleware, IsAdminMiddleware)
      .forRoutes({ path: 'vehicles/:vehicleId', method: RequestMethod.PATCH });
    consumer
      .apply(AuthMiddleware, IsAdminMiddleware)
      .forRoutes({ path: 'vehicles/:vehicleId', method: RequestMethod.DELETE });
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'comments/:vehicleId', method: RequestMethod.POST });
    consumer
      .apply(AuthMiddleware, IsOrOwnerMiddleware)
      .forRoutes({ path: 'comments/:vehicleId', method: RequestMethod.PATCH });
    consumer
      .apply(AuthMiddleware, IsOrOwnerMiddleware)
      .forRoutes({ path: 'comments/:vehicleId', method: RequestMethod.DELETE });
  }
}
