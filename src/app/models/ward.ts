import { Nurse, Patient } from "./user"

export interface Ward extends Nurse, Patient{
    wardId: number
    floor: number
    wardNumber: string
    availableStatus: boolean
}

export class NeedWard extends Patient{
    needWardId: number
    requestTime: string
}