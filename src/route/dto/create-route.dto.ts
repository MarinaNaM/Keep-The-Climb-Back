export class CreateRouteDto {
    name: string;
    img: string;
    length: number;
    grade: number;
    voteGrade: [
        {
            idUsuario: string;
            vote: string;
        },
    ];
    isProject: boolean;
    isEnchain: boolean;
    users: string;
}
