import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { AuthMiddleware } from './auth.middleware';

let req = { get: jest.fn().mockReturnValue('bearer 9999') };
const res: Response = {} as Response;
const next: NextFunction = jest.fn();
const mockAuthService = {
    decodedToken: jest.fn().mockReturnValue('token'),
    createToken: jest.fn(),
} as AuthService;
const authMiddleware = new AuthMiddleware(mockAuthService);

describe('Given the class AuthMiddleware', () => {
    describe('When use function is called with a valid token', () => {
        test('Then next function should be called', () => {
            (mockAuthService.decodedToken as jest.Mock).mockReturnValueOnce({});
            authMiddleware.use(req as unknown as Request, res, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When use function is called with not valid token', () => {
        test('Then it should throw an exception', () => {
            expect(() =>
                authMiddleware.use(req as unknown as Request, res, next),
            ).toThrow();
        });
    });
    describe('When use function is called with no token', () => {
        test('Then it should throw an exception', () => {
            req = { get: jest.fn().mockReturnValue('') };
            expect(() =>
                authMiddleware.use(req as unknown as Request, res, next),
            ).toThrow();
        });
    });
});
