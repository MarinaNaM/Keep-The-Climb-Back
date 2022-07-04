import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { SchoolService } from './school.service';

import { UpdateSchoolDto } from './dto/update-school.dto';

@Controller('school')
export class SchoolController {
    constructor(private readonly schoolService: SchoolService) {}

    //   @Post()
    //   create(@Body() createSchoolDto: CreateSchoolDto) {
    //     return this.schoolService.create(createSchoolDto);
    //   }

    @Get()
    findAll() {
        return this.schoolService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.schoolService.findOne(id);
    }
}
