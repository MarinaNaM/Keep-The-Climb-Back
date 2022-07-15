import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
        try {
            const newUser = await this.User.create({
                ...createUserDto,
                psw: this.bcrypt.encrypt(createUserDto.psw),
            });
            const token = this.auth.createToken(newUser.id);
            return {
                user: newUser,
                token,
            };
        } catch (error) {
            throw new BadRequestException((error as Error).message);
        }
    }

    async login(loginData: { email: string; psw: string }) {
        const user = await this.User.findOne({
            email: loginData.email,
        }).populate({ path: 'routes', populate: { path: 'route' } });
        if (user === null) throw new NotFoundException('User does not exist.');
        if (!this.bcrypt.compare(loginData.psw, user.psw))
            throw new UnauthorizedException('Password or email incorrect.');
        const token = this.auth.createToken(user.id);
        return {
            user,
            token,
        };
    }

    async loginWithToken(token: string) {
        const tokenData = this.auth.decodedToken(token.substring(7));
        if (typeof tokenData === 'string')
            throw new UnauthorizedException('Invalid token');
        const user = await this.User.findById(tokenData.id).populate({
            path: 'routes',
            populate: { path: 'route' },
        });
        if (user === null) throw new NotFoundException('User does not exist');
        const newToken = this.auth.createToken(user.id);
        return {
            user,
            token: newToken,
        };
    }

    async findAll() {
        const users = await this.User.find();

        return users;
    }

    async findOne(id: string) {
        const findUser = await this.User.findById(id);
        if (!findUser) throw new NotFoundException('User not found');
        const user = findUser;
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        if (updateUserDto.psw) {
            updateUserDto.psw = this.bcrypt.encrypt(updateUserDto.psw);
        }
        const updateUser = await this.User.findByIdAndUpdate(
            id,
            updateUserDto,
            {
                new: true,
            },
        );
        if (!updateUser) throw new NotFoundException('User not found');

        return updateUser;
    }

    async remove(id: string) {
        const result = await this.User.findByIdAndDelete(id);
        if (!result) throw new NotFoundException('User not found');

        return result;
    }

    async removeProfile(token: string) {
        const tokenData = this.auth.decodedToken(token.substring(7));
        if (typeof tokenData === 'string')
            throw new UnauthorizedException('Invalid token');
        const user = await this.User.findById(tokenData.id);
        if (!user) throw new NotFoundException('User does not exist');
        const deleteProfile = this.User.findByIdAndDelete(tokenData.id);
        return deleteProfile;
    }
}
