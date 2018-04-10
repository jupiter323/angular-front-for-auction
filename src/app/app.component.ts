import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  title = 'app';
  constructor(private renderer : Renderer2){
    this.renderer.addClass(document.body, 'm-home');
  }
}
