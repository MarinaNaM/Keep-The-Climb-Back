import { Test, TestingModule } from '@nestjs/testing';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';

describe('RouteController', () => {
    let controller: RouteController;
    let service: RouteService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RouteController],
            providers: [
                {
                    provide: RouteService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                        updateGrade: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<RouteController>(RouteController);
        service = module.get<RouteService>(RouteService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('When calling controller.create', () => {
        test('Then service.create should be called', () => {
            controller.create({
                name: 'Test',
                length: 2,
                grade: '6a',
                voteGrade: [
                    {
                        user: '123456789012345678901234',
                        vote: 2,
                    },
                ],
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
        test('The service.findOne should be called', () => {
            controller.findOne('id');
            expect(service.findOne).toHaveBeenCalled();
        });
    });
    describe('When calling controller.updateVoted', () => {
        test('Then service.update should be called', () => {
            controller.updateVote('', { user: '', vote: 2 });
            expect(service.updateGrade).toHaveBeenCalled();
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
