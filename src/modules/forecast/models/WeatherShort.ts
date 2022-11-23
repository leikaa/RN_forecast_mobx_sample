import AbstractModel from '../../../base/AbstractModel';
import { Nullable } from '../../../base/types/BaseTypes';

export class WeatherShort extends AbstractModel {
  description: Nullable<string> = null;
  icon: Nullable<string> = null;
  id: Nullable<number> = null;
  main: Nullable<string> = null;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
