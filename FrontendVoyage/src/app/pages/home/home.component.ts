import { Component, OnInit } from '@angular/core';
import { VoyageService } from '../../services/voyage.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    RouterModule,
    CommonModule,
  ],
  standalone: true
})
export class HomeComponent implements OnInit {
  voyages: any[] = [];
  viewMode: 'list' | 'grid' = 'list'; 

  constructor(private voyageService: VoyageService) {}

  ngOnInit(): void {
    this.loadVoyages();
  }

  loadVoyages(): void {
    this.voyageService.getAllVoyages().subscribe({
      next: (data) => {
        this.voyages = data;
        console.log('Données reçues:', data);
      },
      error: (err) => {
        console.error('Erreur:', err);
      }
    });
  }

  deleteVoyage(id: number): void {
    if (confirm('Supprimer ce voyage ?')) {
      this.voyageService.deleteVoyage(id).subscribe({
        next: () => {
          console.log('Supprimé avec succès');
          this.loadVoyages(); // Rafraîchir la liste
        },
        error: (err) => console.error('Erreur suppression:', err)
      });
    }
  }

  toggleView(mode: 'list' | 'grid'): void {
    this.viewMode = mode;
  }
}
