import { Module } from '@nestjs/common';
import { SectorService } from './sector.service';
import { SectorController } from './sector.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { routeSchema } from '../route/entities/route.entity';
import { sectorSchema } from './entities/sector.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Sector', schema: sectorSchema },
            { name: 'Route', schema: routeSchema },
        ]),
    ],
    controllers: [SectorController],
    providers: [SectorService],
})
export class SectorModule {}
