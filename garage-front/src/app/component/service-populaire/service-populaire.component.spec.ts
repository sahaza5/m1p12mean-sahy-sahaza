import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePopulaireComponent } from './service-populaire.component';

describe('ServicePopulaireComponent', () => {
  let component: ServicePopulaireComponent;
  let fixture: ComponentFixture<ServicePopulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicePopulaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicePopulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
