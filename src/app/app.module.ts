import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeatBookingComponent } from './seat-book/seat-booking.component';
import { AdminEditMovieComponent } from './admin-edit-movie/admin-edit-movie.component';
import { AdminEditTheaterComponent } from './admin-edit-theater/admin-edit-theater.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminMoviesComponent } from './admin-movies/admin-movies.component';
import { AdminAddTheaterComponent } from './admin-add-theater/admin-add-theater.component';
import { AdminAddMovieComponent } from './admin-add-movie/admin-add-movie.component';
import { AdminTheatersComponent } from './admin-theaters/admin-theaters.component';
import { ChooseComponent } from './choose/choose.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';

import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FooterComponent } from './footer/footer.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { TicketBookingHistoryComponent } from './ticket-booking-history/ticket-booking-history.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieShowComponent } from './movie-show/movie-show.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { PaymentConfirmationComponent } from './payment-confirmation/payment-confirmation.component';
import { AuthInterceptor } from './AuthInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    UserLoginComponent,
    NavbarComponent,
    SeatBookingComponent,
    PaymentConfirmationComponent,
    UserSignupComponent,
    AdminEditMovieComponent,
    AdminEditTheaterComponent,
    ForgetPasswordComponent,
    AdminMoviesComponent,
    AdminAddTheaterComponent,
    AdminAddMovieComponent,
    AdminTheatersComponent,
    ChooseComponent,
    MovieShowComponent,
    CheckoutComponent,
    PaymentComponent,
    AdminLoginComponent,
    TicketBookingHistoryComponent,
    FooterComponent,
    UserLoginComponent,
    UserSignupComponent,
    TicketBookingHistoryComponent,
    NavbarComponent,
    MovieShowComponent,
    UserHomeComponent,
    PaymentConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent],
})
export class AppModule {}
