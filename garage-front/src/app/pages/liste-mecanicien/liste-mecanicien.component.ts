import { Component } from '@angular/core';
import { NavbarLeftComponent } from '../../component/navbar-left/navbar-left.component';
import { MecanicienService } from '../../services/mecanicien.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-liste-mecanicien',
  imports: [NavbarLeftComponent, CommonModule, FormsModule],
  templateUrl: './liste-mecanicien.component.html',
  styleUrl: './liste-mecanicien.component.css',
})
export class ListeMecanicienComponent {
  slicedMecaniciens: any[] = [];
  searchItem = '';
  filteredMecanicien: any[] = [];
  pages: any[] = [];
  currentPage = 1;
  totalPages: number = 0;

  mecaniciens: any;

  constructor(private mecanicienService: MecanicienService) {}

  ngOnInit() {
    this.loadMecaniciens();
  }

  //FILTER SEARCHING
  filterMecanicien(): void {
    // if (this.searchItem.length > 0) {
    console.log('Search:', this.searchItem);
    this.filteredMecanicien = this.mecaniciens.filter((mecanicien: any) => {
      return (
        mecanicien.name
          ?.toLowerCase()
          .includes(this.searchItem.toLowerCase()) ||
        mecanicien.txt?.toLowerCase().includes(this.searchItem.toLowerCase()) ||
        mecanicien.surname
          ?.toLowerCase()
          .includes(this.searchItem.toLowerCase())
      );
    });
    console.log('filter:', this.filteredMecanicien);
    this.totalPages = Math.ceil(this.filteredMecanicien.length / 2);
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
    this.slicedMecaniciens = this.filteredMecanicien.slice(
      (this.currentPage - 1) * 2,
      2 * this.currentPage,
    );
    // }
  }

  //When we click to the page or next or previous button
  goToPage(page: any) {
    if (page > 0 && page <= this.pages.length) {
      this.currentPage = page;
      this.slicedMecaniciens = this.mecaniciens.slice((page - 1) * 2, 2 * page);
    }
  }

  // Charger la liste des mécaniciens
  loadMecaniciens(): void {
    this.mecanicienService.getAllMecaniciens().subscribe(
      (mecaniciens) => {
        this.mecaniciens = mecaniciens;
        console.log('mecaniciens', this.mecaniciens);
        this.totalPages = Math.ceil(this.mecaniciens.length / 2);

        this.pages = [];
        // this.totalPages = Math.ceil(this.mecaniciens.length / 2);

        //INITIALIZE THE NUMBER OF PAGES
        for (let i = 1; i <= this.totalPages; i++) {
          this.pages.push(i);
        }

        //SLICE IT TO THE DEMANDED NUMBER OF ITEMS FOR EACH PAGE(WE DEFINED IT TO 2 ITEMS EACH PAGE)
        this.slicedMecaniciens = this.mecaniciens.slice(
          (this.currentPage - 1) * 2,
          2 * this.currentPage,
        );
        // this.filterMecanicien();
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des rendez-vous :',
          error,
        );
      },
    );
  }

  // Désactiver un mécanicien
  desactiverMecanicien(mecanicien: any): void {
    if (
      confirm(
        `Voulez-vous vraiment désactiver le compte de ${mecanicien.name} ?`,
      )
    ) {
      this.mecanicienService.desactiverMecanicien(mecanicien._id).subscribe(
        (response) => {
          alert('Compte désactivé avec succès.');
          mecanicien.status = 'DISABLE'; // Mise à jour immédiate de l'UI
        },
        (error) => {
          console.error('Erreur lors de la désactivation du compte :', error);
          alert('Erreur lors de la désactivation.');
        },
      );
    }
  }

  // Désactiver un mécanicien
  reactiverMecanicien(mecanicien: any): void {
    if (
      confirm(
        `Voulez-vous vraiment reactiver le compte de ${mecanicien.name} ?`,
      )
    ) {
      this.mecanicienService.reactiverMecanicien(mecanicien._id).subscribe(
        (response) => {
          alert('Compte désactivé avec succès.');
          mecanicien.status = 'ENABLE'; // Mise à jour immédiate de l'UI
        },
        (error) => {
          console.error('Erreur lors de la désactivation du compte :', error);
          alert('Erreur lors de la désactivation.');
        },
      );
    }
  }
}
