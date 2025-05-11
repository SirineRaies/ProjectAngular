import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VoyageService } from '../../services/voyage.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajouter-voyage',
  templateUrl: './ajouter-voyage.component.html',
  styleUrls: ['./ajouter-voyage.component.css'],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  standalone: true
})
export class AjouterVoyageComponent implements OnInit {
  voyageForm: FormGroup;
  isEditMode = false;
  voyageId: string | null = null;

  selectedFile: File | null = null;
  imageError: string = '';
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private voyageService: VoyageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.voyageForm = this.fb.group({
      nomAgence: ['', Validators.required],
      adresse: ['', Validators.required],
      offre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.voyageId = params['id'];
        this.loadVoyageData(this.voyageId!);
      }
    });
  }

  loadVoyageData(id: string): void {
    this.voyageService.getVoyage(id).subscribe({
      next: (voyage) => {
        this.voyageForm.patchValue(voyage);
        // facultatif: charger une preview de l'image actuelle si besoin
      },
      error: (err) => console.error('Erreur chargement voyage:', err)
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

      if (!allowedTypes.includes(file.type)) {
        this.imageError = 'Format d\'image non supporté.';
        this.selectedFile = null;
        return;
      }

      this.selectedFile = file;
      this.imageError = '';

      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.voyageForm.invalid || (!this.isEditMode && !this.selectedFile)) {
      if (!this.selectedFile && !this.isEditMode) {
        this.imageError = 'L\'image est requise.';
      }
      return;
    }

    const formData = new FormData();
    formData.append('nomAgence', this.voyageForm.get('nomAgence')?.value);
    formData.append('adresse', this.voyageForm.get('adresse')?.value);
    formData.append('offre', this.voyageForm.get('offre')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditMode && this.voyageId) {
      this.voyageService.updateVoyage(this.voyageId, formData).subscribe({
        next: () => this.redirectAfterSubmit(),
        error: (err) => console.error('Erreur modification:', err)
      });
    } else {
      this.voyageService.createVoyage(formData).subscribe({
        next: () => this.redirectAfterSubmit(),
        error: (err) => console.error('Erreur création:', err)
      });
    }
  }

  redirectAfterSubmit(): void {
    this.router.navigate(['/']);
  }
}
