import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from '../communication.service';
import { BookingHistoryDTO } from './booking-history.model';

@Component({
  selector: 'app-ticket-booking-history',
  templateUrl: './ticket-booking-history.component.html',
  styleUrls: ['./ticket-booking-history.component.css'],
})
export class TicketBookingHistoryComponent implements OnInit {
  bookingHistory: BookingHistoryDTO[] = [];

  constructor(
    private communicationService: CommunicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBookingHistory();
  }

  loadBookingHistory(): void {
    this.communicationService.getAllBookingHistory().subscribe({
      next: (data) => {
        this.bookingHistory = data;
      },
      error: (err) => {
        console.error('Failed to load booking history', err);
      },
    });
  }

  backToMovieList(): void {
    this.router.navigate(['admin/movies']);
  }

  maskCardNumber(cardNumber: string): string {
    const visibleDigits = 4;
    const last4 = cardNumber?.slice(-visibleDigits);
    const masked = '*'.repeat(cardNumber.length - visibleDigits);
    return masked + last4;
  }
}
