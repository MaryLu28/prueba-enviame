import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  characters$: Observable<Character[]>;
  offset: number = 0;
  ngOnInit() {
    this.characters$ = this.getCharacters(this.offset);
  }

  getCharacters(offset) {
    const base = 'https://gateway.marvel.com:443/v1/public/characters';
    const apikey = 'c1df50d73cbd5dee60535d4cb03c7d9b';
    const url = `${base}?apikey=${apikey}&offset=${offset}`;

    return this.http
      .get<Character[]>(url)
      .pipe(map((data: any) => data.data.results));
  }
}
