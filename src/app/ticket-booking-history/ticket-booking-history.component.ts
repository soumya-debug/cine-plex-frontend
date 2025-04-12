import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { BookingHistoryDTO } from './booking-history.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-booking-history',
  templateUrl: './ticket-booking-history.component.html',
  styleUrls: ['./ticket-booking-history.component.css'],
})
export class TicketBookingHistoryComponent implements OnInit {
  bookingHistory: BookingHistoryDTO[];

  constructor(
    private communicationService: CommunicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBookingHistory();
  }

  loadBookingHistory() {
    this.communicationService.getAllBookingHistory().subscribe((data) => {
      this.bookingHistory = data;
    });
  }

  backToMovieList() {
    this.router.navigate(['admin/movies']); // Adjust the route as needed
  }

  maskCardNumber(cardNumber: string): string {
    const last4Digits = cardNumber.slice(-4);
    const maskedPart = '*'.repeat(cardNumber.length - 4);
    return maskedPart + last4Digits;
  }
}
