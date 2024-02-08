import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { locations } from "../helpers/constances";

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  readonly selectedLocation = locations[0];

  constructor(private http: HttpClient) {}

  loadForecastData() {
    const options = {
      params: {
        "latitude": this.selectedLocation.locationCoords[0],
	      "longitude": this.selectedLocation.locationCoords[1],
	      "hourly": ["temperature_2m", "relative_humidity_2m", "surface_pressure", "rain"],
	      "past_days": 7
      }
    };

    return this.http.get('https://api.open-meteo.com/v1/forecast', options);
  }
}
