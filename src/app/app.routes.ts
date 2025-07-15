import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';

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
        canActivate: [adminGuard]
      },
      {
        path: 'mapa_patrullaje',
        loadComponent: () =>
          import('./pages/mapa-patrullaje/mapa-patrullaje.component'),
        canActivate: [adminGuard]
      },
      {
        path: 'zonas_patrullaje',
        loadComponent: () =>
          import('./pages/asignacion-rutas/asignacion-rutas.component'),
        canActivate: [adminGuard]
      },
      {
        path: 'reportes',
        loadComponent: () =>
          import('./pages/reportes/reportes.component'),
        canActivate: [adminGuard]
      },
      {
        path: 'panel',
        loadComponent: () =>
          import('./pages/panel/panel.component'),
        canActivate: [adminGuard]
      },
      {
        path: 'perfil',
        loadComponent: () => import('./auth/profile-page/profile-page.component'),
        canActivate: [adminGuard]
      },
      {
        path: 'chats',
        loadComponent: () => import('./pages/chats/chats.component'),
        canActivate: [adminGuard]
      },
      {
        path: 'calendario',
        loadComponent: () => import('./pages/calendario/calendario.component'),
        canActivate: [adminGuard]
      },
      {
        path: 'eventos_masivos_crud',
        loadComponent: () => import('./pages/panel/eventos_masivos-crud/eventos_masivos-crud.component'),
        canActivate: [adminGuard]
      },
      {
        path: 'vehiculos_crud',
        loadComponent: () => import('./pages/panel/vehiculos-crud/vehiculos-crud.component'),
        canActivate: [adminGuard]
      },
      {
        path: 'zonas_patrullaje_crud',
        loadComponent: () => import('./pages/panel/zonas_patrullaje-crud/zonas_patrullaje-crud.component'),
        canActivate: [adminGuard]
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
