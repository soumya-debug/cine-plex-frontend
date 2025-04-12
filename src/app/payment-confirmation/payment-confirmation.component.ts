import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class PaymentConfirmationComponent implements OnInit {
  cardHolderName: string;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  cardNumberLast4: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    console.log('Received query params:', params);

    this.cardHolderName = params.cardHolderName;
    this.cardNumber = params.cardNumber;
    this.cvv = params.cvv;
    this.expiryDate = params.expiryDate;

    // Extract last 4 digits of the card number for display
    this.cardNumberLast4 = this.cardNumber.substr(this.cardNumber.length - 4);
  }
}
