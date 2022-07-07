import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { iSector } from './entities/sector.entity';

@Injectable()
export class SectorService {
    constructor(
        @InjectModel('Sector') private readonly Sector: Model<iSector>,
    ) {}

    async create(createSectorDto: CreateSectorDto) {
        const newSector = await this.Sector.create(createSectorDto);
        return newSector;
    }

    async findAll() {
        const result = await this.Sector.find();
        return result;
    }

    async findOne(id: string) {
        const result = await this.Sector.findById(id).populate('routes');
        return result;
    }

    async update(id: string, updateSectorDto: UpdateSectorDto) {
        return await this.Sector.findByIdAndUpdate(id, updateSectorDto, {
            new: true,
        });
    }

    async remove(id: string) {
        return await this.Sector.findByIdAndDelete(id);
    }
}
