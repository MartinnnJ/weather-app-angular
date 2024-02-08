import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { tableHeader } from '../../helpers/constances';
import { findDivider, transformData } from '../../helpers/functions';
import { TimelineSelect } from '../../models/TimelineSelect';

@Component({
  selector: 'app-forecast-table',
  templateUrl: './forecast-table.component.html',
  styleUrl: './forecast-table.component.css'
})
export class ForecastTableComponent implements OnInit {
  cityName!: string;

  readonly timelineSelectOptions: TimelineSelect[] = [
    { value: 0, label: 'For past 7 days' },
    { value: 1, label: 'For upcoming 7 days' },
  ];

  timelineSelectValue = 0;

  readonly tableHeaderData = tableHeader;
  tableBodyData: any[][] = [];

  tableBodyDataPast!: any[][];
  tableBodyDataUpcoming!: any[][];

  constructor(private forecastService: ForecastService) {}

  selectValueChangeHandler(newValue: number) {
    if (newValue === 0) {
      this.tableBodyData = this.tableBodyDataPast;
    } else {
      this.tableBodyData = this.tableBodyDataUpcoming;
    }
  }

  ngOnInit(): void {
    this.cityName = this.forecastService.selectedLocation.locationName;
    this.forecastService.loadForecastData()
      .subscribe((data: any) => {
        const hourlyData = data.hourly;
        const tableData = transformData(hourlyData);
        const dividerIndex = findDivider(hourlyData.time);
        this.tableBodyDataPast = tableData.slice(0, dividerIndex + 1).reverse();
        this.tableBodyDataUpcoming = tableData.slice(dividerIndex, -1);
        this.tableBodyData = this.timelineSelectValue === 0 ? this.tableBodyDataPast : this.tableBodyDataUpcoming;
      })
  }
}
