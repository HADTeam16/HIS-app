export class User {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    country: string;
    state: string;
    city: string;
    addressLine1: string;
    addressLine2: string;
    landmark: string;
    pinCode: string;
    contact: string;
    email: string;
    profilePicture: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    role: string;
    isDisable: boolean;
}

export class Patient extends User {
    temperature: number;
    bloodPressure: number;
    height: number;
    weight: number;
}

export class Doctor extends User {
    medicalLicenseNumber: string;
    specialization: string;
    boardCertification: string;
    medicalDegree: string;
    cv: string;
    drugScreeningResult: string;
    workStart: string;
    workEnd: string;
}

export class Nurse extends User {
    headNurse: boolean;
}

export class Receptionist extends User {}
