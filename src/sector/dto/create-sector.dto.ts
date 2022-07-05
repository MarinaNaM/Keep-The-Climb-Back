export class CreateSectorDto {
    name: string;
    img: string;
    hoursSun: string;
    localization: {
        lat: number;
        lng: number;
    };
    routes: string;
}
