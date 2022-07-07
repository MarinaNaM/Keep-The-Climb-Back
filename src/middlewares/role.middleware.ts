import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { iUser } from '../user/entities/user.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
    constructor(
        @InjectModel('User') private readonly User: Model<iUser>,
        private readonly auth: AuthService,
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.get('Authorization');
        if (!token) throw new UnauthorizedException('Token does not exist');
        const tokenData = this.auth.decodedToken(token.substring(7));
        if (typeof tokenData === 'string')
            throw new UnauthorizedException('Token invalid');
        const userId = tokenData.id as string;
        const user = await this.User.findById(userId);
        if (user.role === 'user')
            throw new UnauthorizedException('You have not access to this page');
        next();
    }
}
