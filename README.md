# WeatherApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.2 and styled with [Bootstrap v5.3](https://getbootstrap.com/docs/5.3/getting-started/introduction/) library with some custom CSS.
All forecast data are fetched from [Open Meteo API](https://open-meteo.com/en/docs).

## App Features

- User can navigate through three pages (**Table** - home page, **Chart** and **Heat Index** page) which are created via built-in Angular **Router Module**. If user manually types path that doesn't exist then **404 page** will be displayed.
- Forecast data are fetched from API with `forecast.service.ts`.
- Weather conditions are displayed for **London by default**. But it can be changed in `forecast.service.ts`. There at **line 9** we can set other city from `locations` array. For example `locations[1]` will fetch forecast data for Bratislava.
- **Table page** consist of one **sorted** and **paginated** table that displays forecast data either for past 7 days or for upcoming 7 days. This range can be set through select element.
- Table is paginated for maximum of **10 rows**. It can be changed in `helpers/constances.ts` file by changing value of `ROWS_PER_PAGE` constance.
- End of a each day is in the table highlighted with thick horizontal line.
- **Chart page** displays a graph that shows the dependence of temperatures (*y axis*) on days (*x axis*) in the range either for the last 7 days or for the next 7 days. This range can be set through select element. To create the chart i used a library called [ngx-echarts](https://www.npmjs.com/package/ngx-echarts#ngmodule).
- **Heat index page** calculates heat index for provided temperature, unit (*both °C and °F works*) and relative humidity. If user types incorrect temperature value, error message will be displayed. The last five calculations (*with correct temperature only*) are stored in **localStorage** and displayed in the table.

## Development server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

*Created by Martin Jancura*