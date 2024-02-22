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
}

export class Patient extends User {
    purpose: string;
    temperature: string;
    bloodPressure: string;
    admissionDate: string;
    dischargeDate: string;
    status:string;
    appointmentDate:string;
    wardId:string;
}
