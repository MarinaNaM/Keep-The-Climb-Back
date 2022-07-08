/* istanbul ignore file */
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolModule } from './school/school.module';
import { SectorModule } from './sector/sector.module';
import { RouteModule } from './route/route.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { RoleMiddleware } from './middlewares/role.middleware';
import { AuthService } from './auth/auth.service';
import { userSchema } from './user/entities/user.entity';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(
            process.env.NODE_ENV === 'test'
                ? process.env.URL_MONGO_TEST
                : process.env.URL_MONGO,
        ),
        SchoolModule,
        SectorModule,
        RouteModule,
        UserModule,
        MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    ],
    controllers: [AppController],
    providers: [AppService, AuthService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware) //Aquí puedes entrar sin estar logeado
            .exclude(
                { path: 'route', method: RequestMethod.GET },
                { path: 'school', method: RequestMethod.GET },
                { path: 'school/:id', method: RequestMethod.GET },
                { path: 'sector', method: RequestMethod.GET },
                { path: 'sector/:id', method: RequestMethod.GET },
                { path: 'user', method: RequestMethod.POST },
                { path: 'user/login', method: RequestMethod.POST },
            )
            .forRoutes('*');
        consumer
            .apply(RoleMiddleware) //Aquí puedes entrar sin ser admin
            .exclude(
                { path: 'route', method: RequestMethod.GET },
                { path: 'route/:id', method: RequestMethod.GET },
                { path: 'route/voteRoute/:id', method: RequestMethod.PATCH },
                { path: 'school', method: RequestMethod.GET },
                { path: 'school/:id', method: RequestMethod.GET },
                { path: 'sector', method: RequestMethod.GET },
                { path: 'sector/:id', method: RequestMethod.GET },
                { path: 'user', method: RequestMethod.POST },
                { path: 'user/login', method: RequestMethod.POST },
                { path: 'user/:id', method: RequestMethod.GET },
                { path: 'user/:id', method: RequestMethod.PATCH },
                { path: 'user', method: RequestMethod.DELETE },
            )
            .forRoutes('*');
    }
}
