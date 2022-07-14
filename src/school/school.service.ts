import { Injectable, NotFoundException } from '@nestjs/common';
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
        const result = await this.School.find().populate({
            path: 'sectors',
            populate: {
                select: 'name length grade voteGrade',
                path: 'routes',
            },
        });
        return result;
    }

    async findOne(id: string) {
        const findSchool = await this.School.findById(id);
        if (!findSchool) throw new NotFoundException('School not found');
        const school = findSchool.populate({
            path: 'sectors',
            populate: {
                select: 'name length grade voteGrade',
                path: 'routes',
            },
        });
        return school;
    }

    async update(id: string, updateSchoolDto: UpdateSchoolDto) {
        const result = await this.School.findByIdAndUpdate(
            id,
            updateSchoolDto,
            {
                new: true,
            },
        );
        if (!result) throw new NotFoundException('School not found');
        return result;
    }

    async remove(id: string) {
        const result = await this.School.findByIdAndDelete(id);
        if (!result) throw new NotFoundException('School not found');
        return result;
    }
}
