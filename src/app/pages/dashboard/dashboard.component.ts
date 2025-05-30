import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";
import { NavbarMenuComponent } from "../../components/navbar-menu/navbar-menu.component";

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SideMenuComponent, NavbarMenuComponent],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent {
  title = 'front-sist-misional';

}
