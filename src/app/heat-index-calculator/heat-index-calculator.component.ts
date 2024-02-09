import { Component, OnInit } from '@angular/core';
import { SelectData } from '../../models/TimelineSelect';
import { CalculationLog } from '../../models/CalculationLog';
import { temperatureSelectData } from '../../helpers/constances';
import {
  calculateHeatIndexCelsius,
  calculateHeatIndexFahrenheit,
  currentTime,
  readFromLocalStorage,
  saveInLocalStorage
} from '../../helpers/functions';

@Component({
  selector: 'app-heat-index-calculator',
  templateUrl: './heat-index-calculator.component.html',
  styleUrl: './heat-index-calculator.component.css'
})
export class HeatIndexCalculatorComponent implements OnInit {
  isError = false;

  readonly temperatureSelectOptions: SelectData[] = temperatureSelectData;
  temperatureSelectValue = 0;

  temperatureInput = 0;
  humidityInput  = 0;
  calculationOutput: undefined | number = undefined;
  calculationLog: CalculationLog[] = [];

  ngOnInit(): void {
    this.calculationLog = readFromLocalStorage();
  }

  get calcLogSliced() {
    return this.calculationLog.slice(0, 5);
  }

  get placeholderValue() {
    return this.temperatureSelectValue === 0 ? '°C' : '°F';
  }

  heatIndexCalculate(event: MouseEvent) {
    // this method needs to be refactored
    let heatIndexCelsius;
    let heatIndexFahrenheit
    const temperatureUnit = this.temperatureSelectValue;

    if (temperatureUnit === 0) {
      // celsius is selected
      if (this.temperatureInput > 26.7) {
        // celsius value is correct
        heatIndexCelsius = calculateHeatIndexCelsius(this.temperatureInput, this.humidityInput);
        this.calculationOutput = +heatIndexCelsius.toFixed(2);
        const calcObj = new CalculationLog(
          currentTime(true),
          this.temperatureInput,
          this.humidityInput,
          this.temperatureSelectValue,
          this.calculationOutput,
        );
        this.calculationLog.unshift(calcObj);
        saveInLocalStorage(calcObj);
        this.isError = false;
      } else {
        // celsius value is incorrect
        this.isError = true;
        this.calculationOutput = undefined;
      }
    }
    if (temperatureUnit === 1) {
      // fahrenheit is selected
      if (this.temperatureInput > 80) {
        // fahrenheit value is correct
        heatIndexFahrenheit = calculateHeatIndexFahrenheit(this.temperatureInput, this.humidityInput);
        this.calculationOutput = +heatIndexFahrenheit.toFixed(2);
        const calcObj = new CalculationLog(
          currentTime(true),
          this.temperatureInput,
          this.humidityInput,
          this.temperatureSelectValue,
          this.calculationOutput,
        );
        this.calculationLog.unshift(calcObj)
        saveInLocalStorage(calcObj);
        this.isError = false;
      } else {
        // fahrenheit value is correct
        this.isError = true;
        this.calculationOutput = undefined;
      }
    }
  }

  temperatureInputChangeHandler(event: Event) {
    const temperatureEl = event.target as HTMLInputElement;
    this.temperatureInput = +temperatureEl.value;
  }

  humidityInputChangeHandler(event: Event) {
    const humidityEl = event.target as HTMLInputElement;
    this.humidityInput = +humidityEl.value;
  }
}
