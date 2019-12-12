import { Component, OnInit, ViewChild } from "@angular/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { EventInput } from "@fullcalendar/core";
import { ModalCreateSlotComponent } from "../modal-create-slot/modal-create-slot.component";
import interactionPlugin from "@fullcalendar/interaction";
import timeGrigPlugin from "@fullcalendar/timegrid";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Reminder } from "../../models/reminder";
import { ReminderService } from "../../services/reminder.service";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit {
  modalReference: NgbModalRef;

  calendarPlugins = [dayGridPlugin, interactionPlugin, timeGrigPlugin];
  calendarEvents = [];

  constructor(
    private modalService: NgbModal,
    private reminderService: ReminderService
  ) {}

  ngOnInit() {
    this.reminderService.getReminder().subscribe(data => {
      if (data[0] != undefined) {
        if (data[0].id) {
          this.fintIndexReminderForUpdated(data[0]);
        } else {
          this.addReminder(data[0]);
        }
      }
    });
  }

  addReminder(reminderData) {
    let newReminder = new Reminder();
    newReminder.editable = true;
    newReminder.color = reminderData.color;
    newReminder.start = reminderData.start;
    newReminder.city = reminderData.city;
    newReminder.title = reminderData.title;
    this.calendarEvents = this.calendarEvents.concat(newReminder);
  }

  fintIndexReminderForUpdated(EditReminder) {
    let index = this.findReminderIntoCalendarIndex(EditReminder);
    //this.modifyReminder(index, EditReminder);
    this.deleteReminder(index);
  }

  modifyReminder(eventIndex, reminder) {
    let copyCalendar = this.calendarEvents.slice(); // a clone
    let singleEvent = Object.assign({}, copyCalendar[eventIndex]); // a clone
    singleEvent.title = reminder.title;
    singleEvent.color = reminder.color;
    singleEvent.start = reminder.start;
    singleEvent.city = reminder.city;
    copyCalendar[eventIndex] = singleEvent;
    this.calendarEvents = copyCalendar; // reassign the array
  }

  deleteReminder(eventIndex) {
    let copyCalendar = this.calendarEvents.slice(); // a clone
    copyCalendar.splice(eventIndex, 1);
    this.calendarEvents = copyCalendar;
  }

  findReminderIntoCalendar(reminder) {
    return this.calendarEvents.find(
      currentReminder => currentReminder.id == reminder.id
    );
  }
  findReminderIntoCalendarIndex(reminder) {
    return this.calendarEvents.findIndex(
      currentReminder => currentReminder.id == reminder.id
    );
  }

  handleDateClick(arg) {
    let reminder = new Reminder();
    reminder.id = null;
    reminder.start = arg.date;
    this.reminderService.set(reminder);
    this.openModal();
  }
  editReminder(event) {
    this.reminderService.set(event);
    this.openModal();
  }

  openModal() {
    this.modalReference = this.modalService.open(ModalCreateSlotComponent, {
      size: "lg"
    });
  }
  calendarEventClick(e) {
    let currentReminder = this.findReminderIntoCalendar(e.event);
    this.editReminder(currentReminder);
  }
}
