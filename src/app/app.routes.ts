import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      //import('./pages/dashboard/dashboard.component'),
      import('./layouts/dashboard-layout/dashboard-layout.component'),
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
      {
        path: 'perfil',
        loadComponent: () => import('./auth/profile-page/profile-page.component'),
      },
      {
        path: 'chats',
        loadComponent: () => import('./pages/chats/chats.component'),
      },
      {
        path: 'calendario',
        loadComponent: () => import('./pages/calendario/calendario.component'),
      },
      {
        path: 'eventos_masivos_crud',
        loadComponent: () => import('./pages/panel/eventos_masivos-crud/eventos_masivos-crud.component'),
      },
      {
        path: 'vehiculos_crud',
        loadComponent: () => import('./pages/panel/vehiculos-crud/vehiculos-crud.component'),
      },
      {
        path: 'zonas_patrullaje_crud',
        loadComponent: () => import('./pages/panel/zonas_patrullaje-crud/zonas_patrullaje-crud.component'),
      },
      // {
      //   path: 'history/:query',
      //   loadComponent: () =>
      //     import('./gifs/pages/gif-history/gif-history.component'),
      // },
      {
        path: '**',
        redirectTo: 'mapa_patrullaje',
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login-page/login-page.component'),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
