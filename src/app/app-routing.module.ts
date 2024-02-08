import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastTableComponent } from './forecast-table/forecast-table.component';
import { ForecastChartComponent } from './forecast-chart/forecast-chart.component';
import { HeatIndexCalculatorComponent } from './heat-index-calculator/heat-index-calculator.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: ForecastTableComponent },
  { path: 'chart', component: ForecastChartComponent },
  { path: 'calculator', component: HeatIndexCalculatorComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
