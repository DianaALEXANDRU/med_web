import { Component } from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  scrollToTarget() {
    const targetElement = this.el.nativeElement.querySelector('#scrollTarget');
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

}
