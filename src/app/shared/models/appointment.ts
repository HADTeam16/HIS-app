export class Appointment {
    doctorId: number;
    patientId: number;
    purpose: string;
    temperature: number;
    bloodPressure: string;
    weight: number;
    height: number;
}

export class DoctorsAppointment extends Appointment {
    appointmentId: number;
    contact: string;
    name: string;
    gender: string;
    dateOfBirth: string;
    slot: string;
    needWard: boolean;
    completed: -1 | 0 | 1;
}
