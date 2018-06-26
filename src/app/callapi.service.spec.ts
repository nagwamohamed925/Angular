import { TestBed, inject } from '@angular/core/testing';

import { CallapiService } from './callapi.service';

describe('CallapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CallapiService]
    });
  });

  it('should be created', inject([CallapiService], (service: CallapiService) => {
    expect(service).toBeTruthy();
  }));
});
