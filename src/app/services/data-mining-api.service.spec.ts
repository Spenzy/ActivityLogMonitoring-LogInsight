import { TestBed } from '@angular/core/testing';

import { DataMiningAPIService } from './data-mining-api.service';

describe('DataMiningAPIService', () => {
  let service: DataMiningAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataMiningAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
