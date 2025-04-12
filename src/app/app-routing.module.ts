import { ChooseComponent } from './choose/choose.component';
import { AdminEditTheaterComponent } from './admin-edit-theater/admin-edit-theater.component';
import { MovieShowComponent } from './movie-show/movie-show.component';
import { SeatBookingComponent } from './seat-book/seat-booking.component';
import { AdminAddTheaterComponent } from './admin-add-theater/admin-add-theater.component';
import { AdminTheatersComponent } from './admin-theaters/admin-theaters.component';
import { AdminAddMovieComponent } from './admin-add-movie/admin-add-movie.component';
import { AdminMoviesComponent } from './admin-movies/admin-movies.component';
import { AdminEditMovieComponent } from './admin-edit-movie/admin-edit-movie.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { TicketBookingHistoryComponent } from './ticket-booking-history/ticket-booking-history.component';
import { PaymentConfirmationComponent } from './payment-confirmation/payment-confirmation.component';

const routes: Routes = [
  { path: '', redirectTo: 'userlogin', pathMatch: 'full' },
  { path: 'home', component: UserHomeComponent },
  { path: 'userlogin', component: UserLoginComponent },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'usersignup', component: UserSignupComponent },
  { path: 'admin/movies/editmovie/:id', component: AdminEditMovieComponent },
  { path: 'admin/movies', component: AdminMoviesComponent },
  { path: 'admin/movies/addmovie', component: AdminAddMovieComponent },
  { path: 'admin/theaters', component: AdminTheatersComponent },
  { path: 'admin/theaters/addtheater', component: AdminAddTheaterComponent },
  {
    path: 'admin/theaters/edittheater/:id',
    component: AdminEditTheaterComponent,
  },
  { path: 'bookseats', component: SeatBookingComponent },
  { path: 'choose', component: ChooseComponent },
  { path: 'listMovies', component: MovieShowComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'active-show', component: MovieShowComponent },
  { path: 'payment-page', component: PaymentConfirmationComponent },
  { path: 'bookinghistory', component: TicketBookingHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
