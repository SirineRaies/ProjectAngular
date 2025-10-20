import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with list view mode', () => {
    expect(component.viewMode).toBe('list');
  });

  it('should toggle view mode', () => {
    component.toggleView('grid');
    expect(component.viewMode).toBe('grid');

    component.toggleView('list');
    expect(component.viewMode).toBe('list');
  });

  it('should initialize with empty voyages array', () => {
    expect(component.voyages).toEqual([]);
  });
});
