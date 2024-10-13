import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { ParticipantsComponent } from './pages/participants/participants.component';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    title:"Register",
    data: { animation: 'RegisterPage' }
  },
  {
    path: 'participants',
    component: ParticipantsComponent,
    data: { animation: 'ParticipantsPage' },
    title:"Participants"
  },
  {
    path: '**',
    redirectTo:"/register"
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
