import AbstractModel from '../../../base/AbstractModel';
import { Nullable } from '../../../base/types/BaseTypes';

export class Clouds extends AbstractModel {
  all: Nullable<number> = null;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
