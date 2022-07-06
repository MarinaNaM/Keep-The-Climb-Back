export class CreateRouteDto {
    name: string;
    length: number;
    grade: string;
    voteGrade: [
        {
            user: string;
            vote: number;
        },
    ];
}
