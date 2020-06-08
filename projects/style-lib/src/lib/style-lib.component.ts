import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-style-lib',
  template: `
    <p>
      style-lib works!
    </p>
  `,
  styles: [
  ]
})
export class StyleLibComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
