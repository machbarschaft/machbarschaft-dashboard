import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: 'button [button-secondary]'
})
export class ButtonSecondaryDirective {

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.classList.add('button-secondary');
  }

}
