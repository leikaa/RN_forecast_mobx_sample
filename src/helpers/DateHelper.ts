import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import { DateTypes } from '../types/Date';

export default class DateHelper {
  static getCurrentDate = (formatDate: DateTypes) => {
    return format(new Date(), formatDate, { locale: enUS });
  };
}
