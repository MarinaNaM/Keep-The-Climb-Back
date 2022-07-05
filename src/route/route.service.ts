import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { iRoute } from './entities/route.entity';

@Injectable()
export class RouteService {
    constructor(@InjectModel('Route') private readonly Route: Model<iRoute>) {}

    async create(createRouteDto: CreateRouteDto) {
        const newRoute = await this.Route.create(createRouteDto);
        return newRoute;
    }

    async findAll() {
        const result = await this.Route.find();
        return result;
    }

    async findOne(id: string) {
        const result = await this.Route.findById(id);
        return result;
    }

    async update(id: string, updateRouteDto: UpdateRouteDto) {
        return await this.Route.findByIdAndUpdate(id, updateRouteDto, {
            new: true,
        });
    }

    async remove(id: string) {
        const route = await this.Route.findById(id);
        const deleteRoute = await route.delete();
        return deleteRoute;
    }
}
