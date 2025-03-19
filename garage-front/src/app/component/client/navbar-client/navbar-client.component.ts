import { LoginService } from '../../../services/services-client/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-client.component.html',
  styleUrl: './navbar-client.component.css',
})
export class NavbarClientComponent implements OnInit {
  currentUser: string | null = null;

  constructor(
    private router: Router,
    private LoginService: LoginService,
  ) {}

  ngOnInit() {
    // this.currentUser = localStorage.getItem('clientName'); // Get client name from localStorage
    // this.LoginService.currentUser.subscribe((user) => {
    //   this.currentUser = user;
    // });
  }

  logout() {
    // this.LoginService.logout(); // Use LoginService to handle logout
    // this.router.navigate(['/login']); // Navigate to login page
  }
}
