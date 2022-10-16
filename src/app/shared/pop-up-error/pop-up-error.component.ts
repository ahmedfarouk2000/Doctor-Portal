import { Component, OnInit,Input ,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pop-up-error',
  templateUrl: './pop-up-error.component.html',
  styleUrls: ['./pop-up-error.component.css']
})
export class PopUpErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  @Input () ErrorMsg:string = '' // date + time
  @Input () ErrorOrNot:boolean = true // date + time

  @Output() onClick:EventEmitter<any> =new EventEmitter<any>()
  public Confirm (){
    this.onClick.emit() ; // the value passed from the child
  }

public togglePopUpError(){
    const popUpLayerError = document.querySelector('.popUpLayerError')
    popUpLayerError?.classList.toggle('visible')
    const popUpError = document.querySelector('.popUpError')
    popUpError?.classList.toggle('popUpCloseError')
  
}

}
