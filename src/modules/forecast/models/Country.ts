import AbstractModel from '../../../base/AbstractModel';
import { Nullable } from '../../../base/types/BaseTypes';

export class Country extends AbstractModel {
  country: Nullable<string> = null;
  id: Nullable<number> = null;
  sunrise: Nullable<number> = null;
  sunset: Nullable<number> = null;
  type: Nullable<number> = null;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
