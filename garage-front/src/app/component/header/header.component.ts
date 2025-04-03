import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-header',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  userRole: string | null = ''; // Stocke le rôle de l'utilisateur

  userData = {
    txt: '',
    email: '',
    userType: '',
    pswd: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}


  onSubmit() {
    console.log('userData', this.userData);

    this.authService.register(this.userData).subscribe(
      (response: any) => {
        const userId = response.user._id;
        const token = response.token;

        console.log('userId :', userId);

        localStorage.setItem('userId', userId);
        localStorage.setItem('token', `Bearer ${token}`);

        console.log("Réponse de l'API", response);
        console.log('Inscription réussie', response);

        console.log('Router:', this.router); // Vérifiez l'instance du routeur
        this.router.navigate(['/profil', { id: userId }]);
        console.log('Navigation vers /profil réussie');

        // Récupérer la modal de login
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
          const modal = bootstrap.Modal.getInstance(loginModal);
          if (modal) {
            modal.hide();

            loginModal.classList.remove('show');
            document.body.style.cssText = '';
            document.body.classList.replace('modal-open', 'modal-close');

            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
              backdrop.remove();
            }
          }
        }
      },
      (error) => {
        console.error('Erreur de requête', error);
        alert(
          'Erreur lors de la communication avec le serveur. Veuillez réessayer.',
        );
      },
    );
  }

  login() {

    console.log('userData', this.userData);

    this.authService.login(this.userData).subscribe(
      (response: any) => {
        const userId = response.user._id;
        const token = response.token;
        this.userData = { ...response.user };
        this.userRole = response.user.userType;

        localStorage.setItem('userId', userId);
        localStorage.setItem('token', `Bearer ${token}`);

        console.log("Réponse de l'API", response);
        console.log('Connexion réussie', response);

        // Redirection selon le rôle
         switch (this.userRole) {
          case 'CLIENT':
            console.log("CLIENT")
            this.authService.isAuthenticated = true
            this.router.navigate(['/liste-vehicule', { id: userId }]);
            break;
          case 'ADMIN':
            console.log("ADMIN")
            this.authService.isAuthenticated = true
            this.router.navigate(['/liste-rendez-vous', { id: userId }]);
            break;
          case 'EMPLOYEE':
            console.log("EMPLOYEE")
            this.authService.isAuthenticated = true
            this.router.navigate(['/liste-tache', { id: userId }]);
            break;
          default:
            console.error("Rôle inconnu !");
            alert("Erreur : rôle utilisateur inconnu.");
            return;
        }


        // Récupérer la modal de login
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
          const modal = bootstrap.Modal.getInstance(loginModal);
          if (modal) {
            modal.hide();

            loginModal.classList.remove('show');
            document.body.style.cssText = '';
            document.body.classList.replace('modal-open', 'modal-close');

            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
              backdrop.remove();
            }
          }
        }
      },
      (error) => {
        console.error('Erreur de requête', error);
        alert(
          'Erreur lors de la communication avec le serveur. Veuillez réessayer.',
        );
      },
    );
  }


  toggleNavbar() {
    const navbarCollapse = document.querySelector('#navbarResponsive');
    if (navbarCollapse) {
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      } else {
        navbarCollapse.classList.add('show');
      }
    }
  }

  ngOnInit() {

    // Code à exécuter après le chargement de la page
    // Fonction pour réduire la navbar
    const navbarShrink = () => {
      const navbarCollapsible = document.querySelector('#mainNav');
      if (!navbarCollapsible) {
        return;
      }

      if (window.scrollY === 0) {
        navbarCollapsible.classList.remove('navbar-shrink');
      } else {
        navbarCollapsible.classList.add('navbar-shrink');
      }
    };

    // Appliquer la réduction initiale
    navbarShrink();

    // Réduire la navbar au scroll
    window.addEventListener('scroll', navbarShrink);



    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
      try {
        new bootstrap.ScrollSpy(document.body, {
          target: '#mainNav',
          rootMargin: '0px 0px -40%',
        });
      } catch (error) {
        console.error('Erreur ScrollSpy:', error);
      }
    }

    // Gérer le menu responsive
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navLinks = document.querySelectorAll('#navbarResponsive .nav-link');

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (
          navbarToggler &&
          window.getComputedStyle(navbarToggler).display !== 'none'
        ) {
          (navbarToggler as HTMLElement).click();
        }
      });
    });
  }
}

function jwt_decode(token: any): any {
  throw new Error('Function not implemented.');
}
