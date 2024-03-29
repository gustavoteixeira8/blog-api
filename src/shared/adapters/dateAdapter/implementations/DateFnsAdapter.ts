import { add as addFns, lightFormat as formatFns, isAfter as isAfterFns, parseISO } from 'date-fns';
import { DateAdapterProtocol, DurationOptionsProtocol } from '../DateAdapterProtocol';

export class DateFnsAdapter implements DateAdapterProtocol {
  public isAfter(date: Date, dateToCompare: Date): boolean {
    return isAfterFns(date, dateToCompare);
  }

  public add(date: Date, duration: DurationOptionsProtocol): Date {
    if (typeof date === 'string') {
      date = parseISO(date);
    }

    return addFns(date, duration);
  }

  public format(date: Date): string {
    return formatFns(date, 'yyyy-MM-dd HH:mm:ss');
  }
}
