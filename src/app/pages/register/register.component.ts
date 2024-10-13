import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  mobile:boolean = false;
  registrationForm:FormGroup;
  constructor( private formBuilder: FormBuilder){
    this.mobile = window.innerWidth < 600 ;

    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gitlab: ['', Validators.required],
      kaggle: ['', Validators.required],
    });
  }

  get firstName():any {
    return this.registrationForm.get('firstName');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get gitlab() {
    return this.registrationForm.get('gitlab');
  }

  get kaggle() {
    return this.registrationForm.get('kaggle');
  }

  onSubmit() {
    console.log(this.registrationForm.value);
  }
}
