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

  constructor(private rickMortyService: RickMortyService) {}

  ngOnInit(): void {
    this.searchCharacters();
  }

searchCharacters(): void {
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

}
