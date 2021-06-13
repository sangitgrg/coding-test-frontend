import { TestBed } from '@angular/core/testing';

import { UsersAssignedService } from './users-assigned.service';

describe('UsersAssignedService', () => {
  let service: UsersAssignedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersAssignedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
