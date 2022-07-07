import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { iUser } from '../user/entities/user.entity';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { iRoute } from './entities/route.entity';

@Injectable()
export class RouteService {
    constructor(
        @InjectModel('Route') private readonly Route: Model<iRoute>,
        @InjectModel('User') private readonly User: Model<iUser>,
    ) {}

    async create(createRouteDto: CreateRouteDto) {
        const newRoute = await this.Route.create(createRouteDto);
        return newRoute;
    }

    async findAll() {
        const result = await this.Route.find();
        return result;
    }

    async findOne(id: string) {
        try {
            if (id.length !== 24) throw new BadRequestException('ID not valid');
            const result = await this.Route.findById(id);
            return result;
        } catch (error) {
            throw new BadRequestException('Route not found');
        }
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

    async updateGrade(idUser: string, idRoute: string, voteGrade: string) {
        const voteGradeNumber = Number(voteGrade);
        if (Number.isNaN(voteGradeNumber))
            throw new NotAcceptableException('voteGrade has to be a number');
        const route = await this.Route.findById(idRoute);
        if (!route) throw new NotFoundException('Route not found');

        const findUser = await this.User.findById(idUser);
        if (!findUser) throw new NotFoundException('User does not found');

        const newVote = { user: idUser, vote: voteGradeNumber };
        const voted = route.voteGrade.some(
            (item) => item.user.toString() === idUser,
        );

        if (!voted) {
            route.voteGrade.push(newVote);
            route.save();
            return newVote;
        } else {
            throw new ForbiddenException('You already voted this route');
        }
    }
}
