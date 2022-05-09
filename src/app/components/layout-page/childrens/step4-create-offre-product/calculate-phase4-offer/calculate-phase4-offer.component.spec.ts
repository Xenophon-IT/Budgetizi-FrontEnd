import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatePhase4OfferComponent } from './calculate-phase4-offer.component';

describe('CalculatePhase4OfferComponent', () => {
  let component: CalculatePhase4OfferComponent;
  let fixture: ComponentFixture<CalculatePhase4OfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatePhase4OfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatePhase4OfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
