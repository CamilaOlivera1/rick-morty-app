

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

  constructor(private rickMortyService: RickMortyService) {}

  ngOnInit(): void {
    this.searchCharacters();
  }

  searchCharacters(): void {
    const query = this.searchTerm.trim();
    this.rickMortyService.getCharacters(query).subscribe((data: any) => {
      this.characters = data.results || [];
    });
  }
}
