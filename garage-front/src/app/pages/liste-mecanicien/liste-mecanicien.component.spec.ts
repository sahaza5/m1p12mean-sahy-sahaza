import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMecanicienComponent } from './liste-mecanicien.component';

describe('ListeMecanicienComponent', () => {
  let component: ListeMecanicienComponent;
  let fixture: ComponentFixture<ListeMecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeMecanicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeMecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
