import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientDetailsService {


  public baseUrl: string = 'http://shaheersherif-001-site1.gtempurl.com/api'

  constructor(private http: HttpClient) { }


  public getAllPaitents():Observable<any>{
    return this.http.get(`${this.baseUrl}/Patients/GetPatients`);
  }
  public getPaitientDetails(id:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/Patients/GetPatients/${id}`)
  }
  public searchPatient(searchTerm:string):Observable<any>{
    return this.http.post(`${this.baseUrl}/Patients/Search/${searchTerm}`,searchTerm)
  }

  public addNewPatient(NewPatient:any){ // used to get user by Id to get more info about him
    return this.http.post<any>(`${this.baseUrl}/Patients/AddNewPatient`, NewPatient);
  }

  public getPatientByID(ID:number){ // used to get user by Id to get more info about him
    return this.http.get(`${this.baseUrl}/Patients/GetPatients/${ID}`)
  }

  public editPatient(CurrentPatient:any,PatientId:any){ // used to get user by Id to get more info about him
    return this.http.post<any>(`${this.baseUrl}/Patients/EditPatient/${PatientId}`, CurrentPatient);
  }

}

