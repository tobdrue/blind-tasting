import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRateSelectionParentComponent } from './user-rate-selection-parent.component';

describe('UserRateSelectionParentComponent', () => {
  let component: UserRateSelectionParentComponent;
  let fixture: ComponentFixture<UserRateSelectionParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRateSelectionParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRateSelectionParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
