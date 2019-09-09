import { environment } from './../../../environments/environment';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnInit {

  userPostion: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  getWeatherForCurrentLocation(position) {
    return this.http
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${environment.openWeatherMap.appid}`);
  }
}
