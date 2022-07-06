import { Test, TestingModule } from '@nestjs/testing';
import { SectorController } from './sector.controller';
import { SectorService } from './sector.service';

describe('SectorController', () => {
    let controller: SectorController;
    let service: SectorService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SectorController],
            providers: [
                {
                    provide: SectorService,
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

        controller = module.get<SectorController>(SectorController);
        service = module.get<SectorService>(SectorService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('When calling controller.create', () => {
        test('Then service.create should be called', () => {
            controller.create({
                name: 'test',
                img: 'src',
                hoursSun: 'todo el año',
                localization: {
                    lat: 1234,
                    lng: 1234,
                },
                routes: [],
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
