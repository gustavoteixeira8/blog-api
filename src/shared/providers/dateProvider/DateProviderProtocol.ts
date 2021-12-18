export interface DurationOptionsProtocol {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
}

export interface DateProviderProtocol {
  add(date: Date, duration: DurationOptionsProtocol): Date;
  format(date: Date): string;
  isAfter(date: Date, dateToCompare: Date): boolean;
}
