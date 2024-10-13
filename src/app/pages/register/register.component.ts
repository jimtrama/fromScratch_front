import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  mobile:boolean = false;
  constructor(){
    this.mobile = window.innerWidth < 600 ;
  }
}
