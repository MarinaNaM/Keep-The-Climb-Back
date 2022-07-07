import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { RouteService } from './route.service';
import { routeSchema } from './entities/route.entity';
import { userSchema } from '../user/entities/user.entity';
import { CreateRouteDto } from './dto/create-route.dto';

describe('RouteService', () => {
    const mockRoute: CreateRouteDto = {
        name: 'Test',
        length: 23,
        grade: '4+',
        voteGrade: [
            {
                user: '123456789012345678901234',
                vote: '2',
            },
        ],
    };

    const mockRouteModel = {
        create: jest.fn().mockResolvedValue(mockRoute),
        find: jest.fn().mockResolvedValue(mockRoute),
        findById: jest.fn().mockResolvedValue(mockRoute),
        findByIdAndUpdate: jest.fn().mockResolvedValue(mockRoute),
        findByIdAndDelete: jest.fn().mockResolvedValue(mockRoute),
    };

    const mockUser = {
        name: 'Pepe',
        psw: '123456789',
        img: 'src',
        email: 'pepe@hotmail.com',
        address: {
            community: 'Comunidad',
            province: 'Provincia',
        },
        routes: [
            {
                route: '123456789012345678901234',
                isProject: false,
                isEnchain: false,
            },
        ],
    };

    const mockUserModel = {
        findById: jest.fn().mockResolvedValue({ ...mockUser, save: jest.fn() }),
        findByIfAndUpdate: jest
            .fn()
            .mockResolvedValue({ ...mockUser, name: 'updated' }),
    };

    let service: RouteService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forFeature([
                    { name: 'Route', schema: routeSchema },
                    { name: 'User', schema: userSchema },
                ]),
            ],
            providers: [RouteService],
        })
            .overrideProvider(getModelToken('Route'))
            .useValue(mockRouteModel)
            .overrideProvider(getModelToken('User'))
            .useValue(mockUserModel)
            .compile();

        service = module.get<RouteService>(RouteService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('When calling service.create', () => {
        test('Then it should return the saved route', async () => {
            const result = await service.create(mockRoute);
            expect(result).toEqual(mockRoute);
        });
    });
    describe('When calling service.find', () => {
        test('Then it should return all routes ', async () => {
            mockRouteModel.find.mockResolvedValue(mockRoute);
            const result = await service.findAll();
            expect(result).toEqual(mockRoute);
        });
    });
    describe('When calling service.findById', () => {
        test('Then it should return one route', async () => {
            mockRouteModel.findById.mockResolvedValue(mockRoute);
            const result = await service.findOne('123456789012345678901234');
            expect(result).toEqual(mockRoute);
        });
        test('And the route id is not valid', async () => {
            mockRouteModel.findById.mockResolvedValue(mockRoute);
            expect(
                async () => await service.findOne('12345678901234567890'),
            ).rejects.toThrow();
        });
    });
    describe('When calling service.findByIdAndUpdate', () => {
        test('Then it should return updated route ', async () => {
            const result = await service.update('', mockRoute);
            expect(result).toEqual(mockRoute);
        });
    });
    describe('When calling service.remove', () => {
        test('Then it should return remove route', async () => {
            mockRouteModel.findById.mockResolvedValueOnce({
                delete: jest.fn().mockResolvedValue(mockRoute),
            });
            const result = await service.remove('');
            expect(result).toEqual(mockRoute);
        });
    });
    describe('When calling service.updateGrade', () => {
        test('And route does not found, then it should throw error', async () => {
            mockRouteModel.findById.mockResolvedValue(null);
            mockUserModel.findById.mockResolvedValue(mockUser);
            expect(async () => {
                await service.updateGrade('', '', '8');
            }).rejects.toThrow();
        });
        test('And the route is voted yet, then should update grade ', async () => {
            mockUserModel.findById.mockResolvedValue(mockUser);
            mockRouteModel.findById.mockResolvedValueOnce({
                ...mockRoute,
                save: jest.fn(),
            });
            const result = await service.updateGrade('', '', '8');
            expect(result).toEqual({ user: '', vote: 8 });
        });
        test('And user does not found, then it should throw error', async () => {
            mockRouteModel.findById.mockResolvedValue(mockRoute);
            mockUserModel.findById.mockResolvedValue(null);
            expect(async () => {
                await service.updateGrade('', '', '8');
            }).rejects.toThrow();
        });
        test('And vote is a number, then throw an exception', () => {
            mockUserModel.findById.mockResolvedValue(mockUser);
            mockRouteModel.findById.mockResolvedValueOnce({
                ...mockRoute,
                save: jest.fn(),
            });
            expect(
                async () => await service.updateGrade('', '', 'pecera'),
            ).rejects.toThrow();
        });

        test('And the route is voted by the user, then should throw error', async () => {
            mockRouteModel.findById.mockResolvedValue(mockRoute);
            mockUserModel.findById.mockResolvedValue(mockUser);
            expect(async () => {
                await service.updateGrade('', '', '8');
            }).rejects.toThrow();
        });
    });
});
