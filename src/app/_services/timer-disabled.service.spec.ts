import { TestBed } from '@angular/core/testing';

import { TimerDisabledService } from './timer-disabled.service';

describe('TimerDisabledService', () => {
  let service: TimerDisabledService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerDisabledService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
