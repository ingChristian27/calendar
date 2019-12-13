import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.prod";
@Injectable({
  providedIn: "root"
})
export class WeatherCitiesService {
  private path: string;
  private key: string;

  constructor(private httpClient: HttpClient) {
    this.path = environment.urlWeather;
    this.key = environment.keyWeather;
  }

  getCities(data): Observable<any> {
    let url =
      this.path +
      data.city +
      "&type=like&APPID=" +
      this.key +
      "&sort=populationcnt=30" +
      "&_=" +
      data.date;

    return this.httpClient.get(url);
  }
}
