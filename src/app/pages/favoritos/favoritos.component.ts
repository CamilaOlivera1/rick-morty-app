import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CharacterListService } from '../../services/character-list.service';
import { filter } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
  animations: [
    trigger('fadeOut', [
      state('in', style({ opacity: 1, transform: 'scale(1)' })),
      state('out', style({ opacity: 0, transform: 'scale(0.8)' })),
      transition('in => out', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class FavoritosComponent implements OnInit {
  favoritos: any[] = [];

  constructor(
    private authService: AuthService,
    private characterListService: CharacterListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavorites();

    // Escuchamos cuando el usuario vuelve a /favoritos para recargar
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadFavorites();
    });
  }

  loadFavorites(): void {
  const user = this.authService.getCurrentUser();
  if (user) {
    const favoritosRaw = this.characterListService.getFavorites();
    this.favoritos = favoritosRaw.map(character => ({
      ...character,
      removing: false
    }));
  } else {
    this.favoritos = [];
  }
}
eliminarFavorito(character: any): void {
  character.removing = true;
  setTimeout(() => {
    this.characterListService.removeFavorite(character);
    this.favoritos = this.favoritos.filter(fav => fav.id !== character.id);
  }, 300);
}


 /*eliminarFavorito(character: any): void {
    character.removing = true;
    setTimeout(() => {
      this.characterListService.removeFavorite(character);
      this.favoritos = this.characterListService.getFavorites();
      this.favoritos.forEach(fav => fav.removing = false);
    }, 300); // tiempo de la animación
  }*/
}
