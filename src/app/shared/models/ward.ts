import { PatientRegistration } from './user';

export class Ward extends PatientRegistration {
    wardId: number;
    floor: number;
    wardNumber: number;
    availableStatus: boolean;
    emergency: boolean;
}

export class NeedWard extends PatientRegistration {
    needWardId: number;
    requestTime: string;
}
