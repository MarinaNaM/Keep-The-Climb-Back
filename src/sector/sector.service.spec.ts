import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { routeSchema } from '../route/entities/route.entity';
import { CreateSectorDto } from './dto/create-sector.dto';
import { sectorSchema } from './entities/sector.entity';
import { SectorService } from './sector.service';

describe('SectorService', () => {
    const mockSector: CreateSectorDto = {
        name: 'test',
        img: 'src',
        hoursSun: 'mañana',
        localization: {
            lat: 1234,
            lng: 5678,
        },
        routes: [],
    };

    const mockSectorModel = {
        create: jest.fn().mockResolvedValue(mockSector),
        find: jest.fn().mockResolvedValue(mockSector),
        findById: jest.fn().mockResolvedValue(mockSector),
        findByIdAndUpdate: jest.fn().mockResolvedValue(mockSector),
        findByIdAndDelete: jest.fn().mockResolvedValue(mockSector),
    };

    const mockRoute = {
        name: 'test-vías',
        length: 12,
        grade: '5+',
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
            .mockResolvedValue({ ...mockSector, save: jest.fn() }),
    };

    let service: SectorService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forFeature([
                    { name: 'Sector', schema: sectorSchema },
                    { name: 'Route', schema: routeSchema },
                ]),
            ],
            providers: [SectorService],
        })
            .overrideProvider(getModelToken('Sector'))
            .useValue(mockSectorModel)
            .overrideProvider(getModelToken('Route'))
            .useValue(mockRouteModel)
            .compile();

        service = module.get<SectorService>(SectorService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('When calling service.create', () => {
        test('Then it should return the saved sector', async () => {
            const result = await service.create(mockSector);
            expect(result).toEqual(mockSector);
        });
    });
    describe('When calling service.find', () => {
        test('Then it should return all sectors', async () => {
            mockSectorModel.find.mockResolvedValue(mockSector);
            const result = await service.findAll();
            expect(result).toEqual(mockSector);
        });
    });
    describe('When calling service.findById', () => {
        test('Then it should return one sector', async () => {
            mockSectorModel.findById.mockReturnValueOnce({
                populate: jest.fn().mockResolvedValue(mockSector),
            });
            const result = await service.findOne('');
            expect(result).toEqual(mockSector);
        });
    });
    describe('When calling service.findByIdAndUpdate', () => {
        test('Then it should return updated sector', async () => {
            const result = await service.update('', mockSector);
            expect(result).toEqual(mockSector);
        });
    });
    describe('When calling service.remove', () => {
        test('Then it should return remove sector', async () => {
            mockSectorModel.findByIdAndDelete.mockResolvedValue(mockSector);
            const result = await service.remove('');
            expect(result).toEqual(mockSector);
        });
    });
});
