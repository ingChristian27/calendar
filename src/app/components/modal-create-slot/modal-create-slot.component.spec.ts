import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateSlotComponent } from './modal-create-slot.component';

describe('ModalCreateSlotComponent', () => {
  let component: ModalCreateSlotComponent;
  let fixture: ComponentFixture<ModalCreateSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreateSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
