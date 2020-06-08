import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleLibComponent } from './style-lib.component';

describe('StyleLibComponent', () => {
  let component: StyleLibComponent;
  let fixture: ComponentFixture<StyleLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
