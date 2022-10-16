export interface IAppointment {
    appointmentId: number,
    startTime: string,
    endTime: string,
    reasonOfVisit: string,
    doctorId: string,
    patientId: number
  }