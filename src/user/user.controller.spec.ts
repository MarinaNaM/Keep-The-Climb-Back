import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
    let controller: UserController;
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                        loginWithToken: jest.fn(),
                        login: jest.fn(),
                        removeProfile: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('When calling controller.create', () => {
        test('Then service.create should be called', () => {
            controller.create({
                name: 'User-test',
                psw: '1234',
                img: 'src',
                email: 'user@test.com',
                role: 'admin',
                address: {
                    community: 'Comunidad',
                    province: 'Povincia',
                },
                routes: [{ route: '', isProject: false, isEnchain: false }],
            });
            expect(service.create).toHaveBeenCalled();
        });
    });
    describe('When calling controller.login', () => {
        test('And user has token, then service.loginWithToken should be called', () => {
            const loginData = { email: '', psw: '' };
            const token = 'token';
            controller.login(loginData, token);
            expect(service.loginWithToken).toHaveBeenCalled();
        });
        test('And user has not token, then service.login shoud be called', () => {
            const loginData = { email: '', psw: '' };
            const token = null;
            controller.login(loginData, token);
            expect(service.login).toHaveBeenCalled();
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
    describe('When calling controller.removeProfile', () => {
        test('Then service.removeProfile should be called', () => {
            controller.removeProfile('');
            expect(service.removeProfile).toHaveBeenCalled();
        });
    });
});
