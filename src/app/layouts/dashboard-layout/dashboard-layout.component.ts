import { Component } from '@angular/core';
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";
import { NavbarMenuComponent } from "../../components/navbar-menu/navbar-menu.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, SideMenuComponent, NavbarMenuComponent],
  templateUrl: './dashboard-layout.component.html',
})
export default class DashboardLayoutComponent { }
