import { Component, OnInit } from '@angular/core';

// local services
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  currentWeatherData: any;
  currentTime: any;

  constructor(private weatherService: WeatherService) {
    setInterval(() => {
      this.getCurrentWeather();
    }, 6000000);
  }

  ngOnInit() {
    this.getCurrentWeather();
  }

  reload() {
    this.getCurrentWeather();
  }

  getCurrentWeather() {
    this.currentTime = new Date().toLocaleTimeString().replace(/:\d+ /, ' ');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.weatherService.getWeatherForCurrentLocation(position)
          .subscribe((data) => {
            this.currentWeatherData = data;
          });
      });
    }
  }
}
