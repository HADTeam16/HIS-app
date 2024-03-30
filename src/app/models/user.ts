export class User {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    middleName: string;
    lastName: string;
    age: number;
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
    purpose: string;
    temperature: string;
    bloodPressure: string;
    admissionDate: string;
    dischargeDate: string;
}

export class Doctor extends User {
    medicalLicenseNumber: string;
    specialization: string;
    boardCertification: string;
    experience: string;
    medicalDegree: string;
    cv: string;
    drugScreeningResult: string;
    workStart: string;
    workEnd: string;
}

export class Nurse extends User{
    headNurse: boolean;
}
