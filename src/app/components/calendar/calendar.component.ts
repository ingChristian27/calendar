import { Component, OnInit, ViewChild } from "@angular/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { EventInput } from "@fullcalendar/core";
import { ModalCreateSlotComponent } from "../modal-create-slot/modal-create-slot.component";
import interactionPlugin from "@fullcalendar/interaction";
import timeGrigPlugin from "@fullcalendar/timegrid";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Reminder } from "../../models/reminder.models";
import { ReminderService } from "../../services/reminder.service";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit {
  modalReference: NgbModalRef;

  calendarPlugins = [dayGridPlugin, interactionPlugin, timeGrigPlugin];
  calendarEvents: EventInput[] = [
    { title: "Event Now", start: new Date() },
    { title: "Event Now", start: new Date() },
    { title: "Event Now", start: "2019-12-12" }
  ];

  constructor(
    private modalService: NgbModal,
    private reminderService: ReminderService
  ) {}

  handleDateClick(arg) {
    let reminder = new Reminder();
    reminder.start = arg.date;
    console.log(arg);
    this.reminderService.set(reminder);
    this.modalReference = this.modalService.open(ModalCreateSlotComponent, {
      size: "lg"
    });

    this.calendarEvents = this.calendarEvents.concat({
      // add new event data. must create new array
      title: "New Event",
      start: arg.date,
      allDay: arg.allDay
    });
  }
  OpenModal(start, end, allDay) {
    let reminder = new Reminder();
    /*
    Reminder.start = start.format();
    Reminder.end = end.format();
    Reminder.id = 0;
    Reminder.resource = this.currentResource ? this.currentResource : null;
    
    this.slotService.set(slot);

    $.CalendarApp.onSelect(start, end, allDay);
    this.modalReference = this.modalService.open(CreateSlotComponent, {
      size: "lg"
    });
    */
  }

  ngOnInit() {}

  addEvent() {
    let event = { title: "event 2", date: "2019-12-02" };
    //this.calendarEvents.push(event);
  }

  modifyTitle(eventIndex, newTitle) {
    //this.calendarEvents[eventIndex].title = newTitle;
  }
}
