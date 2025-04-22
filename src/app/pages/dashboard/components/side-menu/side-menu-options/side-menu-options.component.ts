import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOptions {
  icon: string;
  label: string;
  route: string;
  sublabel: string;
}

@Component({
  selector: 'dashboard-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {
  menuOptions: MenuOptions[] = [
    {
      //icon: 'fa-solid fa-qrcode',
      icon: 'fa-solid fa-folder',
      label: 'Panel',
      sublabel: 'Resumen de las actividades realizadas',
      route: '/dashboard/panel',
    },
    {
      icon: 'fa-solid fa-users',
      label: 'Gestion de Usuarios ',
      sublabel: 'Gestiona al personal de serenazgo',
      route: '/dashboard/usuarios',
    },
    {
      icon: 'fa-solid fa-map-location-dot',
      label: 'Mapa',
      sublabel: 'Accede al mapa en tiempo real',
      route: '/dashboard/mapa_patrullaje',
    },
    {
      icon: 'fa-solid fa-car-side',
      label: 'Zonas de Patrullaje',
      sublabel: 'Gestióna zonas de patrullaje',
      route: '/dashboard/zonas_patrullaje',
    },
    {
      //icon: 'fa-solid fa-file',
      icon: 'fa-solid fa-chart-line',
      label: 'Reportes',
      sublabel: 'Reporta los avances del dia',
      route: '/dashboard/reportes',
    },
  ];
}
