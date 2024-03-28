export enum Api {
    //authentication
    login = 'auth/signin',

    //receptionist
    get_all_patients = 'api/patient/getallpatients',
    register_patient = 'api/receptionist/signup/patient',
    get_all_doctors = 'api/doctors/get/all/doctors',
    book_appointment = 'api/appointment/book/appointment',
    register_doctor = 'auth/signup/user',
    get_all_doctors_by_id = 'get/user/',

    //doctor
    get_appointment = 'api/appointment/get/all/appointments/by/date',
    get_patient_appointment = 'api/appointment/get/all/previous/appointment/for/patient',
    get_appointment_details = 'api/appointment/get/appointment/prescription/records/',
    add_prescription = 'api/appointment/add/prescription/',
    add_records = 'api/records/add/records/',
}
