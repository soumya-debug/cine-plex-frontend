import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommunicationService } from '../communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private communicationService: CommunicationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const loginData = this.loginForm.value;

    this.communicationService.loginAdmin(loginData).subscribe({
      next: (response: any) => {
        const result = typeof response === 'string' ? JSON.parse(response).result : response.result;
        if (result === 'success') {
          this.router.navigate(['/admin/movies']);
        } else {
          this.message = 'Invalid admin credentials';
        }
      },
      error: () => {
        this.message = 'An error occurred while processing the request';
      }
    });
  }
}
