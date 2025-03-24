import { TestBed } from '@angular/core/testing';

import { FinalResultService } from './final-result.service';

describe('FinalResultService', () => {
  let service: FinalResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
