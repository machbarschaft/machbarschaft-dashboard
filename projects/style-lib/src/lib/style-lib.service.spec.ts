import { TestBed } from '@angular/core/testing';

import { StyleLibService } from './style-lib.service';

describe('StyleLibService', () => {
  let service: StyleLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
