import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  cardHolderName: string;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  movieData: any;
  theaterData: any;
  theater: string;
  theaterId: number;
  movie: string;

  constructor(
    private apiService: CommunicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movieData = this.apiService.getMovieChoosen();
    this.theaterId = this.apiService.getTheaterIdChoosen();

    console.log('Movie Data:', this.movieData);

    if (this.movieData && this.theaterId) {
      this.apiService.getTheaterById(this.theaterId).subscribe(
        (theaterData) => {
          this.theaterData = theaterData;
          console.log('Theater Data:', this.theaterData);
        },
        (error) => {
          console.error('Failed to fetch theater data!', error);
        }
      );
    }
  }

  payment() {
    if (!this.movieData || !this.theaterData) {
      console.error('Movie data or theater data is missing.');
      return;
    }

    const paymentData = {
      cardHolderName: this.cardHolderName,
      cardNumber: this.cardNumber,
      cvv: this.cvv,
      expiryDate: this.expiryDate,
    };

    const movieName = this.movieData.name || 'Unknown Movie';

    this.apiService.processCheckout(paymentData).subscribe(
      (response) => {
        console.log('Payment Successful!', response);

        const bookingDetails = {
          user: localStorage.getItem('user_email'),
          movie: movieName,
          theater: this.theaterData.theatreName,
          cardHolderName: this.cardHolderName,
          cardNumber: this.cardNumber,
        };

        this.apiService.addBookingHistory(
          bookingDetails.user,
          bookingDetails.movie,
          bookingDetails.theater,
          bookingDetails.cardHolderName,
          bookingDetails.cardNumber
        ).subscribe(
          (bookingResponse) => {
            console.log('Booking History Stored!', bookingResponse);
            this.router.navigate(['payment-page'], {
              queryParams: paymentData,
            });
          },
          (bookingError) => {
            console.error('Failed to store booking history!', bookingError);
            this.router.navigate(['payment-page'], {
              queryParams: paymentData,
            });
          }
        );
        
      (paymentError) => {
        console.error('Payment Failed!', paymentError);
      }
  });

  }
}
