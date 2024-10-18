import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class DropDownComponent implements OnInit{

  @Input({required:true})
  form:FormGroup = new FormGroup([]);

  constructor(private elRef :ElementRef){
    document.documentElement.style.setProperty('--mdc-filled-text-field-container-color', 'transparent');
    document.documentElement.style.setProperty('--mat-select-panel-background-color', 'transparent');
    document.documentElement.style.setProperty('--mat-form-field-container-text-line-height', 'fit-content');
    document.documentElement.style.setProperty('--mat-form-field-container-text-size', '1.2rem');
    document.documentElement.style.setProperty('--mat-form-field-filled-with-label-container-padding-top', '5px');
    document.documentElement.style.setProperty('--mat-form-field-filled-with-label-container-padding-bottom', '5px');
    document.documentElement.style.setProperty('--mat-form-field-container-height', 'fit-content');
    document.documentElement.style.setProperty('--mat-select-panel-background-color', 'var(--light-blue)');
    document.documentElement.style.setProperty('--mat-option-label-text-color', 'var(--black)');
    document.documentElement.style.setProperty('--mdc-filled-text-field-focus-label-text-color', 'var(--white)');
    document.documentElement.style.setProperty('--mat-select-focused-arrow-color', 'var(--white)');
  }

  ngOnInit(): void {
    document.getElementsByClassName("mat-mdc-form-field-subscript-wrapper")[0].remove();
    
    setTimeout(()=>{
      
      document.getElementsByClassName("mdc-line-ripple")[0].remove();
      document.getElementsByClassName("mdc-line-ripple mdc-line-ripple--deactivating")[0]?.remove();
    },10);
    (<HTMLElement>this.elRef.nativeElement).style.width = "45%"
  }

  spin(){
    document.getElementsByClassName("mat-mdc-select-arrow")[0]?.classList.remove('spin_out');
    document.getElementsByClassName("mat-mdc-select-arrow")[0]?.classList.add('spin');
  }
  focusLeave(){
    document.getElementsByClassName("mat-mdc-select-arrow")[0]?.classList.remove('spin');
    document.getElementsByClassName("mat-mdc-select-arrow")[0]?.classList.add('spin_out');
  }

  selectedValue(e:any){
    console.log(e);
    setTimeout(()=>{
      (<HTMLElement>document.getElementById("mat-mdc-form-field-label-0")).classList.add('toTop');

    },1)
  }
}
