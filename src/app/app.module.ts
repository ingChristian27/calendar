import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FullCalendarModule } from "@fullcalendar/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { NgbModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalCreateSlotComponent } from "../app/components/modal-create-slot/modal-create-slot.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [AppComponent, CalendarComponent, ModalCreateSlotComponent],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ModalCreateSlotComponent],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule {}
