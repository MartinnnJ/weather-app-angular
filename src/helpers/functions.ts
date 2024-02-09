import { CalculationLog } from "../models/CalculationLog";

export function formatTime(timeString: string) {
  const dateTimeObject = new Date(timeString);

  const hours = dateTimeObject.getHours().toString().padStart(2, '0');
  const minutes = dateTimeObject.getMinutes().toString().padStart(2, '0');
  const day = dateTimeObject.getDate().toString().padStart(2, '0');
  const month = (dateTimeObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dateTimeObject.getFullYear();

  const formattedTime = `${day}.${month}.${year} ${hours}:${minutes}`;

  return formattedTime;
}

export function saveInLocalStorage(obj: CalculationLog) {
  const arr = [];
  const storedData = localStorage.getItem('heat-index') as string;
  if (storedData) {
    const storedDataParsed = JSON.parse(storedData);
    arr.push(...storedDataParsed);
  }
  arr.unshift(obj);
  if (arr.length > 5) {
    arr.pop(); // arr will be always 5 items length
  }
  localStorage.setItem('heat-index', JSON.stringify(arr));
}

export function readFromLocalStorage() {
  const storedData = localStorage.getItem('heat-index') as string;
  if (storedData) {
    return JSON.parse(storedData);
  }

  return [];
}

export function calcPaginatorValues(maxLength: number, itemsPerPage: number) {
  const paginatorLength = Math.ceil(maxLength / itemsPerPage);
  return new Array(paginatorLength).fill('-').map((_, index) => index + 1);
}

export function currentTime(min: boolean = false) {
  const currentDate = new Date();

  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  if (min === true) {
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  return `${day}.${month}.${year} ${hours}:00`;
}

export function findDivider(data: string[]) {
  const now = currentTime();
  const formattedTimeArr = data.map(str => formatTime(str));
  const nowIndex = formattedTimeArr.findIndex(dateStr => dateStr === now);

  return nowIndex;
}

export function transformData(data: any) {
  const temp = [];

  const dataValues: any[][] = Object.values(data);
  const formattedTimeArr = dataValues[0].map(str => formatTime(str));
  dataValues.splice(0, 1, formattedTimeArr);

  for (let i = 0; i < dataValues[0].length; i++) {
    const tableRow = [i + 1];
    for (const [index, _] of dataValues.entries()) {
      tableRow.push(dataValues[index][i])
    }
    temp.push(tableRow);
  }
  
  return temp;
}

export function celsiusToFahrenheit(celsius: number) {
  const fahrenheit = (celsius * 9 / 5) + 32;
  return fahrenheit;
}

export function fahrenheitToCelsius(fahrenheit: number) {
  const celsius = (fahrenheit - 32) * 5 / 9;
  return celsius;
}

export function calculateHeatIndexFahrenheit(fahrenheit: number, humidity: number) {
  const heatIndex = -42.379 + 2.04901523 * fahrenheit + 10.14333127 * humidity
  - 0.22475541 * fahrenheit * humidity - 6.83783e-03 * fahrenheit * fahrenheit
  - 5.481717e-02 * humidity * humidity + 1.22874e-03 * fahrenheit * fahrenheit * humidity
  + 8.5282e-04 * fahrenheit * humidity * humidity - 1.99e-06 * fahrenheit * fahrenheit * humidity * humidity;

return heatIndex;
}

export function calculateHeatIndexCelsius(celsius: number, humidityPercent: number) {
  const heatIndex = -8.78469475556 +
    1.61139411 * celsius +
    2.33854883889 * humidityPercent +
    -0.14611605 * celsius * humidityPercent +
    -0.012308094 * (celsius ** 2) +
    -0.0164248277778 * (humidityPercent ** 2) +
    0.002211732 * (celsius ** 2) * humidityPercent +
    0.00072546 * celsius * (humidityPercent ** 2) +
    -0.000003582 * (celsius ** 2) * (humidityPercent ** 2);

  return heatIndex;
}

export function chartRenderInfo(cityName: string, xAxisData: string[], yAxisData: number[]) {
  return {
    title: {
      text: `High temperatures (°C) for ${cityName}`,
      left: "center",
      top: "top",
      padding: [20, 0, 0, 0],
      textStyle: {
        fontSize: 20
      },
    },
    xAxis: {
      name: 'time [x]',
      nameLocation: 'middle',
      nameTextStyle: {
        fontSize: 20,
        padding: [20, 0, 0, 0],
      },
      type: 'category',
      data: [...xAxisData],
    },
    yAxis: {
      name: '°C [y]',
      nameLocation: 'middle',
      nameTextStyle: {
        fontSize: 20,
        padding: [0, 0, 20, 0],
      },
      type: 'value',
    },
    series: [
      {
        data: [...yAxisData],
        type: 'line',
      },
    ],
  }
}