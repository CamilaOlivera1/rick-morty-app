import { Component, signal } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, CharacterListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rick-morty-app';
  isLoggedIn = signal(false); 

  constructor(public router: Router, private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn.set(!!user);
    });
  }

  get isUserLoggedIn(): boolean {
    return this.isLoggedIn();
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/home']); // redirige a home
    });
  }

  public isAuthPage(): boolean {
    return ['/login', '/register'].includes(this.router.url);
  }

  // Muestra los botones solo si está en /home y no logueado
  public showGuestButtons(): boolean {
    return !this.isUserLoggedIn && ['/home', '/'].includes(this.router.url);
  }

  // Muestra Favoritos y Cerrar sesión si está logueado
  public showUserButtons(): boolean {
    return this.isUserLoggedIn;
  }
}
