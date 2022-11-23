import { makeAutoObservable } from 'mobx';

import SearchService from './SearchService';

export class SearchStore {
  searchQuery: string = '';

  private searchService: SearchService;

  constructor() {
    makeAutoObservable(this);
    this.searchService = new SearchService();
  }

  setSearchQuery = (value: string) => {
    this.searchQuery = value;
  };
}
