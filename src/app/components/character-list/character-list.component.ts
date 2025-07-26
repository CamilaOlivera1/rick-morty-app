import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RickMortyService } from '../../services/rick-morty.service';

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

  constructor(private rickMortyService: RickMortyService) {}

  ngOnInit(): void {
    this.searchCharacters(false);  // Carga inicial sin activar hasSearched
  }

  // searchCharacters recibe un parámetro para saber si activar el botón o no
  searchCharacters(fromUserAction: boolean = true): void {
    if (fromUserAction) {
      this.hasSearched = true; // Solo activar si es búsqueda hecha por usuario
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
    this.hasSearched = false; // Oculta el botón
    this.searchCharacters(false); // Recarga sin activar botón
  }
}
