import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReminderComponent } from './modal-reminder.component';

describe('ModalReminderComponent', () => {
  let component: ModalReminderComponent;
  let fixture: ComponentFixture<ModalReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalReminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
