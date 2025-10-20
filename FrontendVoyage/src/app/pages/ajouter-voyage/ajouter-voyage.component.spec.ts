import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AjouterVoyageComponent } from './ajouter-voyage.component';

describe('AjouterVoyageComponent', () => {
  let component: AjouterVoyageComponent;
  let fixture: ComponentFixture<AjouterVoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterVoyageComponent],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterVoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.voyageForm).toBeDefined();
    expect(component.voyageForm.get('nomAgence')?.value).toBe('');
    expect(component.voyageForm.get('adresse')?.value).toBe('');
    expect(component.voyageForm.get('offre')?.value).toBe('');
  });

  it('should be in create mode by default', () => {
    expect(component.isEditMode).toBe(false);
    expect(component.voyageId).toBeNull();
  });
});
