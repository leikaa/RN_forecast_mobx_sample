import AbstractModel from '../../../base/AbstractModel';
import { Nullable } from '../../../base/types/BaseTypes';

export class Coordinates extends AbstractModel {
  lat: Nullable<number> = null;
  lon: Nullable<number> = null;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
