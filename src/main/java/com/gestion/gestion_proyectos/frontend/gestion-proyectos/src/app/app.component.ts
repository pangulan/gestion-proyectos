// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  ],
  template: `
    <div class="app-container">
      @if (isLoggedIn) {
        <app-navbar></app-navbar>
        <div class="main-content">
          <app-sidebar></app-sidebar>
          <div class="content-area">
            <router-outlet></router-outlet>
          </div>
        </div>
        <app-footer></app-footer>
      } @else {
        <router-outlet></router-outlet>
      }
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .main-content {
      display: flex;
      flex: 1;
    }

    .content-area {
      flex: 1;
      margin-left: 250px;
      padding: 20px;
      background-color: #f5f5f5;
    }

    @media (max-width: 768px) {
      .content-area {
        margin-left: 0;
      }
    }
  `]
})
export class AppComponent {
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }
}