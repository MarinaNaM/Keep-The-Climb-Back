import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { RoleMiddleware } from './role.middleware';
import { Model } from 'mongoose';
import { iUser } from '../user/entities/user.entity';

let req = { get: jest.fn().mockReturnValue('bearer 9999') };
const res: Response = {} as Response;
const next: NextFunction = jest.fn();
const mockAuthService = {
    decodedToken: jest.fn().mockReturnValue({ id: '' }),
    createToken: jest.fn(),
} as AuthService;

const mockUser: CreateUserDto = {
    name: 'Pepe',
    psw: '123456789',
    img: 'src',
    email: 'pepe@hotmail.com',
    address: {
        community: 'Comunidad',
        province: 'Provincia',
    },
    role: 'admin',
    routes: [
        {
            route: '123456789012345678901234',
            isProject: false,
            isEnchain: false,
        },
    ],
};

const mockUserModel = {
    findById: jest.fn().mockResolvedValue(mockUser),
};

const roleMiddleware = new RoleMiddleware(
    mockUserModel as unknown as Model<iUser>,
    mockAuthService,
);

describe('Given the class RoleMiddleware', () => {
    describe('When use function is called with a valid token', () => {
        test('Then next function should be called', async () => {
            await roleMiddleware.use(req as unknown as Request, res, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When use function is called with not valid token', () => {
        test('Then it should throw an exception', async () => {
            (mockAuthService.decodedToken as jest.Mock).mockReturnValueOnce('');
            expect(
                async () =>
                    await roleMiddleware.use(
                        req as unknown as Request,
                        res,
                        next,
                    ),
            ).rejects.toThrow();
        });
    });

    describe('When use function is called with user role', () => {
        test('Then it should throw an exception', async () => {
            mockUserModel.findById.mockResolvedValueOnce({ role: 'user' });
            expect(
                async () =>
                    await roleMiddleware.use(
                        req as unknown as Request,
                        res,
                        next,
                    ),
            ).rejects.toThrow();
        });
    });
    describe('When use function is called with admin role', () => {
        test('Then it should call next function', async () => {
            await mockUserModel.findById.mockResolvedValueOnce({
                role: 'admin',
            });
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When use function is called with no token', () => {
        test('Then it should throw an exception', async () => {
            req = { get: jest.fn().mockReturnValueOnce('') };
            expect(
                async () =>
                    await roleMiddleware.use(
                        req as unknown as Request,
                        res,
                        next,
                    ),
            ).rejects.toThrow();
        });
    });
});
