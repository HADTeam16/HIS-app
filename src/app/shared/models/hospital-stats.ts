export class HospitalStats {
    totalPatientsCount: number;
    currentlyScheduledAppointmentCount: number;
    specialityWiseDoctorsCount: { [key: string]: number }; // Key: Speciality, Value: Count
    otsAvailable: number;
    totalOts: number;
    totalWards: number;
    availableWards: number;

    // Logged in doctor data
    totalAttendedAppointments: number;
    totalAttendedPatients: number;
    wardsAssignedTillDate: number;

    // Logged in nurse data
    currentlyAssignedPatientsCount: number;
    totalWardsAllottedCount: number;

    // Logged in receptionist data
    currentlyAvailableSpecialityWiseDoctorsCount: { [key: string]: number };
}
