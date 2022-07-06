/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { routeSchema } from './entities/route.entity';
import { userSchema } from 'src/user/entities/user.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Route', schema: routeSchema },
            { name: 'User', schema: userSchema },
        ]),
    ],
    controllers: [RouteController],
    providers: [RouteService],
})
export class RouteModule {}
