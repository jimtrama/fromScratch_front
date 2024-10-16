import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of, Subscription } from 'rxjs';
import { HeaderComponent } from '../../comps/header/header.component';
import { Rockets } from './rockets';
import { environment } from '../../../environments/environment';
import { CalendarEvent } from '../../comps/calendar/calendar.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent{
  mobile: boolean = false;
  registrationForm: FormGroup;
  buttonLoadSubscription: Subscription | undefined = undefined;
  error="";
  rockets:Rockets | undefined = undefined;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    
    this.mobile = window.innerWidth < 600;

    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gitlab: ['', Validators.required],
      kaggle: ['', Validators.required],
      date: [''],
    });
  }

  get firstName(): any {
    return this.registrationForm.get('firstName');
  }

  get lastName():any{
    return this.registrationForm.get('lastName');
  }

  get gitlab() :any{
    return this.registrationForm.get('gitlab');
  }

  get kaggle():any {
    return this.registrationForm.get('kaggle');
  }

  get date():any {
    return this.registrationForm.get('date');
  }

  onSubmit() {
    console.log(this.registrationForm);
    
    HeaderComponent.animateBounce();
    if (this.registrationForm.invalid) {
      console.log('Invalid Form Please Clean ');
      console.log(this.registrationForm);
      this.error = 'Invalid Form Please Clean';
      this.registrationForm.markAllAsTouched();
      return;
    }
    this.error = '';
    const headers = { 'Content-Type': 'application/json'}
    this.buttonLoadSubscription = this.http
      .post(environment.production?(environment.apiUrl+'/participant'):'/api/participant',
        {
          'firstName':this.firstName.value,
          'lastName':this.lastName.value,
          'gitlab':this.gitlab.value,
          'kaggle':this.kaggle.value,
          'date':this.date.value
        },
        {headers}
      )
      .pipe(catchError((e)=>{
        this.error = "Something went wrong";
        this.buttonLoadSubscription = undefined;
        return of(e);
      }))
      .subscribe((res: any) => {
        if(!!res.error){
          this.error = res.error;
        }
        if(res.success){
          this.playAnimation();
          this.registrationForm.reset();
        }
        this.buttonLoadSubscription = undefined;
      });
  }

  private playAnimation(){
    if(!this.rockets )
      this.rockets = new Rockets("can");
    this.rockets.run();
    setTimeout(()=>{this.rockets?.stop()},10000)
  }


  selectedDate:Date = new Date();
  calendarEvent:CalendarEvent = {open:false,x:0,y:0,width:0,selectedDate:this.selectedDate}
  
  calendarAcitity($event: CalendarEvent) {
    this.calendarEvent = $event;
    this.selectedDate = $event.selectedDate;
  }

  dateSelected($event:Date){
    this.selectedDate = $event;
    this.registrationForm.get("date")?.setValue(
      this.selectedDate.getDate() +'/' +
      (this.selectedDate.getMonth() + 1 ) + '/' +
      this.selectedDate.getFullYear()
    );
  }

}
