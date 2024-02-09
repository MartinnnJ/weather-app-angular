import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { tableHeader, timelineSelectData, ROWS_PER_PAGE } from '../../helpers/constances';
import { calcPaginatorValues, findDivider, transformData } from '../../helpers/functions';
import { SelectData } from '../../models/TimelineSelect';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forecast-table',
  templateUrl: './forecast-table.component.html',
  styleUrl: './forecast-table.component.css'
})
export class ForecastTableComponent implements OnInit {
  cityName!: string;
  readonly timelineSelectOptions: SelectData[] = timelineSelectData;

  timelineSelectValue = 0;
  selectedPage = 1;
  paginatorValues: number[] = [];

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
    this.selectedPage = 1;
    this.paginatorValues = calcPaginatorValues(this.tableBodyData.length, ROWS_PER_PAGE);
  }

  handleError(err: HttpErrorResponse) {
    if (err.status === 0) {
      console.log('Network Error!', err.error);
    } else {
      console.log('Server Error!', err.error);
    }
    return throwError(() => new Error('Cannot fetch data from the server.'))
  }

  get paginatedTableBodyData() {
    const endIndex = this.selectedPage * ROWS_PER_PAGE;
    const startIndex = endIndex - ROWS_PER_PAGE;
    return this.tableBodyData.slice(startIndex, endIndex);
  }

  get dateRange() {
    const lastIndex = (this.tableBodyData.length) - 1;
    return [
      this.tableBodyData[0][1],
      this.tableBodyData[lastIndex][1]
    ];
  }

  ngOnInit(): void {
    this.cityName = this.forecastService.selectedLocation.locationName;
    this.forecastService.loadForecastData()
      .pipe(catchError(this.handleError))
      .subscribe((data: any) => {
        const hourlyData = data.hourly;
        const tableData = transformData(hourlyData);
        const dividerIndex = findDivider(hourlyData.time);
        this.tableBodyDataPast = tableData.slice(0, dividerIndex + 1);
        this.tableBodyDataUpcoming = tableData.slice(dividerIndex, -1);
        this.tableBodyData = this.timelineSelectValue === 0 ? this.tableBodyDataPast : this.tableBodyDataUpcoming;
        this.paginatorValues = calcPaginatorValues(this.tableBodyData.length, ROWS_PER_PAGE);
      })
  }
}
