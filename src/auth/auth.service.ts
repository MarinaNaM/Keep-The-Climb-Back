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
        console.log(token);
        const secret = process.env.SECRET;
        console.log(secret);
        const result = verify(token, secret);
        return result;
    }
}
