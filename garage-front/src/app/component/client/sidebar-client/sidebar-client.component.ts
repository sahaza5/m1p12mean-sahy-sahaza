import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators'
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router, private activatedRoute:ActivatedRoute) { }

  clientName: string | null = null;

  ngOnInit(): void {

    this.clientName = localStorage.getItem('clientName'); // Get client name from localStorage

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveRoute();
    });

  }


  updateActiveRoute(): void {
    let currentRoute = this.router.url;

    if (currentRoute.includes('/client-dashboard')) {
        this.activeRoute = 'your-car';
    } else if (currentRoute.includes('/appointment')) {
        this.activeRoute = 'appointment';
    } else if (currentRoute.includes('/payement')) {
        this.activeRoute = 'payement';
    } else {
        this.activeRoute = ''; // Or a default if needed
    }
  }
}
