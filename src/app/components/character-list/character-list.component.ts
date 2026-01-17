import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RickMortyService } from '../../services/rick-morty.service';
import { AuthService } from '../../services/auth.service';
import { CharacterListService } from '../../services/character-list.service';

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
    private authService: AuthService,
    private characterListService: CharacterListService
  ) {}

  ngOnInit(): void {
    this.searchCharacters(false);

    // Escuchamos login/logout
    this.authService.currentUser$.subscribe(async user => {
      if (user) {
        this.favorites = await this.characterListService.getFavorites();
      } else {
        this.favorites = [];
      }
    });
  }

  searchCharacters(fromUserAction: boolean = true): void {
    if (fromUserAction) this.hasSearched = true;

    const name = this.searchTerm.trim();
    const selectedSpecies = this.species.trim();
    const selectedStatus = this.status.trim();
    const selectedGender = this.gender.trim();

    this.rickMortyService.getCharacters(name, selectedStatus, selectedSpecies, selectedGender)
      .subscribe({
        next: (data: any) => {
          this.characters = data.results || [];
          this.noResults = this.characters.length === 0;
        },
        error: () => {
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

  async toggleFavorite(character: any): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (!user) {
      alert('Debes iniciar sesión para agregar a favoritos ❤️');
      return;
    }

    const alreadyFavorite = this.isFavorite(character);

    if (alreadyFavorite) {
      await this.characterListService.removeFavorite(character);
      this.favorites = this.favorites.filter(fav => fav.id !== character.id);
    } else {
      await this.characterListService.addFavorite(character);
      this.favorites.push(character);
    }
  }

  isFavorite(character: any): boolean {
    return this.favorites.some(fav => fav.id === character.id);
  }
}
