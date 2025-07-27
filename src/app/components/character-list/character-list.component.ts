import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RickMortyService } from '../../services/rick-morty.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  searchTerm: string = '';
  status: string = '';
  species: string = '';
  gender: string = '';
  noResults: boolean = false;
  hasSearched: boolean = false;

  favorites: any[] = [];

  constructor(
    private rickMortyService: RickMortyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.searchCharacters(false);

    // Escucha cuando cambia el usuario (login o logout)
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        const stored = localStorage.getItem(`favorites-${user.uid}`);
        this.favorites = stored ? JSON.parse(stored) : [];
      } else {
        this.favorites = [];
      }
    });
  }

  searchCharacters(fromUserAction: boolean = true): void {
    if (fromUserAction) {
      this.hasSearched = true;
    }

    const name = this.searchTerm.trim();
    const selectedSpecies = this.species.trim();
    const selectedStatus = this.status.trim();
    const selectedGender = this.gender.trim();

    this.rickMortyService.getCharacters(
      name,
      selectedStatus,
      selectedSpecies,
      selectedGender
    ).subscribe({
      next: (data: any) => {
        this.characters = data.results || [];
        this.noResults = this.characters.length === 0;
      },
      error: (error) => {
        console.error('Error al obtener personajes:', error);
        this.characters = [];
        this.noResults = true;
      }
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.status = '';
    this.species = '';
    this.gender = '';
    this.hasSearched = false;
    this.searchCharacters(false);
  }

  toggleFavorite(character: any): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      alert('Debes iniciar sesión para agregar a favoritos ❤️');
      return;
    }

    if (this.isFavorite(character)) {
      this.favorites = this.favorites.filter(fav => fav.id !== character.id);
    } else {
      this.favorites.push(character);
    }

    // Guardar favoritos actualizados en localStorage
    localStorage.setItem(`favorites-${user.uid}`, JSON.stringify(this.favorites));
  }

  isFavorite(character: any): boolean {
    return this.favorites.some(fav => fav.id === character.id);
  }
}
