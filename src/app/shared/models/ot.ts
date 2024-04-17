export class Surgeon {
    id: number;
    specialization: string;
    first_name: string;
    last_name: string;
}

export class OT {
    id: number;
    status: boolean;
    surgeons: Surgeon[];
}
