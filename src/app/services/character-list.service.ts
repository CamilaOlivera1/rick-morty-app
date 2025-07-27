import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterListService {
  constructor(private authService: AuthService) {}

  getFavorites(): any[] {
    const user = this.authService.getCurrentUser();
    if (!user) return [];
    const stored = localStorage.getItem(`favorites-${user.uid}`);
    return stored ? JSON.parse(stored) : [];
  }

  addFavorite(character: any): void {
    const favorites = this.getFavorites();
    favorites.push(character);
    const user = this.authService.getCurrentUser();
    if (user) {
      localStorage.setItem(`favorites-${user.uid}`, JSON.stringify(favorites));
    }
  }

  removeFavorite(character: any): void {
    const favorites = this.getFavorites().filter(fav => fav.id !== character.id);
    const user = this.authService.getCurrentUser();
    if (user) {
      localStorage.setItem(`favorites-${user.uid}`, JSON.stringify(favorites));
    }
  }

  isFavorite(character: any): boolean {
    return this.getFavorites().some(fav => fav.id === character.id);
  }
}
