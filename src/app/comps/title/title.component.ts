import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {
  @Input({required:true})
  public title:string ="";

  @Input()
  public special:string ="";

  @Input()
  public specialColored:boolean = false;
}
