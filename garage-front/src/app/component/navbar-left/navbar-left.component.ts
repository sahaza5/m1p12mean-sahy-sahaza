import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';


@Component({
  selector: 'app-navbar-left',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './navbar-left.component.html',
  styleUrl: './navbar-left.component.css'
})
export class NavbarLeftComponent {
  // @ViewChild('dashboardNav', { static: true }) dashboardNav!: ElementRef;
  // @ViewChild('dashboard', { static: true }) dashboard!: ElementRef;
  // mobileScreen: MediaQueryList = window.matchMedia("(max-width: 990px)");

  // constructor(private renderer: Renderer2) {}

  // ngOnInit(): void {
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
  isSidebarOpen = false;

  toggleMenu() {
      alert("Menu toggle clicked !");
      // this.isSidebarOpen = !this.isSidebarOpen;
      // Ajoute ici la logique pour ouvrir/fermer le menu
  }
}
