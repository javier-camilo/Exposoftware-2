import { TestBed } from '@angular/core/testing';

import { ComiteGuard } from './comite.guard';

describe('ComiteGuard', () => {
  let guard: ComiteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ComiteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
