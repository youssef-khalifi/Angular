import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isToggled = false;

  toggleSidebar(): void {
    this.isToggled = !this.isToggled;
  }

  constructor(public authService : AuthService) {
  }
}
