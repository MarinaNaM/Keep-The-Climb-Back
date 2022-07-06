import { isEmail } from './user.entity';

describe('Given isEmail function', () => {
    describe('When calling it to the validate email', () => {
        test('Then is should return true if it is a valid email', () => {
            const result = isEmail('test@gmail.com');
            expect(result).toBeTruthy();
        });
        test('If is not valid then shoud return false', () => {
            const result = isEmail('pepe');
            expect(result).toBeFalsy();
        });
    });
});
