import AbstractModel from '../../../base/AbstractModel';
import { Nullable } from '../../../base/types/BaseTypes';

export class Wind extends AbstractModel {
  deg: Nullable<number> = null;
  gust: Nullable<number> = null;
  speed: Nullable<number> = null;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
