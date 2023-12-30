import { TestBed } from '@angular/core/testing';

import { FileUploadService } from './file-upload.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('FileUploadService', () => {
  let service: FileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [HttpClient]
    });
    service = TestBed.inject(FileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
