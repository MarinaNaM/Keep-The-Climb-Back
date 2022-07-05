import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import jsonwebtoken from 'jsonwebtoken';

jest.mock('jsonwebtoken');

// const verify = jest.spyOn(jwt, 'verify');
// const sign = jest.spyOn(jwt, 'sign');

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('When calling createToken method', () => {
    test('Then jwt.sing should be called ', () => {
      jsonwebtoken.sign = jest.fn();
      service.createToken('token');
      expect(jsonwebtoken.sign).toHaveBeenCalled();
    });
  });
  describe('When calling decodedToken method', () => {
    test('Then jsonwebtoken.verify should be called ', () => {
      jsonwebtoken.verify = jest.fn();
      service.createToken('token');
      expect(jsonwebtoken.verify).toHaveBeenCalled();
    });
  });
});
