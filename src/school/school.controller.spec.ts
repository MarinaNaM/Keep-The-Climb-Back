import { Test, TestingModule } from '@nestjs/testing';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';

describe('SchoolController', () => {
    let controller: SchoolController;
    let service: SchoolService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SchoolController],
            providers: [
                {
                    provide: SchoolService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<SchoolController>(SchoolController);
        service = module.get<SchoolService>(SchoolService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('When calling controller.create', () => {
        test('Then service.create should be called', () => {
            controller.create({
                name: 'test',
                img: 'src',
                period: 'todo el año',
                localization: {
                    lat: 1234,
                    lng: 5678,
                },
                sectors: [],
            });
            expect(service.create).toHaveBeenCalled();
        });
    });
    describe('When calling controller.findAll', () => {
        test('Then service.findAll should be called', () => {
            controller.findAll();
            expect(service.findAll).toHaveBeenCalled();
        });
    });
    describe('When calling controller.findOne', () => {
        test('Then service.findOne should be called', () => {
            controller.findOne('');
            expect(service.findOne).toHaveBeenCalled();
        });
    });
    describe('When calling controller.update', () => {
        test('Then service.update should be called', () => {
            controller.update('', {});
            expect(service.update).toHaveBeenCalled();
        });
    });
    describe('When calling controller.remove', () => {
        test('Then service.remove should be called', () => {
            controller.remove('');
            expect(service.remove).toHaveBeenCalled();
        });
    });
});
