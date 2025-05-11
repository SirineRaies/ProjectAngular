import { ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AjouterVoyageComponent } from './pages/ajouter-voyage/ajouter-voyage.component';

const serverRoutes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    data: { renderMode: 'server' } // Ajoutez cette ligne
  },
  { 
    path: 'ajouter-voyage', 
    component: AjouterVoyageComponent,
    data: { renderMode: 'server' }
  },
  // ... autres routes
];

export const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
  
  ]
};