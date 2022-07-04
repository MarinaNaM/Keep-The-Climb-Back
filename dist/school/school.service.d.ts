import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
export declare class SchoolService {
    create(createSchoolDto: CreateSchoolDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSchoolDto: UpdateSchoolDto): string;
    remove(id: number): string;
}
