import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  public movie : any = null
  constructor(private route : ActivatedRoute,public movieService : MovieService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.movieService.getMovieDetails(params['id']).subscribe((movieDetails)=> {
        this.movie = movieDetails;
        console.log(movieDetails);
      })
    })
  }

}
