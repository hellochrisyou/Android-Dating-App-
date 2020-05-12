import { TestBed } from '@angular/core/testing';

import { StarsService } from './stars.service';

describe('StarsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StarsService = TestBed.get(StarsService);
    expect(service).toBeTruthy();
  });
});
