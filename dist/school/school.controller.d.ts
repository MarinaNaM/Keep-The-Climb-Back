import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
export declare class SchoolController {
    private readonly schoolService;
    constructor(schoolService: SchoolService);
    create(createSchoolDto: CreateSchoolDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateSchoolDto: UpdateSchoolDto): string;
    remove(id: string): string;
}
