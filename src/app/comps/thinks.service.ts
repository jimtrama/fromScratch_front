import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThinksService {

  private data:{title:string,value:boolean}[] = 
  [
    {title:"ai",value:false},
    {title:"backend",value:false},
    {title:"ml",value:false},
    {title:"fullstack",value:false},
    {title:"frontend",value:false},
  ];

  constructor() { 

  }
  reset(){
    for(const box of this.data){
      box.value = false;
    }
  }

  getData(){
    return [...this.data];
  }
  getCheckedData(){
    const checkedBoxes = [];
    for(const box of this.data){
      if(box.value){
        checkedBoxes.push(box);
      }
    }
    return checkedBoxes;
  }

  toggle(s:string){
    for(let i = 0;i< this.data.length ; i++){
      if(this.data[i].title === s){
        this.data[i].value = !this.data[i].value;
      }
    }
  }
}
