import { ForecastLocation } from "../models/ForecastLocation";

export const locations: ForecastLocation[] = [
  { locationName: 'London', locationCoords: [51.5085, -0.1257] },
  { locationName: 'Bratislava', locationCoords: [48.1482, 17.1067] },
  { locationName: 'Stará Ľubovňa', locationCoords: [49.2986, 20.6862] },
];

export const tableHeader = [
  '#',
  'Datetime',
  'Temperature [°C]',
  'Relative Humidity [%]',
  'Surface Pressure [hPa]',
  'Weather State (Rain - mm)'
]