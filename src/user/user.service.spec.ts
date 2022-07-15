import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { BcryptService } from '../auth/bcrypt.service';
import { routeSchema } from '../route/entities/route.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { userSchema } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
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
        create: jest.fn().mockResolvedValue(mockUser),
        find: jest.fn().mockResolvedValue(mockUser),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn().mockResolvedValue(mockUser),
        findByIdAndDelete: jest.fn().mockResolvedValue(mockUser),
        findOne: jest.fn().mockResolvedValue(mockUser),
    };

    const mockRoute = {
        name: 'Test',
        length: 23,
        grade: '4+',
        voteGrade: [
            {
                user: '123456789012345678901234',
                vote: 2,
            },
        ],
    };

    const mockRouteModel = {
        findById: jest
            .fn()
            .mockResolvedValue({ ...mockRoute, save: jest.fn() }),
        findByIfAndUpdate: jest
            .fn()
            .mockResolvedValue({ ...mockRoute, name: 'updated' }),
    };

    const mockBcrypt = {
        encrypt: jest.fn().mockReturnValue('hashpsw'),
        compare: jest.fn().mockReturnValue(true),
    };

    const mockAuth = {
        decodedToken: jest.fn().mockReturnValue({ id: 'id' }),
        createToken: jest.fn().mockReturnValue('1f1f1f'),
    };

    const mockResponse = {
        user: mockUser,
        token: '1f1f1f',
    };

    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forFeature([
                    { name: 'User', schema: userSchema },
                    { name: 'Route', schema: routeSchema },
                ]),
            ],
            providers: [
                UserService,
                { provide: AuthService, useValue: mockAuth },
                { provide: BcryptService, useValue: mockBcrypt },
            ],
        })
            .overrideProvider(getModelToken('Route'))
            .useValue(mockRouteModel)
            .overrideProvider(getModelToken('User'))
            .useValue(mockUserModel)
            .compile();

        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('When calling service.removeProfile', () => {
        test('And the user does not exist, then should throw an exception', async () => {
            mockUserModel.findById.mockResolvedValueOnce(null);
            expect(async () => {
                await service.removeProfile('token');
            }).rejects.toThrow();
        });
    });

    describe('When calling service.create', () => {
        test('Then it should return the saved user', async () => {
            const result = await service.create(mockUser);
            expect(result).toEqual(mockResponse);
        });
        test('And is not valid data, then throw an exception', async () => {
            mockUserModel.create.mockRejectedValueOnce(null);
            expect(
                async () => await service.create(mockUser),
            ).rejects.toThrow();
        });
    });

    describe('When calling service.login with valid login info', () => {
        test('Then it should return the user data and token', async () => {
            mockUserModel.findOne.mockReturnValueOnce({
                populate: jest.fn().mockResolvedValue(mockUser),
            });
            const result = await service.login({
                email: mockUser.email,
                psw: mockUser.psw,
            });
            expect(result).toEqual(mockResponse);
        });
    });

    describe('When calling service.login with invalid email', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockUserModel.findOne.mockResolvedValueOnce(null);
            expect(async () => {
                await service.login({
                    email: mockUser.email,
                    psw: mockUser.psw,
                });
            }).rejects.toThrow();
        });
    });

    describe('When calling service.login with invalid password', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockBcrypt.compare.mockReturnValueOnce(false);
            expect(async () => {
                await service.login({
                    email: mockUser.email,
                    psw: mockUser.psw,
                });
            }).rejects.toThrow();
        });
    });

    describe('When calling service.loginWithToken with a valid token', () => {
        test('Then it should return the user data and token', async () => {
            mockUserModel.findById.mockReturnValueOnce({
                populate: jest.fn().mockResolvedValue(mockUser),
            });
            const result = await service.loginWithToken('token');
            expect(result).toEqual(mockResponse);
        });
    });

    describe('When calling service.loginWithToken with invalid', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockAuth.decodedToken.mockReturnValueOnce('error');
            expect(async () => {
                await service.loginWithToken('token');
            }).rejects.toThrow();
        });
    });

    describe('When calling service.loginWithToken with a valid token but user does not exist', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockUserModel.findById.mockResolvedValueOnce(null);
            expect(async () => {
                await service.loginWithToken('token');
            }).rejects.toThrow();
        });
    });

    describe('When calling service.find', () => {
        test('Then it should return all users', async () => {
            mockUserModel.find.mockResolvedValue(mockUser);
            const result = await service.findAll();
            expect(result).toEqual(mockUser);
        });
    });
    describe('When calling service.removeProfile', () => {
        test('Then it should return remove user profile', async () => {
            mockUserModel.findById.mockResolvedValueOnce({
                delete: jest.fn().mockResolvedValue(mockUser),
            });
            const result = await service.removeProfile('');
            expect(result).toEqual(mockUser);
        });
    });
    describe('When calling service.removeProfile', () => {
        test('And the token is invalid, then should throw an exception', () => {
            mockAuth.decodedToken.mockReturnValueOnce('error');
            expect(async () => {
                await service.removeProfile('token');
            }).rejects.toThrow();
        });
    });
    describe('When calling service.findById', () => {
        test('Then it should return one user', async () => {
            mockUserModel.findById.mockResolvedValue(mockUser);
            const result = await service.findOne('');
            expect(result).toEqual(mockUser);
        });
        test('And id is not valid, then should throw an exception', async () => {
            mockUserModel.findById.mockResolvedValueOnce(null);
            expect(async () => await service.findOne('')).rejects.toThrow();
        });
    });
    describe('When calling service.findByIdAndUpdate', () => {
        test('Then it should return updated user', async () => {
            const result = await service.update('', mockUser);
            expect(result).toEqual(mockUser);
        });
        test('And id is not valid, then should throw an exception', async () => {
            mockUserModel.findByIdAndUpdate.mockResolvedValueOnce(null);
            expect(
                async () => await service.update('', mockUser),
            ).rejects.toThrow();
        });
    });
    describe('When calling service.remove', () => {
        test('Then it should return remove user', async () => {
            mockUserModel.findByIdAndDelete.mockResolvedValue(mockUser);
            const result = await service.remove('');
            expect(result).toEqual(mockUser);
        });
        test('And id is not valid, then should throw an exception', async () => {
            mockUserModel.findByIdAndDelete.mockResolvedValue(null);
            expect(async () => await service.remove('')).rejects.toThrow();
        });
    });
});
