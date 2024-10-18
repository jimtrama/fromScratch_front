import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CalendarEvent } from '../calendar/calendar.component';

@Component({
  selector: 'app-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrl: './calendar-body.component.scss',
})
export class CalendarBodyComponent implements OnChanges {
  MONTHS_LABELS = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  @Input()
  calendarEvent: CalendarEvent = {
    open: false,
    x: 0,
    y: 0,
    width: 0,
    selectedDate: new Date(),
  };

  @Input({ required: true })
  selectedDate: Date = new Date();

  currentSelection: Date = new Date();

  @ViewChild("toscroll",{static:false})
  scrollRef:ElementRef|undefined = undefined;

  @ViewChild("toscrollCont",{static:false})
  scrollContRef:ElementRef|undefined = undefined;

  @Output()
  dateSelected: EventEmitter<Date> = new EventEmitter();

  dates: Date[] = [];

  private MARGIN_BOTTOM = 1;

  constructor(private elRef: ElementRef) {}

  get today() {
    return new Date();
  }

  datesEqual(a: Date, f: string): boolean {
    if (f == 'se') {
      const b = this.selectedDate;

      return (
        a.getDate() === b.getDate() &&
        a.getMonth() === b.getMonth() &&
        a.getFullYear() === b.getFullYear()
      );
    } else {
      const b = new Date();
      return (
        a.getDate() === b.getDate() &&
        a.getMonth() === b.getMonth() &&
        a.getFullYear() === b.getFullYear()
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    let num =
      changes['calendarEvent'].currentValue.y -
      (<HTMLElement>this.elRef.nativeElement).offsetHeight -
      this.MARGIN_BOTTOM;
    //num = num <0 ? 0 :num;
    (<HTMLElement>this.elRef.nativeElement).style.left =
      changes['calendarEvent'].currentValue.x + 'px';
    (<HTMLElement>this.elRef.nativeElement).style.top = num + 'px';
    (<HTMLElement>this.elRef.nativeElement).style.width =
      changes['calendarEvent'].currentValue.width + 'px';
    this.constructCalendarDatesBasedOn(
      changes['calendarEvent'].currentValue.selectedDate
    );
  }

  monthChange(e:Event) {
    e.preventDefault();
    this.rotatingDate.setMonth(this.rotatingDate.getMonth() + 1);
    this.constructCalendarDatesBasedOn(this.rotatingDate);
  }

  rotatingDate: Date = new Date(this.selectedDate);
  private  showYears = false;
  yearChange(e:Event,year: Date) {
    e.preventDefault();
    this.showYears = false;
    (<HTMLElement> this.elRef.nativeElement).style.paddingBottom = "5px"
    this.rotatingDate.setFullYear(year.getFullYear());
    this.constructCalendarDatesBasedOn(this.rotatingDate);
  }

  getShowYears(){
    return this.showYears;
  }
  setShowYearsTrue(e:Event){
    e.preventDefault();
    this.showYears = true;
    console.log(this.scrollRef);

    setTimeout(()=>{
      (<HTMLElement>this.scrollRef?.nativeElement).scroll({left:
        ((<HTMLElement>this.scrollContRef?.nativeElement).getBoundingClientRect().width / 8 )*5
        ,behavior:'smooth'});
    },10);
    
   
    (<HTMLElement> this.elRef.nativeElement).style.paddingBottom = "100px"
  }

  constructCalendarDatesBasedOn(refDate: Date) {
    console.log('Constructing');

    this.selectedDate = new Date(this.selectedDate);
    let movingDate = new Date(refDate);
    let gurd = 0;
    const leftHalf: Date[] = [];
    const rightHalf: Date[] = [];
    this.dates = [];
    //Filling left of selected
    for (
      ;
      movingDate.getMonth() == refDate.getMonth() && gurd < 100;
      movingDate = this.addDaysToDate(movingDate, -1)
    ) {
      leftHalf.push(movingDate);
      gurd++;
    }
    //resetting moving
    movingDate = new Date(refDate);
    //Filling left of selected
    for (
      ;
      movingDate.getMonth() == refDate.getMonth() && gurd < 100;
      movingDate = this.addDaysToDate(movingDate, 1)
    ) {
      rightHalf.push(movingDate);
      gurd++;
    }

    //Dumping half to dates[];
    for (let i = leftHalf.length - 1; i > 0; i--) {
      this.dates.push(leftHalf[i]);
    }
    for (const d of rightHalf) {
      this.dates.push(d);
    }
  }

  private addDaysToDate(date: Date, days: number): Date {
    const r = new Date(date);
    r.setDate(date.getDate() + days);
    return r;
  }

  get years() {
    const years = [new Date(1900, 1, 1)];
    for (let i = 1900; i < new Date().getFullYear() - 18; i++) {
      const rollingDate = new Date(years[i - 1900]);
      rollingDate.setFullYear(rollingDate.getFullYear() + 1);
      years.push(rollingDate);
    }
    return years;
  }

  dateClicked(e: Event, i: number, week: number) {
    e.stopPropagation();
    this.dateSelected.emit(this.dates[i + week * 7]);
  }

  filteredDates(week: number) {
    return this.dates.filter((d, i) => i < week && i >= week - 7);
  }
}
