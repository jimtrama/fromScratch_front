import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CalendarEvent } from '../calendar/calendar.component';

@Component({
  selector: 'app-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrl: './calendar-body.component.scss'
})
export class CalendarBodyComponent implements  OnChanges{
  @Input()
  calendarEvent:CalendarEvent = {open:false,x:0,y:0,width:0,selectedDate:new Date()}

  @Input({required:true})
  selectedDate:Date = new Date();

  currentSelection:Date = new Date();

  @Output()
  dateSelected:EventEmitter<Date> = new EventEmitter();

  dates:Date[] = [];

  private MARGIN_BOTTOM = 10;


  constructor(private elRef:ElementRef){}

  get today(){
    return new Date().getDate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    (<HTMLElement>this.elRef.nativeElement ).style.left  = changes["calendarEvent"].currentValue.x  +"px";
    (<HTMLElement>this.elRef.nativeElement ).style.top  = (changes["calendarEvent"].currentValue.y - ( <HTMLElement> this.elRef.nativeElement).offsetHeight-this.MARGIN_BOTTOM) +"px";
    (<HTMLElement>this.elRef.nativeElement ).style.width  = changes["calendarEvent"].currentValue.width +"px";
    this.constructCalendarDatesBasedOn(changes["calendarEvent"].currentValue.selectedDate)
  }


  constructCalendarDatesBasedOn(refDate:Date){
    let movingDate = new Date(refDate);
    let gurd = 0 ;
    const leftHalf:Date[] = [];
    const rightHalf:Date[] = [];
    this.dates = [];
    //Filling left of selected
    for(;movingDate.getMonth() == refDate.getMonth() && gurd<100; movingDate = this.addDaysToDate(movingDate,-1)){
      leftHalf.push(movingDate);
      gurd++;
    }
    //resetting moving
    movingDate = new Date(refDate);
    //Filling left of selected
    for(;movingDate.getMonth() == refDate.getMonth() && gurd<100; movingDate = this.addDaysToDate(movingDate,1)){
      rightHalf.push(movingDate);
      gurd++;
    }

    //Dumping half to dates[];
    for(let i = leftHalf.length-1 ; i > 0 ; i--){
      this.dates.push(leftHalf[i]);
    }
    for(const d of rightHalf){
      this.dates.push(d);
    }
  }

  private addDaysToDate(date:Date,days:number):Date{
    const r =  new Date(date)
    r.setDate(date.getDate()+days);
    return r;
  }

  dateClicked(e:Event,i:number,week:number){
    e.stopPropagation();
    this.dateSelected.emit(this.dates[i + (week*7)]);
  }

  filteredDates(week:number){
    return this.dates.filter((d,i)=>i<week && i >= week - 7 );
  }
  



}
