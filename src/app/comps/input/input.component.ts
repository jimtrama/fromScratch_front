import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input()
  specialCharacter: string = '';

  @Input({required:true})
  placeholder:string = '';

  @Input({required:true})
  label:string = ''; 

  @Input({required:true})
  name:string=''

  @Input({required:true})
  form:FormGroup = new FormGroup([]);

  @Input()
  error:boolean = false;

  @Input()
  errorText:string = '';

  focusedOnInput: boolean = false;

  focused(e: FocusEvent, focused: boolean) {
    const element = document.getElementById('special-'+this.label);
    if(!element) {
      console.log("Not Ready") 
    }
    if (focused) {
      if(element?.classList.contains("jump-in")){
        element.classList.remove("jump-in");
      }
      element?.classList.add('jump-out');
      this.runNextCirlce(()=>{
        element?.classList.remove("jump-out");
        this.setFocused(focused)
      },300)
    } else {
      this.setFocused(focused)
    }
  }

  setFocused(focused:boolean){
    this.focusedOnInput = focused;
  }

  private runNextCirlce(call:()=>void,time:number=1){
    setTimeout(()=>{call()},time)
  }
}
