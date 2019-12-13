import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FullCalendarModule } from "@fullcalendar/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { NgbModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalReminderComponent } from "../app/components/modal-reminder/modal-reminder.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent, CalendarComponent, ModalReminderComponent, DashboardComponent],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [ModalReminderComponent],
  providers: [NgbActiveModal, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
