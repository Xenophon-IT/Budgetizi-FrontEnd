import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductIntoOffreComponent } from './add-product-into-offre.component';

describe('AddProductIntoOffreComponent', () => {
  let component: AddProductIntoOffreComponent;
  let fixture: ComponentFixture<AddProductIntoOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductIntoOffreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductIntoOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
