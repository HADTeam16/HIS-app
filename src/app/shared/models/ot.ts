export class OT {
    id: number;
    status: boolean;
    doctors: {
        id: number;
        specialization: string;
        first_name: string;
        last_name: string;
    }[];
}
