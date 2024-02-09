import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForecastTableComponent } from './forecast-table/forecast-table.component';
import { ForecastChartComponent } from './forecast-chart/forecast-chart.component';
import { HeatIndexCalculatorComponent } from './heat-index-calculator/heat-index-calculator.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForecastService } from './forecast.service';
import { HttpClientModule } from '@angular/common/http';
import { SelectComponent } from './select/select.component';

import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  declarations: [
    AppComponent,
    ForecastTableComponent,
    ForecastChartComponent,
    HeatIndexCalculatorComponent,
    PageNotFoundComponent,
    SelectComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({ echarts }),
  ],
  providers: [ForecastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
