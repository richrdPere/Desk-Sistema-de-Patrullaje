import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component'),
    children: [
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./pages/gestion-usuarios/gestion-usuarios.component'),
      },
      {
        path: 'mapa_patrullaje',
        loadComponent: () =>
          import('./pages/mapa-patrullaje/mapa-patrullaje.component'),
      },
      {
        path: 'zonas_patrullaje',
        loadComponent: () =>
          import('./pages/zonas-patrullajes/zonas-patrullajes.component'),
      },
      {
        path: 'reportes',
        loadComponent: () =>
          import('./pages/reportes/reportes.component'),
      },
      {
        path: 'panel',
        loadComponent: () =>
          import('./pages/panel/panel.component'),
      },
      // {
      //   path: 'history/:query',
      //   loadComponent: () =>
      //     import('./gifs/pages/gif-history/gif-history.component'),
      // },
      {
        path: '**',
        redirectTo: 'usuarios',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
