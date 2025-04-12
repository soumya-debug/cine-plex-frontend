import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginRequest } from '../login-request.interface';
import { BookingHistoryDTO } from './ticket-booking-history/booking-history.model';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  baseUrl = 'http://localhost:8080/';
  dateChoosen;
  timeChoosen;
  movieChoosen: any = null;
  theaterIdChoosen: any;
  theaterChoosen: any;
  choosenSeats;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) { }

  getTheaterIdByName(theaterName: string): Observable<number> {
    return this.httpClient.get<number>(
      `${this.baseUrl}theater/getIdByName/${theaterName}`,
      { headers: this.headers }
    );
  }

  chooseTheater(theaterId: any) {
    this.theaterIdChoosen = theaterId;
  }

  chooseMovie(movie: any) {
    this.movieChoosen = movie;
  }

  getMovieChoosen() {
    return this.movieChoosen;
  }

  getTheaterIdChoosen() {
    return this.theaterIdChoosen;
  }

  getAllMoviesList() {
    return this.httpClient.get(`${this.baseUrl}movies/`, {
      headers: this.headers,
    });
  }

  getAllActiveMovies() {
    return this.httpClient.get(`${this.baseUrl}movieshow/active/`, {
      headers: this.headers,
    });
  }

  getMovieById(id: number) {
    return this.httpClient.get(`${this.baseUrl}movies/${id}`, {
      headers: this.headers,
    });
  }

  addMovie(
    name: string,
    duration: string,
    language: string,
    genre: string,
    banner: string
  ) {
    const body = { name, duration, language, genre, banner };
    return this.httpClient.post(`${this.baseUrl}movies/`, body, {
      headers: this.headers,
    });
  }

  deleteMovie(id: number) {
    return this.httpClient.delete(`${this.baseUrl}movies/${id}`, {
      headers: this.headers,
    });
  }

  editMovie(
    id: number,
    name: string,
    duration: string,
    language: string,
    genre: string,
    banner: string
  ) {
    const body = { name, duration, language, genre, banner };
    return this.httpClient.put(`${this.baseUrl}movies/${id}`, body, {
      headers: this.headers,
    });
  }

  getAllTheatersList() {
    return this.httpClient.get(`${this.baseUrl}theater/`, {
      headers: this.headers,
    });
  }

  getBookSeatsByDateTime(theaterId: number, date: Date, time: string) {
    const body = { date, time };
    return this.httpClient.post(
      `${this.baseUrl}bookedseats/getbydatetimetheaterid/${theaterId}`,
      body,
      { headers: this.headers }
    );
  }

  postBookSeatsByDateTime(theaterId: number, date: Date, time: string, seats) {
    const body = { date, time, seats };
    return this.httpClient.post(
      `${this.baseUrl}bookedseats/postbydatetimetheaterid/${theaterId}`,
      body,
      { headers: this.headers }
    );
  }

  getAllTheatersListByMovieId(movieId) {
    return this.httpClient.get(`${this.baseUrl}theater/bymovie/${movieId}`, {
      headers: this.headers,
    });
  }

  getTheaterById(id: number) {
    return this.httpClient.get(`${this.baseUrl}theater/${id}`, {
      headers: this.headers,
    });
  }

  addTheater(movieId: number, theatreName: string, theatreAddress: string) {
    const body = { theatreName, theatreAddress };
    return this.httpClient.post(`${this.baseUrl}theater/${movieId}`, body, {
      headers: this.headers,
    });
  }

  deleteTheater(id: number) {
    return this.httpClient.delete(`${this.baseUrl}theater/${id}`, {
      headers: this.headers,
    });
  }

  editTheater(
    theaterId: number,
    movieId: number,
    theatreName: string,
    theatreAddress: string
  ) {
    const body = { theatreName, theatreAddress };
    return this.httpClient.put(
      `${this.baseUrl}theater/${theaterId}/${movieId}`,
      body,
      { headers: this.headers }
    );
  }

  // User Login Functionality
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.httpClient.post(`${this.baseUrl}user/authenticate`, body, {
      headers: this.headers,
    }).pipe(
      tap((res: any) => {
        if (res.token) {
          sessionStorage.setItem('jwtToken', res.token);
          sessionStorage.setItem('user', JSON.stringify(res));
        }
      }),
      catchError(this.handleError)
    );
  }

  // Admin Login Functionality
  loginAdmin(loginData: LoginRequest): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}api/admin/login`, loginData, {
      headers: this.headers,
    }).pipe(
      tap((res: any) => {
        if (res.token) {
          sessionStorage.setItem('jwtToken', res.token);
          sessionStorage.setItem('admin', JSON.stringify(res));
        }
      }),
      catchError(this.handleError)
    );
  }

  // User Signup Functionality
  signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
  ) {
    const body = { firstName, lastName, email, password, role };
    return this.httpClient.post(`${this.baseUrl}user/signup`, body, {
      headers: this.headers,
    });
  }

  // Forget Password Functionality
  verifyEmailExists(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(
      `${this.baseUrl}user/verifyEmail/${email}`
    );
  }

  updateUserPassword(userId: number, newPassword: string): Observable<string> {
    const requestBody = newPassword;
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });

    return this.httpClient.post<string>(
      `${this.baseUrl}user/updatePassword/${userId}`,
      requestBody,
      { headers: headers }
    );
  }

  // Add Booking History
  addBookingHistory(
    user: string,
    movie: string,
    theater: string,
    cardHolderName: string,
    cardNumber: string
  ): Observable<any> {
    const body = {
      user,
      movie,
      theater,
      cardHolderName,
      cardNumber,
    };

    console.log('Booking History Request Payload:', body);

    return this.httpClient
      .post(`${this.baseUrl}booking-history/create`, body, {
        headers: this.headers,
        observe: 'response',
      })
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          if (errorResponse.status === 201) {
            console.log('Booking History Stored Successfully!', errorResponse);
          } else {
            console.error('Failed to store booking history!', errorResponse);
          }
          return throwError(() => errorResponse);
        })
      );
  }

  getAllBookingHistory(): Observable<BookingHistoryDTO[]> {
    return this.httpClient.get<BookingHistoryDTO[]>(
      `${this.baseUrl}booking-history/`,
      {
        headers: this.headers,
      }
    );
  }

  processCheckout(paymentData: any) {
    return this.httpClient.post(
      `${this.baseUrl}checkout/processCheckout`,
      paymentData,
      {
        headers: this.headers,
      }
    );
  }

  // Auth Utilities
  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('jwtToken');
  }

  logout(): void {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('admin');
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}
