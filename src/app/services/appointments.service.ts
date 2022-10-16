import { Injectable } from '@angular/core';
import { IAppointment } from 'src/models/IAppointment';
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  
   

  constructor(
    private http:HttpClient

  ) { }

  public BaseUrl:string ='http://shaheersherif-001-site1.gtempurl.com/api/Appointments'


    public getAllAppointments(){
      return this.http.get(`${this.BaseUrl}/GetAppointments`)
    }

    public reserveAppointment(PatientId:any,start:any){
      return this.http.post<any>(`${this.BaseUrl}/ReserveAppointment?PatientId=${PatientId}&StartDateTime=${start}`,{})
    }

    public deleteAppointment(AppointmentId:number){
      return this.http.post<any>(`${this.BaseUrl}/Delete/${AppointmentId}`,{})
    }

    public editAppointment(AppointmentId:any,StartDateTime:any){
      return this.http.post<any>(`${this.BaseUrl}/EditAppointment?AppointmentId=${AppointmentId}&StartDateTime=${StartDateTime}`,{})
    }


     // for vitals
    public BaseUrlVitals:string ='http://shaheersherif-001-site1.gtempurl.com/api/Vitals'

    public getVitals(AppoitnmentId:any){ // used to get user by Id to get more info about him
      return this.http.get(`${this.BaseUrlVitals}/GetVitalsForAppointment/${AppoitnmentId}`);
    }

    public editVitals(AppoitnmentId:any,AllVitals:any){ // used to get user by Id to get more info about him
      return this.http.post<any>(`${this.BaseUrlVitals}/EditVitals?AppointmentId=${AppoitnmentId}`,AllVitals);
    }
 


    //for EMR
    public BaseUrlEMR:string ='http://shaheersherif-001-site1.gtempurl.com/api/Emrs'

    public getEMR(AppoitnmentId:any){ // uto get EMR
      return this.http.get(`${this.BaseUrlEMR}/GetEmrForAppointment/${AppoitnmentId}`);
    }

    public editEMR(AppoitnmentId:any,File:any){ // to set the emr by sending a file format
      const formData: FormData = new FormData();
      formData.append('File', File);
      console.log('the form data',formData)
      return this.http.post<any>(`${this.BaseUrlEMR}/EditEmr?AppointmentId=${AppoitnmentId}`,formData);
    }

    public deleteEMR(DocumentId:any){ 
      return this.http.post<any>(`${this.BaseUrlEMR}/DeleteFile/${DocumentId}`,{});
    }


}
