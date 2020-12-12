import { TestBed } from '@angular/core/testing';

import { PostNotificationService } from './post-notification.service';

describe('PostNotificationService', () => {
  let service: PostNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
