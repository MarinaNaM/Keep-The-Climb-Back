import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { iSchool } from './entities/school.entity';

@Injectable()
export class SchoolService {
    constructor(
        @InjectModel('School') private readonly School: Model<iSchool>,
    ) {}

    async findAll() {
        const result = this.School.find().populate('sectors'); // pon el populate
        return `This action returns all school`;
    }

    findOne(id: number) {
        return `This action returns a #${id} school`;
    }

    update(id: number, updateSchoolDto: UpdateSchoolDto) {
        return `This action updates a #${id} school`;
    }

    remove(id: number) {
        return `This action removes a #${id} school`;
    }
}
