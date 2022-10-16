import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService{

  public baseUrl: string = 'http://shaheersherif-001-site1.gtempurl.com/api'

  constructor(private http:HttpClient) {  }

  public setWorkingHours(data:Observable<any>): Observable<any>{
   return this.http.post(`${this.baseUrl}/Doctors/AddWorkHours`,data)
  }
  public getWorkingHours(): Observable<any>{
    return this.http.get(`${this.baseUrl}/Doctors/GetWorkHours`)
  }
  public getconsultaionDuration(): Observable<any>{
    return this.http.get(`${this.baseUrl}/Doctors/GetConsultationDuration`)
  }
  public setconsultaionDuration(data:Observable<any>): Observable<any>{
    return this.http.post(`${this.baseUrl}/Doctors/ChangeConsultation/${data}`,data)
  }
  public setDaysOff(data:Observable<any>): Observable<any>{
    return this.http.post(`${this.baseUrl}/Doctors/AddDayOff`,data)
  }
  public getDaysOff(): Observable<any>{
    return this.http.get(`${this.baseUrl}/Doctors/GetDaysOff`)
  }
}
