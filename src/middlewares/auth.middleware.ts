import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly auth: AuthService) {}
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.get('Authorization');
        if (!token) throw new UnauthorizedException('Token does not exist');
        const tokenData = this.auth.decodedToken(token.substring(7));
        if (typeof tokenData === 'string')
            throw new JsonWebTokenError('Token invalid');
        next();
    }
}
