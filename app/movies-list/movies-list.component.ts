import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {


  searchResults:any[] = []
  notFound = false;
  isLoading=false;
  showMovieDetails = false
  constructor(public movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
    this.movieService.$$onSearch.subscribe({
      next: (Response: any ) => {
       this.notFound=false;
       if (Response?.results.length > 0){
         this.searchResults = Response.results;
       }else{
         this.notFound = true;
       }
       this.isLoading=false;
      },
     error: (err: any) => {
       this.isLoading=false;
       console.log(err);
     }
   });
  }

  getMovies() {
    this.isLoading=true;
    this.movieService.getMovies().subscribe({
      next: (Response: any ) => {
       console.log(Response);
       this.notFound=false;
       if (Response?.results.length > 0){
         this.searchResults = Response.results;
       }else{
         this.notFound = true;
       }
       this.isLoading=false;
      },
     error: (err: any) => {
       this.isLoading=false;
       console.log(err);
     }
   });
  }

}
