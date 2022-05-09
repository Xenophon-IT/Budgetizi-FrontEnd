import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendToClientComponent } from './send-to-client.component';

describe('SendToClientComponent', () => {
  let component: SendToClientComponent;
  let fixture: ComponentFixture<SendToClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendToClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendToClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
