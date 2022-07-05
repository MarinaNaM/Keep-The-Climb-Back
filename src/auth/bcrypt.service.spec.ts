import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from './bcrypt.service';
import bcryptjs from 'bcryptjs';

describe('BcryptService', () => {
  let service: BcryptService;
  const mockEncrypt = jest.fn();
  const mockCompare = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    service = module.get<BcryptService>(BcryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('When encrypt method is calling', () => {
    test('Then hashSync shoul be called', () => {
      bcryptjs.hashSync = mockEncrypt;
      service.encrypt('');
      expect(mockEncrypt).toHaveBeenCalled();
    });
  });
  describe('When compare method is calling', () => {
    test('Then compareSync shoul be called', () => {
      bcryptjs.compareSync = mockCompare;
      service.compare('', '');
      expect(mockCompare).toHaveBeenCalled();
    });
  });
});
