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
    get_appointment = 'api/appointment/get/all/appointments/by/date',
    get_patient_appointment = 'api/appointment/get/all/previous/appointment/for/patient',
    get_appointment_details = 'api/appointment/get/appointment/prescription/records/',
    add_prescription = 'api/prescription/add/prescription/',
    add_records = 'api/records/add/records/',
    add_to_ward_queue = 'api/doctors/recommend/ward/',

    //nurse
    get_all_nurse = 'api/nurse/get/all/nurse',
    get_nurse_by_id = 'api/users/get/user/',
    register_nurse = 'auth/signup/user',
    update_nurse_by_id = 'api/users/update/user',
    is_head_nurse = 'api/nurse/is/head/nurse/',

    //receptionist
    get_all_receptionist = 'api/receptionist/get/all/receptionist',
    get_receptionist_by_id = 'api/users/get/user/',
    register_receptionist = 'auth/signup/user',
    update_receptionist_by_id = 'api/users/update/user',

    //user
    toggle_user_status = 'auth/toggle/user/status',

    //otp
    get_mobile_otp = 'api/otp/verification/send/otp/via/sms',
    verify_mobile_otp = 'api/otp/verification/validate/otp',
    get_email_otp = 'api/otp/verification/send/otp/via/email',
    verify_email_otp = 'api/otp/verification/validate/otp',
}
