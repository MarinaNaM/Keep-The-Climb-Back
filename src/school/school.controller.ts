/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { SchoolService } from './school.service';

@Controller('school')
export class SchoolController {
    constructor(private readonly schoolService: SchoolService) {}

    @Post()
    create(@Body() CreateSchoolDto: CreateSchoolDto) {
        return this.schoolService.create(CreateSchoolDto);
    }

    @Get()
    findAll() {
        return this.schoolService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.schoolService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
        return this.schoolService.update(id, updateSchoolDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.schoolService.remove(id);
    }
}
