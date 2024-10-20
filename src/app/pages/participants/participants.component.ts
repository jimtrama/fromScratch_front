import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ScrollService } from './scroll.service';

export type ParticipantType = {
  firstName: string;
  lastName: string;
  gitlab: string;
  kaggle: string;
  registrationDate: string;
  bdate:string;
  gender:string;
  about:string;
  thinks:{title:string}[];
  id:string;
};

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrl: './participants.component.scss',
})
export class ParticipantsComponent {
  participants: ParticipantType[] = [];
  fetchingData: boolean = true;
  message = "<No one is here, yet/>"

  constructor(private http: HttpClient,public scrollService:ScrollService) {

    this.http
      .get<ParticipantType>(environment.production?(environment.apiUrl+'/participants'):'/api/participants')
      .pipe(catchError(
        (err)=>{
          console.log(err);
          if(err.status===500){
            this.message = "Server is Down :("
          }
          
          this.fetchingData=false;
          return of(err)
        }))
      .subscribe((data: any) => {
        for (let i = 0 ;i< data.results.length;i++) {
          this.participants.push(data.results[i]);
          this.participants[this.participants.length-1].id = 'card-'+i
          this.scrollService.add(this.participants[this.participants.length-1]);
        }
        this.fetchingData = false;
      });
  }
}
