import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: 'button [button-primary]'
})
export class ButtonPrimaryDirective {

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.classList.add('button-primary');
  }

}
