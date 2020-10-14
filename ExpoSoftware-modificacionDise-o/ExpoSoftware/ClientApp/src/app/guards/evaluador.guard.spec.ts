import { TestBed } from '@angular/core/testing';

import { EvaluadorGuard } from './evaluador.guard';

describe('EvaluadorGuard', () => {
  let guard: EvaluadorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EvaluadorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
