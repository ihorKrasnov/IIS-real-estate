import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },

  // Маршрути для клієнтів
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients', loadComponent: () => import('./client-list/client-list.component').then(m => m.ClientListComponent) },
  { path: 'create-client', loadComponent: () => import('./client-create/client-create.component').then(m => m.ClientCreateComponent) },
  { path: 'create-client/:id', loadComponent: () => import('./client-create/client-create.component').then(m => m.ClientCreateComponent) },
  { path: 'view-client/:id', loadComponent: () => import('./client-view/client-view.component').then(m => m.ClientViewComponent) },

  // Маршрути для естейтів
  { path: 'estates', loadComponent: () => import('./estate-list/estate-list.component').then(m => m.EstateListComponent) },
  { path: 'create-estate', loadComponent: () => import('./estate-create/estate-create.component').then(m => m.EstateCreateComponent) },
  { path: 'create-estate/:id', loadComponent: () => import('./estate-create/estate-create.component').then(m => m.EstateCreateComponent) },
  { path: 'view-estate/:id', loadComponent: () => import('./estate-view/estate-view.component').then(m => m.EstateViewComponent) },

  // Маршрути для карт
  { path: 'map', loadComponent: () => import('./map/map.component').then(m => m.MapComponent) },
];

