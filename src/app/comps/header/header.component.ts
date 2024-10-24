import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../header.service';


export type RouteLink = "register" | "participants"

const ANIMATION_VALUES = {
  "register":{
    left:"34px",
    width:"88px"
  },
  "participants":{
    left:"190px",
    width:"131px"
  }
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  public selectedRoute:RouteLink = "register";

  constructor(private router: Router,private headerService:HeaderService){
    headerService.navigateTo = this.navLinkClicked.bind(this);
  }
  
  ngOnInit(): void {
    const path = window.location.pathname;
    this.selectedRoute = <RouteLink> path.substring(1,path.length); 
    this.animateHighlight(this.selectedRoute);
  }

  navLinkClicked(link:RouteLink){
    this.animateHighlight(link);
    HeaderComponent.animateBounce();
    this.selectedRoute = link;
    this.router.navigate([link]);
    this.headerService.currentTab = link;
  }

  mouseEnter(link:RouteLink):void{
    this.animateHighlight(link);
  }

  mouseLeave():void{
    this.animateHighlight(this.selectedRoute);
  }

  private animateHighlight(forLink:RouteLink):void{
    const highlightElement = document.getElementById("highlighter");
    if(!!highlightElement){
      highlightElement.style.left = ANIMATION_VALUES[forLink]?.left;
      highlightElement.style.width = ANIMATION_VALUES[forLink]?.width;
    }
  }

  static animateBounce():void{
    const bounceElement = document.getElementById("minecraft");
    if(!!bounceElement){
      if(bounceElement.classList.contains("image-bounce")){
        bounceElement.classList.remove("image-bounce");
      }
      if(bounceElement.classList.contains("image-in")){
        bounceElement.classList.remove("image-in");
      }
      setTimeout(()=>{bounceElement.classList.add("image-bounce");},10)
      
    }
  }

  

}
