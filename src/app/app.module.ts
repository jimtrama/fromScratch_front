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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ParticipantsComponent,
    RegisterComponent,
    ParticipantsComponent,
    TitleComponent,
    ParticipantComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
