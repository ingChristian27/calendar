import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class WeatherCitiesService {
  key = "53b5293dc61515abdf73444ddba5d061";
  cities: any = [];
  constructor(private httpClient: HttpClient) {}

  getCities(data): Observable<any> {
    let url =
      "http://api.openweathermap.org/data/2.5/find?q=" +
      data.city +
      "&type=like&APPID=" +
      this.key +
      "&sort=populationcnt=30" +
      "&_=" +
      data.date;
    console.log(url);
    return this.httpClient.get(url);
  }
}

//https://openweathermap.org/data/2.5/find?callback=jQuery1910020856703799930543_1576092200447&q=bogota&type=like&sort=population&cnt=30&appid=b6907d289e10d714a6e88b30761fae22&_=1576092200449
