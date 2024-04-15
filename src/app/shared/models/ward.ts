import { PatientRegistration } from "./user"

export interface Ward extends PatientRegistration{
    wardId: number
    floor: number
    wardNumber: string
    availableStatus: boolean
}

export class NeedWard extends PatientRegistration{
    needWardId: number
    requestTime: string
}