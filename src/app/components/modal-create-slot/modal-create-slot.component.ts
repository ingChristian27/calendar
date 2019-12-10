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
    private calendar: NgbCalendar,
    private fb: FormBuilder,
    private reminderService: ReminderService
  ) {
    this.reminder = this.reminderService.get();
    this.createForm();
  }

  createForm() {
    console.log(this.reminder.start);

    const formatStartDate = moment(this.reminder.start).format("YYYY-MM-DD");
    this.formReminder = this.fb.group({
      description: [this.reminder.description, Validators.maxLength(4)],
      city: [this.reminder.city],
      start: [formatStartDate]
    });
  }

  onClickSubmit(description) {
    console.log(this.formReminder);
    if (this.formReminder.invalid) {
      alert("invalido");
      return;
    }
    alert("Your Email is : " + description);
  }

  ngOnInit() {}

  closeModal() {
    this.activeModal.close();
  }
}
