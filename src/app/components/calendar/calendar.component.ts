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
  calendarEvents: EventInput[] = [
    {
      title: "Event Now",
      start: new Date(),
      color: "yellow",
      editable: true,
      id: 10
    },
    { title: "Event Now", start: new Date(), id: 2 },
    {
      title: "test",
      start: "2019-12-12",
      color: "red",
      city: "cartagena",
      editable: true,
      id: 1
    }
  ];

  constructor(
    private modalService: NgbModal,
    private reminderService: ReminderService
  ) {}

  ngOnInit() {
    this.reminderService.getReminder().subscribe(data => {
      if (data[0] != undefined)
        this.calendarEvents = this.calendarEvents.concat(data[0]);
    });
  }

  handleDateClick(arg) {
    let reminder = new Reminder();
    reminder.start = arg.date;
    this.reminderService.set(reminder);
    this.modalReference = this.modalService.open(ModalCreateSlotComponent, {
      size: "lg"
    });
  }

  calendarEventClick(event) {
    console.log(event);

    console.log(this.calendarEvents);
    this.calendarEvents.forEach(event => {
      console.log(event);
    });
    console.log(event.city);
  }

  modifyTitle(eventIndex, newTitle) {
    this.calendarEvents[eventIndex].title = newTitle;
  }
}
