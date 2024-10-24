import { Injectable } from '@angular/core';
import { RouteLink } from './header/header.component';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  navigateTo:(link:RouteLink)=>void = ()=>{}
  currentTab:RouteLink = "register";
  private startPointTime:{x:number,y:number,time:number} = {x:0,y:0,time:0}

  constructor() { }

  registerScrollNavListeners(){
    //Bellow code tris to simulate swipe nav , but on ios devices blocks click event
    // window.addEventListener('touchstart',(e)=>{
    //   this.startPointTime.x = e.changedTouches[0].pageX;
    //   this.startPointTime.y = e.changedTouches[0].pageY;
    //   this.startPointTime.time = e.timeStamp;
    // },true)
    // window.addEventListener('touchend',(e)=>{

    //   const dX = e.changedTouches[0].pageX - this.startPointTime.x;
    //   const dY =  e.changedTouches[0].pageY - this.startPointTime.y;
    //   const dTimeMS = e.timeStamp -this.startPointTime.time;

    //   if(
    //     Math.abs(dY) <= 140 &&
    //     Math.abs(dX) >= 130 &&
    //     dTimeMS <= 350
    //   ){
    //     if(dX<0){
    //         this.navigateTo("participants");
    //     }else{
    //         this.navigateTo("register");
    //       }
        
    //   }
    // },true)
  }
}
