import { Injectable, NotFoundException } from '@nestjs/common';
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
        const result = await this.Sector.find().populate('routes');
        return result;
    }

    async findOne(id: string) {
        const findSector = await this.Sector.findById(id);
        if (!findSector) throw new NotFoundException('Sector not found');
        const sector = findSector.populate('routes');
        return sector;
    }

    async update(id: string, updateSectorDto: UpdateSectorDto) {
        const result = await this.Sector.findByIdAndUpdate(
            id,
            updateSectorDto,
            {
                new: true,
            },
        );
        if (!result) throw new NotFoundException('Sector not found');
        return result;
    }

    async remove(id: string) {
        const result = await this.Sector.findByIdAndDelete(id);
        if (!result) throw new NotFoundException('Sector not found');
        return result;
    }
}
