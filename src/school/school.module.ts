import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { schoolSchema } from './entities/school.entity';
import { sectorSchema } from '../sector/entities/sector.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'School', schema: schoolSchema },
            { name: 'Sector', schema: sectorSchema },
        ]),
    ],
    controllers: [SchoolController],
    providers: [SchoolService],
})
export class SchoolModule {}
