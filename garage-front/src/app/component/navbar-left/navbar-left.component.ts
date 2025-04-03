import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-left',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './navbar-left.component.html',
  styleUrl: './navbar-left.component.css',
})
export class NavbarLeftComponent {
  userData = {
    userType: '',
    _id: '',
  };


  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {
    this.usersService.getUserProfile().subscribe(
      (userData) => {
        console.log('Données utilisateur récupérées navbar left:', userData);
        this.userData = { ...userData };
        console.log('userData', this.userData);
        console.log('userData._id', this.userData._id);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
        alert('Erreur lors de la récupération des données utilisateur');
      },
    );
  }



  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  logOut() {
    this.authService.logout();
  }


  toggleMenu() {
    const dashboardNav = document.getElementById('dashboard-nav');
    const dashboardToolbar = document.getElementById('dashboard-toolbar');
    const dashboardApp = document.getElementById('dashboard-app');

    if (dashboardNav) {
      dashboardNav.style.display =
        dashboardNav.style.display === 'none' ? 'block' : 'none';
    }

    if (dashboardToolbar) {
      dashboardToolbar.style.left =
        dashboardToolbar.style.left === '0px' ? '238px' : '0px';
    }

    if (dashboardApp) {
      dashboardApp.style.marginLeft =
        dashboardApp.style.marginLeft === '0px' ? '238px' : '0px';
    }
  }
}
