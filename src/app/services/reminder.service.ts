import { Injectable } from "@angular/core";
import { Reminder } from "../models/reminder.models";
@Injectable({
  providedIn: "root"
})
export class ReminderService {
  public reminder: Reminder;
  constructor() {}
  get() {
    return this.reminder;
  }
  set(reminder) {
    this.reminder = reminder;
  }
}
