import { TestBed } from '@angular/core/testing';

import { BookCoverService } from './book-cover.service';

describe('BookCoverService', () => {
  let service: BookCoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookCoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
