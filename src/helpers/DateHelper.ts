import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';

import { Localization } from '../modules/langs/LangsAdapter';
import { LangsType } from '../modules/langs/types/Langs';
import { DateTypes } from '../types/Date';

export default class DateHelper {
  static getFormattedLocationDate = (timezone: number, formatDate: DateTypes) => {
    const date = new Date();
    const locationDate = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000 + timezone * 1000);

    return format(locationDate, formatDate, { locale: this.getDateFnsLocale() });
  };

  private static getDateFnsLocale = (): Locale | undefined => {
    switch (Localization.language) {
      case LangsType.EN:
        return enUS;

      case LangsType.RU:
        return ru;
    }
  };
}
