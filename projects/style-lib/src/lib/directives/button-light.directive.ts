import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: 'button [button-light]'
})
export class ButtonLightDirective {

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.classList.add('button-light');
  }

}
