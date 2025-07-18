import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(
    name: string = '',
    status: string = '',
    species: string = '',
    gender: string = ''
  ): Observable<any> {
    let queryParams = [];

    if (name) queryParams.push(`name=${name}`);
    if (status) queryParams.push(`status=${status}`);
    if (species) queryParams.push(`species=${species}`);
    if (gender) queryParams.push(`gender=${gender}`);

    const queryString = queryParams.join('&');
    const url = `${this.apiUrl}?${queryString}`;

    return this.http.get<any>(url);
  }
}