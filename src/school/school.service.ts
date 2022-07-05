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

    async create(createSchoolDto: CreateSchoolDto) {
        const newSchool = await this.School.create(createSchoolDto);
        return newSchool;
    }

    async findAll() {
        const result = await this.School.find();
        return result;
    }

    async findOne(id: string) {
        const result = await this.School.findById(id);
        return result;
    }

    async update(id: string, updateSchoolDto: UpdateSchoolDto) {
        return this.School.findByIdAndUpdate(id, updateSchoolDto, {
            new: true,
        });
    }

    async remove(id: string) {
        const school = await this.School.findById(id);
        const deleteSchool = await school.delete();
        return deleteSchool;
    }
}
