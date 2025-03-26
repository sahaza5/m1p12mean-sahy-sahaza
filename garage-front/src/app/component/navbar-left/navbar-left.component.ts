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
  // @ViewChild('dashboardNav', { static: true }) dashboardNav!: ElementRef;
  // @ViewChild('dashboard', { static: true }) dashboard!: ElementRef;
  // mobileScreen: MediaQueryList = window.matchMedia("(max-width: 990px)");

  constructor(private usersService: UsersService) {
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

  // ngOnInit(): void {
  // [routerLink]="['/liste-rendez-vous', userData._id]"
  //   // Gérer le clic sur les éléments du menu déroulant
  //   const dropdownToggles = document.querySelectorAll('.dashboard-nav-dropdown-toggle');
  //   dropdownToggles.forEach(toggle => {
  //     this.renderer.listen(toggle, 'click', () => {
  //       const dropdown = toggle.closest('.dashboard-nav-dropdown');
  //       if (dropdown) {
  //         dropdown.classList.toggle('show');
  //         dropdown.querySelectorAll('.dashboard-nav-dropdown').forEach(child => {
  //           child.classList.remove('show');
  //         });
  //       }
  //       toggle.parentElement?.parentElement?.querySelectorAll('.dashboard-nav-dropdown').forEach(sibling => {
  //         if (sibling !== dropdown) {
  //           sibling.classList.remove('show');
  //         }
  //       });
  //     });
  //   });

  //   // Gérer le clic sur le bouton menu
  //   const menuToggle = document.querySelector('.menu-toggle');
  //   if (menuToggle) {
  //     this.renderer.listen(menuToggle, 'click', () => {
  //       if (this.mobileScreen.matches) {
  //         this.dashboardNav.nativeElement.classList.toggle('mobile-show');
  //       } else {
  //         this.dashboard.nativeElement.classList.toggle('dashboard-compact');
  //       }
  //     });
  //   }
  // }

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
