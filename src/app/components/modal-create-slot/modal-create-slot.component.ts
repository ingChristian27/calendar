import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Reminder } from "../../models/reminder.models";
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { ReminderService } from "../../services/reminder.service";
import * as moment from "moment";

@Component({
  selector: "app-modal-create-slot",
  templateUrl: "./modal-create-slot.component.html",
  styleUrls: ["./modal-create-slot.component.scss"]
})
export class ModalCreateSlotComponent implements OnInit {
  formReminder: FormGroup;
  reminder: Reminder;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private reminderService: ReminderService
  ) {
    this.reminder = this.reminderService.get();
    this.createForm();
  }
  ngOnInit() {}

  createForm() {
    const formatStartDate = moment(this.reminder.start).format("YYYY-MM-DD");
    this.formReminder = this.fb.group({
      title: [this.reminder.title, Validators.maxLength(30)],
      city: [this.reminder.city],
      start: [formatStartDate],
      color: ["blue"]
    });
  }

  onClickSubmit() {
    this.closeModal();
    this.reminder = this.formReminder.value;
    this.reminderService.set(this.reminder);
    this.reminderService.notificationChange();

    if (this.formReminder.invalid) {
      alert("invalido");
      return;
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
