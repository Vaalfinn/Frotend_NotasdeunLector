import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisitanteComponent } from './modal-visitante.component';

describe('ModalVisitanteComponent', () => {
  let component: ModalVisitanteComponent;
  let fixture: ComponentFixture<ModalVisitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalVisitanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVisitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
