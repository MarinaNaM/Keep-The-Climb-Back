import { Controller, Get, Param } from '@nestjs/common';
import { SchoolService } from './school.service';

@Controller('school')
export class SchoolController {
    constructor(private readonly schoolService: SchoolService) {}

    @Get()
    findAll() {
        return this.schoolService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.schoolService.findOne(id);
    }
}
