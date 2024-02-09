import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { SelectData } from '../../models/TimelineSelect';
import { ChartData } from '../../models/ChartData';
import { chartRenderInfo, currentTime, formatTime } from '../../helpers/functions';
import { EChartsOption } from 'echarts';
import { catchError, throwError } from 'rxjs';
import { timelineSelectData } from '../../helpers/constances';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forecast-chart',
  templateUrl: './forecast-chart.component.html',
  styleUrl: './forecast-chart.component.css'
})
export class ForecastChartComponent implements OnInit {
  cityName!: string;
  readonly timelineSelectOptions: SelectData[] = timelineSelectData;
  timelineSelectValue = 0;

  forecastDataUpcoming!: ChartData;
  forecastDataPast!: ChartData;

  chartOption!: EChartsOption;

  constructor(private forecastService: ForecastService) {}

  handleError(err: HttpErrorResponse) {
    if (err.status === 0) {
      console.log('Network Error!', err.error);
    } else {
      console.log('Server Error!', err.error);
    }
    return throwError(() => new Error('Cannot fetch data from the server.'))
  }

  selectValueChangeHandler(newValue: number) {
    if (newValue === 0) {
      this.chartOption = chartRenderInfo(
        this.cityName,
        this.forecastDataPast.x,
        this.forecastDataPast.y
      ) as EChartsOption;
    } else {
      this.chartOption = chartRenderInfo(
        this.cityName,
        this.forecastDataUpcoming.x,
        this.forecastDataUpcoming.y
      ) as EChartsOption;
    }
  }

  ngOnInit(): void {
    this.cityName = this.forecastService.selectedLocation.locationName;
    this.forecastService.loadForecastData()
      .pipe(catchError(this.handleError))
      .subscribe((data: any) => {
        const timeAxisData: string[] = data.hourly.time.map((str: string) => formatTime(str));
        const tempAxisData: number[] = data.hourly.temperature_2m;

        const now = currentTime();
        const nowIndex = timeAxisData.findIndex(str => str === now);

        const [timeAxisDataPast, tempAxisDataPast] = [
          timeAxisData.slice(0, nowIndex + 1),
          tempAxisData.slice(0, nowIndex + 1)
        ];
        const [timeAxisDataUpcoming, tempAxisDataUpcoming] = [
          timeAxisData.slice(nowIndex, -1),
          tempAxisData.slice(nowIndex, -1)
        ];

        this.forecastDataPast = new ChartData(timeAxisDataPast, tempAxisDataPast);
        this.forecastDataUpcoming = new ChartData(timeAxisDataUpcoming, tempAxisDataUpcoming);

        const initPlot = this.timelineSelectValue === 0 ?
          this.forecastDataPast : this.forecastDataUpcoming;
          
        this.chartOption = chartRenderInfo(
          this.cityName,
          initPlot.x,
          initPlot.y
        ) as EChartsOption;
      })
  }
}
