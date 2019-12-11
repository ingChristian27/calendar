import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Reminder } from "../../models/reminder.models";
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
  citiesWeather: [];
  reminder: Reminder;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private reminderService: ReminderService,
    private serviceWeather: WeatherCitiesService
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
  findCity(event) {
    let city = this.formReminder.value.city;
    console.log(city);
    let data = { city };
    this.serviceWeather.getCities(data).subscribe(
      res => {
        console.log(res);
        this.citiesWeather = res.list;
        console.log(this.citiesWeather);
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
