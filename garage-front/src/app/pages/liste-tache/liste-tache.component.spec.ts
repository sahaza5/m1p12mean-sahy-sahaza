import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTacheComponent } from './liste-tache.component';

describe('ListeTacheComponent', () => {
  let component: ListeTacheComponent;
  let fixture: ComponentFixture<ListeTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeTacheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
