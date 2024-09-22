import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service'; // Ensure this is the correct path to your service
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  city: string = '';
  weatherData: any = null;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    if (!this.city) {
      this.errorMessage = 'Please enter a city name';
      return;
    }
    this.loading = true;
    this.errorMessage = '';

    this.weatherService.getWeather(this.city).subscribe(
      (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'City not found, please try again';
      }
    );
  }
}
