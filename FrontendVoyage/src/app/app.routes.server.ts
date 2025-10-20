import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AjouterVoyageComponent } from './pages/ajouter-voyage/ajouter-voyage.component';

export const serverRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ajouter-voyage', component: AjouterVoyageComponent },
  { path: 'modifier-voyage/:id', component: AjouterVoyageComponent }
];
