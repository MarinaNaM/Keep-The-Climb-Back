import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly auth: AuthService) {}
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.get('Authroization').substring(7);
        const tokenData = this.auth.decodedToken(token);
        if (typeof tokenData === 'string')
            throw new JsonWebTokenError('Token invalid');
        next();
    }
}
