export class CalculationLog {
  constructor(
    public time: string,
    public temperature: number,
    public humidity: number,
    public temperatureUnit: number,
    public heatIndex: number,
    public id: string = Math.random().toString(),
  ) {}
}