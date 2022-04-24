import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivesOffresComponent } from './archives-offres.component';

describe('ArchivesOffresComponent', () => {
  let component: ArchivesOffresComponent;
  let fixture: ComponentFixture<ArchivesOffresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivesOffresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivesOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
