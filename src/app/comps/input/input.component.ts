import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
} from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input()
  specialCharacter: string = '';

  focusedOnInput: boolean = false;

  focused(e: FocusEvent, focused: boolean) {
    console.log(e);
    console.log(focused);
    const element = document.getElementById('special');
    if(!element) {
      console.log("Not Ready") 
   
    }
    
    if (focused) {
      if(element?.classList.contains("jump-in")){
        element.classList.remove("jump-in");
      }
      element?.classList.add('jump-out');
      this.runNextCirlce(()=>{this.setFocused(focused)},400)
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
