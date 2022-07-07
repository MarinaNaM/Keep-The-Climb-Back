export class CreateUserDto {
    name: string;
    psw: string;
    img?: string;
    email: string;
    address: {
        community?: string;
        province?: string;
    };
    role: 'admin' | 'user';
    routes: [{ route: string; isProject: boolean; isEnchain: boolean }];
}
