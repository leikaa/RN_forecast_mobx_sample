import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import { DateTypes } from '../types/Date';

export default class DateHelper {
  static getFormattedLocationDate = (timezone: number, formatDate: DateTypes) => {
    const date = new Date();
    const locationDate = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000 + timezone * 1000);

    return format(locationDate, formatDate, { locale: enUS });
  };
}
