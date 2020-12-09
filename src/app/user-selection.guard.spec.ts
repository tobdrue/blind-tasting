import { TestBed } from '@angular/core/testing';

import { UserSelectionGuard } from './user-selection.guard';

describe('UserSelectionGuard', () => {
  let guard: UserSelectionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserSelectionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
