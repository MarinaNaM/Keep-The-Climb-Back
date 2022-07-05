export class CreateUserDto {
    name: string;
    psw: string;
    img?: string;
    email: string;
    adress: {
        community?: string;
        province?: string;
    };
    routes: [{ route: string; isProject: boolean; isEnchain: boolean }];
}
