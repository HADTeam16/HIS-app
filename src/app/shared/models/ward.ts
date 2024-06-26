import { PatientRegistration } from './user';

export class Ward extends PatientRegistration {
    wardId: number;
    floor: number;
    wardNumber: number;
    availableStatus: boolean;
    emergency: boolean;
    patientId: number;
    purpose: string;
}

export class NeedWard extends PatientRegistration {
    needWardId: number;
    requestTime: string;
}

export class Stats {
    log: Date;
    temperature: number;
    bloodPressure: string;
    weight: number;
    heartRate: number;
}
