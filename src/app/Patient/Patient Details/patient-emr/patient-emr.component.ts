import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentsService } from 'src/app/services/appointments.service';

@Component({
  selector: 'app-patient-emr',
  templateUrl: './patient-emr.component.html',
  styleUrls: ['./patient-emr.component.css']
})
export class PatientEmrComponent implements OnInit {

  emr: any
  appoitmentID: any
  public EMRerrorMsg = 'Note: You Can Only Upload Files on The Day of The Consultation!'
  isLoading: boolean = true

  constructor(private emrService: AppointmentsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.appoitmentID = this.route.snapshot.params?.['AppointmentId']
    this.getEMR(this.appoitmentID)
    setTimeout(() => { // just wait 2.5 more secs
      this.ToggleLoadingIndicator() // loading
    }, 1000);
  }

  public getEMR(AppointmentId: any) { // send the id of the current appointment
    this.emrService.getEMR(AppointmentId).subscribe({
      next: (data: any) => {
        console.log(data)
        this.emr = data
        // this.isLoading = false
      },
    })
  }
  public handlePrint(filePath: any) {
    console.log('in print', filePath);
    let OpenUrl = `http://shaheersherif-001-site1.gtempurl.com/${filePath}`
    window.open(OpenUrl, "_blank");
  }
  public deleteEMR(DocumentId: any) { // send the id of the current appointment
    this.ToggleLoadingIndicator() // loading
    this.emrService.deleteEMR(DocumentId).subscribe({
      next: (data: any) => {
        if (data.actionCompleted) {
          this.getEMR(this.appoitmentID) // to update the view
          this.EMRerrorMsg = 'File Successfully Deleted!'
          // this.isLoading = false
        } else {
          this.EMRerrorMsg = data.message
        }
        console.log('in delete doc', data)
        // this.isLoading = false
      },
      complete:()=>{
        setTimeout(() => { // just wait 2.5 more secs
          this.ToggleLoadingIndicator() // loading
        }, 1000);
      }
    })
  }
  public fileToUpload: File | null = null;
  public handleFileInput(files: any) {
    console.log('in handle file')
    this.fileToUpload = files.files.item(0);
    // console.log('the appoitment id',this.currentSelectedSlot)
    this.editEMR(this.appoitmentID, this.fileToUpload) // automacally will upload
    // this.isLoading = false
  }
  public editEMR(AppointmentId: any, File: any) { // send the id of the current appointment
    this.ToggleLoadingIndicator() // loading
    this.emrService.editEMR(AppointmentId, File).subscribe({
      next: (data: any) => {
        console.log('in edit', data)
        if (data.actionCompleted) { // no errors
          this.getEMR(AppointmentId)
          this.EMRerrorMsg = 'File Successfully Uploaded!'
          // this.isLoading = false
        }
        else {
          this.EMRerrorMsg = data.message
          // this.isLoading = false
        }
      },
      complete:()=>{
        setTimeout(() => { // just wait 2.5 more secs
          this.ToggleLoadingIndicator() // loading
        }, 1000);
      }
    })
  }

// public Uploading =false
  public ToggleLoadingIndicator(){
    if (this.isLoading){
      this.isLoading=false
    }
    else{
      this.isLoading=true
    }
  }

}
