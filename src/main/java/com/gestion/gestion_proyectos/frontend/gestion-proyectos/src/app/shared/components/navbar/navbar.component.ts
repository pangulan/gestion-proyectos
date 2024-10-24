// navbar.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class NavbarComponent {
  logout() {
    // Implementar lógica de logout
    console.log('Logout clicked');
  }
}