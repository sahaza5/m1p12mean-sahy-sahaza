import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentClientComponent } from './appointment-client.component';

describe('AppointmentClientComponent', () => {
  let component: AppointmentClientComponent;
  let fixture: ComponentFixture<AppointmentClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
