import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintOffresComponent } from './print-offres.component';

describe('PrintOffresComponent', () => {
  let component: PrintOffresComponent;
  let fixture: ComponentFixture<PrintOffresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintOffresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
