import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from './../communication.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  moviesList;
  searchMovie: string = '';
  selectedGenre: string = '';

  constructor(
    private apiService: CommunicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiService.getAllMoviesList().subscribe(
      (result) => {
        this.moviesList = result;
        console.log(this.moviesList);
      },
      (error) => console.log(error)
    );
  }

  get filteredMovies() {
    let filtered = this.moviesList;

    if (this.searchMovie) {
      filtered = filtered.filter((movie) =>
        movie.name.toLowerCase().includes(this.searchMovie.toLowerCase())
      );
    }

    if (this.selectedGenre) {
      filtered = filtered.filter((movie) => movie.genre === this.selectedGenre);
    }

    return filtered;
  }

  clearSearch() {
    this.searchMovie = ''; // Clear the search input
  }

  filterByGenre(genre: string) {
    this.selectedGenre = genre;
  }

  applyFilter() {}

  bookMovie(movie: any) {
    this.apiService.movieChoosen = movie;
    this.router.navigate(['/choose']);
  }
}
