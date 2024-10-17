import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

export type CalendarEvent = {
  open: boolean;
  x: number;
  y: number;
  width: number;
  selectedDate: Date;
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnChanges {
  @Input({ required: true })
  form: FormGroup = new FormGroup([]);

  @Output()
  calendarActive: EventEmitter<CalendarEvent> = new EventEmitter();

  @Input({ required: true })
  selectedDate: Date = new Date();

  showCalendar: boolean = false;

  placeholder = '';

  constructor(private elRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.closeCalendar();
    setTimeout(() => {
      this.placeholder =
        changes['selectedDate'].currentValue.getDate() +
        '/' +
        (changes['selectedDate'].currentValue.getMonth() + 1) +
        '/' +
        changes['selectedDate'].currentValue.getFullYear();
        
    }, 1);
  }

  onFocusEnter() {
    this.onClickOutside(this.elRef.nativeElement,()=>{
      this.closeCalendar();
    })
    this.showCalendar = true;

    const leftPadPx =
      (<HTMLElement>this.elRef.nativeElement)
        .computedStyleMap()
        .get('padding-left')
        ?.toString() || '';

    let paddingLeft = '0';
    if (leftPadPx.length >= 3) {
      paddingLeft = leftPadPx
        .split('')
        .map((c, i) => (i < leftPadPx.length - 2 ? c : ''))
        .join('');
    }

    const y = (<HTMLElement>this.elRef.nativeElement).offsetTop;
    const width =
      (<HTMLElement>this.elRef.nativeElement).offsetWidth -  (4 * parseInt(paddingLeft));
    const x =
      (<HTMLElement>this.elRef.nativeElement).offsetLeft +
      parseInt(paddingLeft);

    this.calendarActive.emit({
      open: true,
      x,
      y,
      width,
      selectedDate: this.selectedDate,
    });
  }

  onClickOutside(element:HTMLElement, callback:()=>void){
    document.addEventListener('click', (e:any) => {
      
      if (
        !element.contains(e.target) &&
        !document.getElementById("action-left")?.contains(e.target) &&
        !document.getElementById("action-right")?.contains(e.target) 
      ){
        console.log(e.target);
        callback();
      }

    });
  };

  

  closeCalendar() {
    this.showCalendar = false;
    this.calendarActive.emit({
      open: false,
      x: 0,
      y: 0,
      width: 0,
      selectedDate: this.selectedDate,
    });
    
  }
}
