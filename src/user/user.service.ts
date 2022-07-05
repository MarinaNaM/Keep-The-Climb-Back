import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { BcryptService } from '../auth/bcrypt.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { iUser } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly User: Model<iUser>,
        private readonly auth: AuthService,
        private readonly bcrypt: BcryptService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const newUser = await this.User.create({
            ...createUserDto,
            passwd: this.bcrypt.encrypt(createUserDto.psw),
        });
        const token = this.auth.createToken(newUser.id);
        return {
            userData: newUser,
            token,
        };
    }

    async login(loginData: { email: string; passwd: string }) {
        const user = await this.User.findOne({
            email: loginData.email,
        });
        if (user === null) throw new NotFoundException('User does not exist.');
        if (!this.bcrypt.compare(loginData.passwd, user.psw))
            throw new UnauthorizedException('Password or email iconrrect.');
        const token = this.auth.createToken(user.id);
        return {
            user,
            token,
        };
    }

    async loginWithToken(token: string) {
        try {
            const tokenData = this.auth.decodedToken(
                token.substring(7),
            ) as JwtPayload;
            if (typeof tokenData === 'string')
                throw new UnauthorizedException('');
            const user = await (
                await this.User.findById(tokenData.id)
            ).populate('tasks');
            if (user === null)
                throw new NotFoundException('User does not exist');
            const newToken = this.auth.createToken(user.id);
            return {
                user,
                token: newToken,
            };
        } catch (ex) {
            throw new UnauthorizedException('Session expired');
        }
    }

    async findAll() {
        const users = await this.User.find();
        return users;
    }

    async findOne(id: string) {
        const user = await this.User.findById(id);
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const updateUser = await this.User.findByIdAndUpdate(
            id,
            updateUserDto,
            {
                new: true,
            },
        );
        return updateUser;
    }

    async remove(id: string) {
        const deleteUser = await this.User.findByIdAndDelete(id);
        return deleteUser;
    }
}
