import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOptions {
  icon: string;
  label: string;
  route: string;
  sublabel: string;
}
@Component({
  selector: 'app-panel',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './panel.component.html',
})
export default class PanelComponent {
  menuOptions: MenuOptions[] = [
    {
      icon: 'fa-solid fa-map-marked-alt',
      label: 'Zonas de Patrullaje',
      sublabel: 'Ver y gestionar zonas asignadas a patrullas.',
      route: '/dashboard/zonas_patrullaje_crud',
    },
    {
      icon: 'fa-solid fa-car',
      label: 'Vehículos de Patrullaje',
      sublabel: 'Registrar, editar y asignar vehículos a rutas.',
      route: '/dashboard/vehiculos_crud',
    },
    {
      icon: 'fa-solid fa-bullhorn',
      label: 'Eventos Masivos',
      sublabel: 'Informar a la central sobre eventos que requieren presencia policial.',
      route: '/dashboard/eventos_masivos_crud',
    },
  ];
}
