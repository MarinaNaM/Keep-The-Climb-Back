export class CreateSchoolDto {
    name: string;
    img: string;
    period: string;
    localization: {
        lat: number;
        lng: number;
    };
    sectors: Array<string>;
}

