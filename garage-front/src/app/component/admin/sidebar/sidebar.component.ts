import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { filter } from 'rxjs/operators'
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  activeRoute: string = 'mechanic-list'; // Default active route

  constructor(private router: Router, private activatedRoute:ActivatedRoute) { }

  adminName: string | null = null;

  ngOnInit(): void {

    this.adminName = localStorage.getItem('clientName'); // Get client name from localStorage

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveRoute();
    });

  }

  updateActiveRoute(): void {
    let currentRoute = this.router.url;

    if (currentRoute.includes('/admin-dashboard')) {
        this.activeRoute = 'mechanic-list';
    } else if (currentRoute.includes('/appointment')) {
        this.activeRoute = 'appointment';
    } else if (currentRoute.includes('/repair')) {
      this.activeRoute = 'repair';
    } else if (currentRoute.includes('/payement')) {
        this.activeRoute = 'payement';
    } else {
        this.activeRoute = ''; // Or a default if needed
    }
  }

}
