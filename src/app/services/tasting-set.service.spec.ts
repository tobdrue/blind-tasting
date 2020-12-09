import {TestBed} from '@angular/core/testing';

import {TastingSetService} from './tasting-set.service';

describe('UserService', () => {
  let service: TastingSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TastingSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
