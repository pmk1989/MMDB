// movie.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = '5c06fed2cdf4dfcdab132d9e67c1c2e7';
  private baseUrl = 'https://api.themoviedb.org/3';
  private imagePrefix = 'https://www.themoviedb.org/t/p/w1280';

  public $onSearch = new Subject<any>();
  public $$onSearch = this.$onSearch.asObservable();

  
  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    const url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
    return this.http.get(url);
  }

  searchMovies(query: string): Observable<any> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
    return this.http.get(url);
  }

  getMovieDetails(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=en-US`;
    return this.http.get(url);
  }

  getImageUrl(posterPath: string): string {
    return `${this.imagePrefix}${posterPath}`;
  }
}
