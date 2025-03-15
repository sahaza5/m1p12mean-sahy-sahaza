import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-sidebar-client',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar-client.component.html',
  styleUrl: './sidebar-client.component.css',
})
export class SidebarClientComponent implements OnInit {
  currentUser: any;

  activeRoute: string = 'your-car'; // Default active route

  constructor(
    private router: Router,
    private LoginService: LoginService,
    private cdRef: ChangeDetectorRef,
  ) {}

  clientName: string | null = null;

  ngOnInit() {
    // this.currentUser = localStorage.getItem('clientName'); // Get client name from localStorage
    this.LoginService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  setActive(route: string): void {
    this.activeRoute = route;
    // Navigate using the router
    if (route === 'your-car') {
      this.router.navigate(['/client-dashboard']);
    } else if (route === 'appointment') {
      this.router.navigate(['/appointment']);
    } else if (route === 'payement') {
      this.router.navigate(['/payement']);
    }
  }
}
