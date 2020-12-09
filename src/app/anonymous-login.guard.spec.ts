import { TestBed } from '@angular/core/testing';

import { AnonymousLoginGuard } from './anonymous-login.guard';

describe('AnonymousLoginGuard', () => {
  let guard: AnonymousLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AnonymousLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
