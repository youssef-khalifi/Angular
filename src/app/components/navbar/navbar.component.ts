import { Component } from '@angular/core';

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
}
