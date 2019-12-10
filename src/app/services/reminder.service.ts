import { Injectable } from "@angular/core";
import { Reminder } from "../models/reminder.models";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ReminderService {
  public reminder: Reminder;
  private usersSubject = new BehaviorSubject([]);

  constructor() {}
  get() {
    return this.reminder;
  }
  set(reminder) {
    this.reminder = reminder;
  }
  notificationChange() {
    const resources = this.reminder;
    this.usersSubject.next([resources]);
  }

  getReminder(): Observable<any> {
    return this.usersSubject.asObservable();
  }
}
