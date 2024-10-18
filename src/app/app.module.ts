import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './comps/header/header.component';
import { RegisterComponent } from './pages/register/register.component';
import { ParticipantsComponent } from './pages/participants/participants.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitleComponent } from './comps/title/title.component';
import { ParticipantComponent } from './comps/participant/participant.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './comps/input/input.component';
import { DropDownComponent } from './comps/drop-down/drop-down.component';
import { CheckboxComponent } from './comps/checkbox/checkbox.component';
import { CalendarComponent } from './comps/calendar/calendar.component';
import { CalendarBodyComponent } from './comps/calendar-body/calendar-body.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AboutComponent } from './comps/about/about.component'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ParticipantsComponent,
    RegisterComponent,
    ParticipantsComponent,
    TitleComponent,
    ParticipantComponent,
    InputComponent,
    DropDownComponent,
    CheckboxComponent,
    CalendarComponent,
    CalendarBodyComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSelectModule,
    MatCheckboxModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
