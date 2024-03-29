import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { sectorSchema } from '../sector/entities/sector.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { schoolSchema } from './entities/school.entity';
import { SchoolService } from './school.service';

describe('SchoolService', () => {
    const mockSchool: CreateSchoolDto = {
        name: 'test',
        img: 'scr',
        period: 'todo el año',
        localization: {
            lat: 1234,
            lng: 5678,
        },
        sectors: [],
    };

    const mockSchoolModel = {
        create: jest.fn().mockResolvedValue(mockSchool),
        find: jest.fn().mockResolvedValue(mockSchool),
        findById: jest.fn().mockResolvedValue(mockSchool),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn().mockResolvedValue(mockSchool),
    };

    const mockSector = {
        name: 'Test-Sector',
        hoursSun: 'mañana',
    };

    const mockSectorModel = {
        findById: jest
            .fn()
            .mockResolvedValue({ ...mockSector, save: jest.fn() }),
        findByIfAndUpdate: jest
            .fn()
            .mockResolvedValue({ ...mockSector, name: 'updated' }),
    };

    let service: SchoolService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forFeature([
                    { name: 'School', schema: schoolSchema },
                    { name: 'Sector', schema: sectorSchema },
                ]),
            ],
            providers: [SchoolService],
        })
            .overrideProvider(getModelToken('School'))
            .useValue(mockSchoolModel)
            .overrideProvider(getModelToken('Sector'))
            .useValue(mockSectorModel)
            .compile();

        service = module.get<SchoolService>(SchoolService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('When calling service.create', () => {
        test('Then it should retunr the saved school', async () => {
            const result = await service.create(mockSchool);
            expect(result).toEqual(mockSchool);
        });
    });
    describe('When calling service.find', () => {
        test('Then it should return all schools', async () => {
            mockSchoolModel.find.mockReturnValueOnce({
                populate: jest.fn().mockResolvedValue(mockSchool),
            });
            const result = await service.findAll();
            expect(result).toEqual(mockSchool);
        });
    });
    describe('When calling service.findById', () => {
        test('Then it should return one route', async () => {
            mockSchoolModel.findById.mockReturnValueOnce({
                populate: jest.fn().mockResolvedValue(mockSchool),
            });
            const result = await service.findOne('123456789012345678901234');
            expect(result).toEqual(mockSchool);
        });
        test('And id is not valid, then should throw an exception', async () => {
            mockSchoolModel.findById.mockReturnValueOnce(null);
            expect(
                async () => await service.findOne('123456789012345678901234'),
            ).rejects.toThrow();
        });
    });
    describe('When calling service.findByIdAndUpdate', () => {
        test('Then it should return updated route', async () => {
            mockSchoolModel.findByIdAndUpdate.mockResolvedValue(mockSchool);
            const result = await service.update('', mockSchool);
            expect(result).toEqual(mockSchool);
        });
        test('And id is not valid, then should throw an exception', async () => {
            mockSchoolModel.findByIdAndUpdate.mockResolvedValueOnce(null);
            expect(
                async () => await service.update('', mockSchool),
            ).rejects.toThrow();
        });
    });
    describe('When calling service.remove', () => {
        test('Then it should return remove school', async () => {
            mockSchoolModel.findByIdAndDelete.mockResolvedValue(mockSchool);
            const result = await service.remove('');
            expect(result).toEqual(mockSchool);
        });
        test('And id is not valid, then should throw an exception', async () => {
            mockSchoolModel.findByIdAndDelete.mockResolvedValueOnce(null);
            expect(async () => await service.remove('')).rejects.toThrow();
        });
    });
});
