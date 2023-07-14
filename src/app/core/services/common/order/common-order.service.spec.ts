import { TestBed } from '@angular/core/testing';

import { CommonOrderService } from './common-order.service';

describe('CommonOrderService', () => {
  let service: CommonOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
