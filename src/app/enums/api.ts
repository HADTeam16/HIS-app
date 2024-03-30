export enum Api {
    //authentication
    login = 'auth/signin',

    //receptionist
    get_all_patients = 'api/patient/getallpatients',
    register_patient = 'api/receptionist/signup/patient',
    book_appointment = 'api/appointment/book/appointment',
    

    //doctor
    register_doctor = 'auth/signup/user',
    get_doctor_by_id = 'api/users/get/user/',
    get_all_doctors = 'api/doctors/get/all/doctors',
    update_doctor_by_id = 'api/users/update/user',

    toggle_user_status = 'auth/toggle/user/status',

    get_appointment = 'api/appointment/get/all/appointments/by/date',
    get_patient_appointment = 'api/appointment/get/all/previous/appointment/for/patient',
    get_appointment_details = 'api/appointment/get/appointment/prescription/records/',
    add_prescription = 'api/appointment/add/prescription/',
    add_records = 'api/records/add/records/',
}
