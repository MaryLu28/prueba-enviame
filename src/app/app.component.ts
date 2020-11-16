import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  modified: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly http: HttpClient) {}
  characters: Character[];
  offset: number = 0;
  character: '';

  ngOnInit() {
    this.getCharacters(this.offset).subscribe((data) => {
      this.characters = data;
    });
  }

  getCharacters(offset) {
    const base = 'https://gateway.marvel.com:443/v1/public/characters';
    const apikey = 'c1df50d73cbd5dee60535d4cb03c7d9b';
    const url = `${base}?apikey=${apikey}&offset=${offset}&limit=100`;

    return this.http
      .get<Character[]>(url)
      .pipe(map((data: any) => data.data.results));
  }

  getCharacter(name) {
    const base = 'https://gateway.marvel.com:443/v1/public/characters';
    const apikey = 'c1df50d73cbd5dee60535d4cb03c7d9b';
    const url = `${base}?apikey=${apikey}&name=${name}`;

    return this.http
      .get<Character[]>(url)
      .pipe(map((data: any) => data.data.results));
  }

  onScroll() {
    this.offset += 100;
    this.getCharacters(this.offset).subscribe((data) => {
      this.characters = this.characters.concat(data);
    });
    console.log(this.characters);
  }

  search() {
    if (this.character == '') {
      this.offset = 0;
      this.getCharacters(this.offset).subscribe((data) => {
        this.characters = data;
      });
    } else {
      this.getCharacter(this.character).subscribe((data) => {
        this.characters = data;
      });
    }
  }
}
