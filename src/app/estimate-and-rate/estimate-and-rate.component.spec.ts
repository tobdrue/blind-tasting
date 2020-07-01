import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateAndRateComponent } from './estimate-and-rate.component';

describe('EstimateAndRateComponent', () => {
  let component: EstimateAndRateComponent;
  let fixture: ComponentFixture<EstimateAndRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimateAndRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateAndRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
