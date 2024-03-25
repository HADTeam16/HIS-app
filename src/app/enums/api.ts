export enum Api {
    //authentication
    login = 'auth/signin',

    //receptionist
    get_all_patients = 'api/patient/getallpatients',
    register_patient = 'api/receptionist/signup/patient',
    get_all_doctors = 'api/doctors/get/all/doctors',
    book_appointment = 'api/appointment/book/appointment',

    //doctor
    get_appointment = 'api/appointment/get/all/appointments/by/date'
}
