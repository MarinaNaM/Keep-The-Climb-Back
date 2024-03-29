import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

@Controller('route')
export class RouteController {
    constructor(private readonly routeService: RouteService) {}

    @Post()
    create(@Body() createRouteDto: CreateRouteDto) {
        return this.routeService.create(createRouteDto);
    }

    @Get()
    findAll() {
        return this.routeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.routeService.findOne(id);
    }

    @Patch('/voteRoute/:id')
    updateVote(
        @Param('id') id: string,
        @Body() body: { user: string; vote: string },
    ) {
        return this.routeService.updateGrade(body.user, id, body.vote);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
        return this.routeService.update(id, updateRouteDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.routeService.remove(id);
    }
}
