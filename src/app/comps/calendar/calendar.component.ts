import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  
  @Input({required:true})
  form:FormGroup = new FormGroup([]);

  selectedDate:Date = new Date();
  showCalendar:boolean = false;

  get placeholder():string{
    return this.selectedDate.getDate() + '/'+
    (this.selectedDate.getMonth()+1)+'/'+
    this.selectedDate.getFullYear();
  }

  onFocusEnter(){
    this.showCalendar = true;
  }

  onFocusLeave(){
    this.showCalendar = false;
  }

}
