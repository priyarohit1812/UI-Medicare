import { TestBed } from '@angular/core/testing';

import { CommonProductService } from './common-product.service';

describe('CommonProductService', () => {
  let service: CommonProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
