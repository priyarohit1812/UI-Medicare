import { TestBed } from '@angular/core/testing';

import { CommonProductCategoryService } from './common-product-category.service';

describe('CommonProductCategoryService', () => {
  let service: CommonProductCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonProductCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
