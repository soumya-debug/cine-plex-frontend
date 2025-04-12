import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  role;

  constructor() { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    console.log(this.role);
  }

  logout(){
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    this.ngOnInit();
  }

}
