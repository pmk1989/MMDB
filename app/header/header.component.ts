import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { MovieService } from '../services/movie.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public keyup = new Subject<any>();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.setupSearchListener();
  }

  private setupSearchListener(): void {
    this.keyup
      .pipe(
        map((event: any) => event?.target?.value),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((searchString) => {
        if(searchString == "") {
          this.movieService.getMovies().subscribe((data)=> {
            this.movieService.$onSearch.next(data);
          })
        } else {
          this.movieService.searchMovies(searchString).subscribe((data)=> {
            this.movieService.$onSearch.next(data);
          })
        }
      });
  }
}
