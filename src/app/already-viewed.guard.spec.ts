import { TestBed } from '@angular/core/testing';

import { AlreadyViewedGuard } from './already-viewed.guard';

describe('AlreadyViewedGuard', () => {
  let guard: AlreadyViewedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AlreadyViewedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
