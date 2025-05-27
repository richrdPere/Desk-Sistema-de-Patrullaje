import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


export interface MenuOptions {
  label: string;
  icon: string; // Ruta al SVG
  route: string;
}

@Component({
  selector: 'navbar-menu-profile',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-menu-profile.component.html',
})
export class NavbarMenuProfileComponent {
  constructor(private router: Router) { }

  menuOptions: MenuOptions[] = [
    {
      icon: 'assets/icons/navbar/perfil.svg',
      label: 'Perfil',
      route: '/dashboard/perfil',
    },
    {
      icon: 'assets/icons/navbar/settings.svg',
      label: 'Configuración',
      route: '/dashboard/configuracion',
    },
    {
      icon: 'assets/icons/navbar/sign_out.svg',
      label: 'Cerrar Sesión',
      route: '/login',
    },

  ];

  logout() {
    this.router.navigate(['/login']);
  }
}
