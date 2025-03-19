import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-header',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor() {}



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

      //  Activate Bootstrap scrollspy on the main nav element
      // Le problème peut venir de plusieurs choses:
      // 1. L'import de bootstrap n'est peut-être pas correct - il faudrait utiliser:
      //    import * as bootstrap from 'bootstrap';
      // 2. Il faut s'assurer que bootstrap est bien installé via npm
      // 3. La syntaxe de ScrollSpy a changé dans Bootstrap 5

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
      };

      // Gérer le menu responsive
      const navbarToggler = document.querySelector('.navbar-toggler');
      const navLinks = document.querySelectorAll('#navbarResponsive .nav-link');

      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
            (navbarToggler as HTMLElement).click();
          }
        });
      });
  }
}
