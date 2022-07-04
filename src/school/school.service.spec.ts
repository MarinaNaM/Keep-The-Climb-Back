import { Test, TestingModule } from '@nestjs/testing';
import { SchoolService } from './school.service';

describe('SchoolService', () => {
    let service: SchoolService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SchoolService],
        }).compile();

        service = module.get<SchoolService>(SchoolService);
    });

    test.todo(
        'should be defined', //, () => { ahí ponía it en vez de test.todo
        //     expect(service).toBeDefined();
        //   }
    );
});
