import AbstractLocalRepository from '../../../base/db/AbstractLocalRepository';

export default class LangsLocalRepository extends AbstractLocalRepository {
  tableName(): string {
    return 'lang';
  }
}
