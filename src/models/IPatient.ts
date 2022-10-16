export interface IPatient{
  // id?: number,
  // name: string,
  // phone: number,

    patientId: number,
    patientName: string,
    phoneNumber: number,
    birthDate: string,
    height: number,
    gender: string,
    appointments :any[], // make model for
    lastVisitDate: string
}