export class Appointment {
    doctorId: number;
    patientId: number;
    purpose: string;
}

export class DoctorsAppointment extends Appointment {
    appointmentId: number;
    contact: string;
    name: string;
    age: number;
    gender: string;
    slot: string;
    temperature: string;
    bloodPressure: string;
    weight: string;
    height: string;
    needWard: boolean;
}
