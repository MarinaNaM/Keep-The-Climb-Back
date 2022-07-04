import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';

@Module({
  controllers: [RouteController],
  providers: [RouteService]
})
export class RouteModule {}
