import SearchFactory from './SearchFactory';

export default class SearchService {
  searchFactory: SearchFactory;

  constructor() {
    this.searchFactory = new SearchFactory();
  }
}
