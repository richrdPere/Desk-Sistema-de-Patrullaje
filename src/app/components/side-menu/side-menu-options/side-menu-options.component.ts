import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOptions {
  icon: string;
  label: string;
  route: string;
  sublabel: string;
}

@Component({
  selector: 'side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {

  constructor(private router: Router) { }

  menuOptions: MenuOptions[] = [
    {
      icon: 'fa-solid fa-map-location-dot',
      label: 'Mapa',
      sublabel: 'Accede al mapa en tiempo real',
      route: '/dashboard/mapa_patrullaje',
    },
    {
      icon: 'fa-solid fa-folder',
      label: 'Panel de Control',
      sublabel: 'Resumen de las actividades realizadas',
      route: '/dashboard/panel',
    },
    {
      icon: 'fa-solid fa-users',
      label: 'Gestion de Serenos ',
      sublabel: 'Gestiona al personal de serenazgo',
      route: '/dashboard/usuarios',
    },
    {
      icon: 'fa-solid fa-car-side',
      label: 'Asignación de Rutas',
      sublabel: 'Gestióna zonas de patrullaje',
      route: '/dashboard/zonas_patrullaje',
    },
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Reportes',
      sublabel: 'Reporta los avances del dia',
      route: '/dashboard/reportes',
    },
    {
      icon: 'fa-solid fa-comment',
      label: 'Chats',
      sublabel: 'Conversa y asigna acciones a los serenos u otros operadores',
      route: '/dashboard/chats',
    },
    {
      icon: 'fa-solid fa-calendar-days',
      label: 'Calendario',
      sublabel: 'Calendario de actividades',
      route: '/dashboard/calendario',
    },
  ];

  logout() {
    this.router.navigate(['/login']);
  }
}
