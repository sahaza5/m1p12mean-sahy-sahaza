import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/services-admin-mechanic/login.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router, private LoginService: LoginService) { }


  logout() {
    this.LoginService.logout(); // Use LoginService to handle logout
    this.router.navigate(['/login']); // Navigate to login page
  }
}
