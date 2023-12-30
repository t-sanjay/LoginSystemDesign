import { TestBed } from '@angular/core/testing';

import { UserDashboardService } from './user-dashboard.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('UserDashboardService', () => {
  let service: UserDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [HttpClient]
    });
    service = TestBed.inject(UserDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
