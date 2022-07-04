import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { schoolSchema } from './entities/school.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'School', schema: schoolSchema }]),
    ],
    controllers: [SchoolController],
    providers: [SchoolService],
})
export class SchoolModule {}

