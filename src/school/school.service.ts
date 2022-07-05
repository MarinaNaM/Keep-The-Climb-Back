import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { iSchool } from './entities/school.entity';

@Injectable()
export class SchoolService {
    constructor(
        @InjectModel('School') private readonly School: Model<iSchool>,
    ) {}

    async findAll() {
        const result = this.School.find().populate('sectors'); // pon el populate
        return result;
    }

    findOne(id: string) {
        return `This action returns a #${id} school`;
    }
}
