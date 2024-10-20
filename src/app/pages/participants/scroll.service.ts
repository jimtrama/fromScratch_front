import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  parts:any[] = [];

  constructor() { }

  add(a:any){
    this.parts.push(a);
  }
  getPositions():any[]{
    const t = [];
    const r = 500;
    const arc = 180;
    const arcStep = arc / this.parts.length;
    let angle = 180 - (arcStep * (this.parts.length/2)) ;
    for(let i = 0 ;i< this.parts.length;i++){

      this.parts[i]['x'] = r * Math.cos(angle * (Math.PI / 180)) + (window.innerWidth * 1.2 );
      this.parts[i]['y'] = r * Math.sin(angle * (Math.PI / 180)) + (window.innerHeight/4 );
      t.push(this.parts[i]);
      angle+=arcStep+3;
    }
    return t;
  }
}
