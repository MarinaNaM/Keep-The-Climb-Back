import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
    createToken(id: string) {
        const secret = process.env.SECRET;
        const result = jwt.sign({ id }, secret);

        return result;
    }
    decodedToken(token: string) {
        const secret = process.env.SECRET;
        return jwt.verify(token, secret);
    }
}
