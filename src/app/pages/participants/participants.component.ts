import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

type ParticipantType = {
  firstName: string;
  lastName: string;
  gitlab: string;
  kaggle: string;
  registrationDate: string;
};

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrl: './participants.component.scss',
})
export class ParticipantsComponent {
  participants: ParticipantType[] = [];
  fetchingData: boolean = true;

  constructor(private http: HttpClient) {
    this.http
      .get(environment.apiUrl+'/api/participants')
      .pipe(catchError((err)=>{this.fetchingData=false;return of(err)}))
      .subscribe((data: any) => {
        for (let user of data.results) {
          this.participants.push(user);
        }
        this.fetchingData = false;
      });
  }
}
