import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { VoyageService } from './voyage.service';

describe('VoyageService', () => {
  let service: VoyageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VoyageService,
        provideHttpClient()
      ]
    });
    service = TestBed.inject(VoyageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have correct base URL', () => {
    expect(service['baseUrl']).toBe('http://localhost:3000');
  });
});
