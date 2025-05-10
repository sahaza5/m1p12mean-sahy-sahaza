import { Component } from '@angular/core';
import { NavbarLeftComponent } from '../../component/navbar-left/navbar-left.component';
import { ClientService } from '../../services/client.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-client',
  imports: [NavbarLeftComponent, FormsModule, CommonModule],
  templateUrl: './liste-client.component.html',
  styleUrl: './liste-client.component.css',
})
export class ListeClientComponent {
  searchItem = '';
  filteredClient: any[] = [];
  clients: any;
  userData: any;
  slicedClients: any[] = [];
  pages: any[] = [];
  currentPage = 1;
  totalPages: number = 0;

  constructor(
    private service: ClientService,
    private usersService: UsersService,
    private router: Router,
  ) {
    this.usersService.getUserProfile().subscribe(
      (userData) => {
        console.log('Données utilisateur récupérées:', userData);
        this.userData = userData;
        if (this.userData?.userType === 'ADMIN') {
          this.service.getAllClients().subscribe((clients) => {
            this.clients = clients;
            console.log('clients', this.clients);
            this.pages = [];
            this.totalPages = Math.ceil(this.clients.length / 2);

            //INITIALIZE THE NUMBER OF PAGES
            for (let i = 1; i <= this.totalPages; i++) {
              this.pages.push(i);
            }

            //SLICE IT TO THE DEMANDED NUMBER OF ITEMS FOR EACH PAGE(WE DEFINED IT TO 2 ITEMS EACH PAGE)
            this.slicedClients = this.clients.slice(
              (this.currentPage - 1) * 2,
              2 * this.currentPage,
            );
          });
          this.filterClient();
        } else {
          this.router.navigate(['/']);
        }
        console.log('userData', this.userData);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
        alert('Erreur lors de la récupération des données utilisateur');
      },
    );
  }

  //FILTER SEARCHING
  filterClient(): void {
    // if (this.searchItem.length > 0) {
    console.log('Search:', this.searchItem);
    this.filteredClient = this.clients?.filter((client: any) => {
      return (
        client.name?.toLowerCase().includes(this.searchItem.toLowerCase()) ||
        client.txt?.toLowerCase().includes(this.searchItem.toLowerCase()) ||
        client.surname?.toLowerCase().includes(this.searchItem.toLowerCase())
      );
    });
    console.log('filter:', this.filteredClient);
    this.totalPages = Math.ceil(this.filteredClient?.length / 2);
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
    this.slicedClients = this.filteredClient?.slice(
      (this.currentPage - 1) * 2,
      2 * this.currentPage,
    );
    // }
  }

  ngOnInit() {}

  goToPage(page: any) {
    if (page > 0 && page <= this.pages.length) {
      this.currentPage = page;
      this.slicedClients = this.clients.slice((page - 1) * 2, 2 * page);
    }
  }
}
