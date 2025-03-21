export class DateRange {
  startDate: string;
  endDate: string ;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
