import { TestBed } from '@angular/core/testing';

import { UserlogicService } from './userlogic.service';

describe('UserlogicService', () => {
  let service: UserlogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserlogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
