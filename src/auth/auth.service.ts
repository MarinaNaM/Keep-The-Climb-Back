import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
@Injectable()
export class AuthService {
    createToken(id: string) {
        const secret = process.env.SECRET;
        const result = sign({ id }, secret);

        return result;
    }
    decodedToken(token: string) {
        const secret = process.env.SECRET;
        const result = verify(token, secret);
        return result;
    }
}
