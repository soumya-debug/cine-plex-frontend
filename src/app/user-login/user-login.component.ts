import { CommunicationService } from '../communication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  loginError: string;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    if (localStorage.getItem('role') != undefined) {
      this.router.navigate(['/home']);
    }
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.communicationService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (result: any) => {
          console.log(result); // Inspect result object
          this.loading = false;
          this.loginError = '';
  
          // Check if result contains user information
          if (result.user) {
            // Store email and role in localStorage
            localStorage.setItem('user_id', result.user.email); // store user email
            localStorage.setItem('role', result.user.role); // store user role
          }
  
          // Store JWT token in sessionStorage
          if (result.token) {
            sessionStorage.setItem('jwtToken', result.token);
          }
  
          this.router.navigate(['/home']);
          location.reload();
        },
        (error) => {
          console.log(error);
          this.loading = false;
          this.loginError = 'Email or password is incorrect';
        }
      );
  }  

}
