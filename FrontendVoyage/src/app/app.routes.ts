import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AjouterVoyageComponent } from './pages/ajouter-voyage/ajouter-voyage.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Accueil'
  },
  {
    path: 'ajouter-voyage',
    component: AjouterVoyageComponent,
    title: 'Ajouter un voyage'
  },
  {
    path: 'modifier-voyage/:id',
    component: AjouterVoyageComponent,
    title: 'Modifier un voyage'
  },
  {
    path: 'chercher-voyage/:id',
    component: AjouterVoyageComponent,
  }
];
@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }