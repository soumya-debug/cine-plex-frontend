import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-movie-show',
  templateUrl: './movie-show.component.html',
  styleUrls: ['./movie-show.component.css'],
})
export class MovieShowComponent implements OnInit {
  moviesList;

  constructor(
    private apiService: CommunicationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiService.getAllActiveMovies().subscribe(
      (result) => {
        this.moviesList = result;
        console.log(this.moviesList);
      },
      (error) => console.log(error)
    );
  }
}
