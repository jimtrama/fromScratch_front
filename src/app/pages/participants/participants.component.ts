import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';

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
      .get('http://localhost:3000/participants')
      .pipe(catchError((err)=>{this.fetchingData=false;return of(err)}))
      .subscribe((data: any) => {
        for (let user of data.results) {
          this.participants.push(user);
        }
        this.fetchingData = false;
      });
  }
}
