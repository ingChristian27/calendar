import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Reminder } from "../../models/reminder";
import { ErrorFormReminder } from "../../models/error-form-reminder";
import { colors } from "../../models/colors";
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { ReminderService } from "../../services/reminder.service";
import { WeatherCitiesService } from "../../services/weather-cities.service";
import * as moment from "moment";

@Component({
  selector: "app-modal-create-slot",
  templateUrl: "./modal-create-slot.component.html",
  styleUrls: ["./modal-create-slot.component.scss"]
})
export class ModalCreateSlotComponent implements OnInit {
  formReminder: FormGroup;
  error: ErrorFormReminder;
  colors: any;
  citiesWeather: [];
  reminder: Reminder;
  currentCity: string;
  currentDate: string;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private reminderService: ReminderService,
    private serviceWeather: WeatherCitiesService
  ) {
    this.reminder = this.reminderService.get();
    this.createForm();
    this.error = new ErrorFormReminder();
    this.colors = colors;
  }
  ngOnInit() {}

  createForm() {
    const formatStartDate = moment(this.reminder.start).format("YYYY-MM-DD");

    this.formReminder = this.fb.group({
      title: [
        this.reminder.title,
        [Validators.maxLength(30), Validators.required]
      ],
      city: [this.reminder.city],
      start: [formatStartDate],
      color: ["blue"],
      id: [this.reminder.id]
    });
  }

  onClickSubmit() {
    if (!this.formReminder.invalid) {
      this.closeModal();
      this.reminder = this.formReminder.value;
      this.reminderService.set(this.reminder);
      this.reminderService.notificationChange();
    } else {
      this.printError(this.formReminder.controls);
    }
  }

  printError(controls) {
    if (controls.title.errors) {
      let error = controls.title.errors;
      if (error.required) this.error.name.message = "input is required";
      if (error.maxlength)
        this.error.name.message = "your string must be less than 30 characters";
      this.error.name.status = true;
    }
  }

  findCity() {
    let city = this.formReminder.value.city;
    let date = new Date(this.formReminder.value.start).getTime();
    let data = { city, date };

    this.serviceWeather.getCities(data).subscribe(
      res => {
        this.citiesWeather = res.list;
      },
      err => {}
    );
  }

  selectCity(item) {
    this.formReminder.controls["city"].setValue(
      item.name + " , " + item.sys.country + " " + item.weather[0].description
    );
    this.citiesWeather = [];
  }

  closeModal() {
    this.activeModal.close();
  }
}
