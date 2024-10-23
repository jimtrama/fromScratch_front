import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export type ParticipantType = {
  firstName: string;
  lastName: string;
  gitlab: string;
  kaggle: string;
  registrationDate: string;
  date:string;
  gender:string;
  about:string;
  thinks:{title:string}[];
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

  constructor(private http: HttpClient) {
    this.http
      .get<ParticipantType>(environment.production?(environment.apiUrl+'/participants'):'/api/participants')
      .pipe(catchError(
        (err)=>{
          if(err.status===500){
            this.message = "Server is Down :("
          }
          
          this.fetchingData=false;
          return of(err)
        }))
      .subscribe((data: any) => {
        for (let user of data.results) {
          this.participants.push(user);
        }
        this.fetchingData = false;
      });
  }
}
