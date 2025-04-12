import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommunicationService } from '../communication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  verifyEmailForm: FormGroup;
  newPasswordForm: FormGroup;
  isEmailVerified: boolean = false;
  emailNotFound: boolean = false;
  authenticatedUser: any;

  constructor(
    private fb: FormBuilder,
    private communicationService: CommunicationService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verifyEmailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.newPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmitVerifyEmail(): void {
    if (this.verifyEmailForm.valid) {
      const email = this.verifyEmailForm.value.email;

      // Call the backend API to verify the email
      this.communicationService.verifyEmailExists(email).subscribe(
        (response: any) => {
          // Response is the user object if email exists, or null if email not found
          if (response && response.id) {
            this.isEmailVerified = true;
            this.emailNotFound = false;
            this.authenticatedUser = response; // Store the user data in the authenticatedUser variable
          } else {
            this.isEmailVerified = false;
            this.emailNotFound = true;
            this.authenticatedUser = null; // Reset the authenticatedUser if email not found
          }
        },
        (error) => {
          console.error('Error verifying email:', error);
        }
      );
    }
  }
  onSubmitNewPassword(): void {
    if (this.newPasswordForm.valid) {
      const newPassword = this.newPasswordForm.value.password;
      const confirmPassword = this.newPasswordForm.value.confirmPassword;

      if (newPassword === confirmPassword) {
        const userId = this.authenticatedUser.id;

        // Call the updateUserPassword method from the CommunicationService
        this.communicationService
          .updateUserPassword(userId, newPassword)
          .subscribe(
            (response: string) => {
              alert('Password Updated Successfully !!'); // Show success message from the backend
              // Redirect the user to the login page or handle success as needed
              this.router.navigate(['/loginc']);
            },
            (error) => {
              console.error('Error updating password:', error);
              alert('Error updating password. Please try again.');
            }
          );
      } else {
        alert('Passwords do not match. Please try again.');
      }
    }
  }
}
