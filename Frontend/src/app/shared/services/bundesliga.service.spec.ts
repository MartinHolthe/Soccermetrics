import { TestBed } from '@angular/core/testing';

import { BundesligaService } from './bundesliga.service';

describe('BundesligaService', () => {
  let service: BundesligaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BundesligaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
