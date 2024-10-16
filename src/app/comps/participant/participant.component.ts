import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrl: './participant.component.scss'
})
export class ParticipantComponent {
  
  @Input({required:true})
  firstName:string = ""

  @Input({required:true})
  lastName:string = ""

  @Input({required:true})
  gitlab:string = ""

  @Input({required:true})
  kaggle:string = ""

  @Input({required:true})
  bdate:string = ""

  @Input({required:true})
  registrationDate:string = ""

}
