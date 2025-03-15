import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router'; // Import Router
import { SidebarClientComponent } from '../sidebar-client/sidebar-client.component';
import { NavbarClientComponent } from '../navbar-client/navbar-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap'; // Import bootstrap for modal
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { LoginService } from '../../../services/login/login.service';
import { ClientDashboardService } from '../../../services/clientDashboard/client-dashboard.service';

interface ClientVehicle {
  clientName: string;
  vehicle: string;
  license: string;
}

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SidebarClientComponent,
    NavbarClientComponent,
    ReactiveFormsModule,
    FormsModule,
  ], // Add CommonModule
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css'],
})
export class ClientDashboardComponent implements OnInit {
  // clientVehicles: ClientVehicle[] = [];
  clientVehicles: any[] = [];
  isLoading = true;
  error: String | null = null;

  newClientVehicle: ClientVehicle = {
    clientName: '',
    vehicle: '',
    license: '',
  };
  editedClientVehicle: ClientVehicle = {
    clientName: '',
    vehicle: '',
    license: '',
  };
  private editModal: bootstrap.Modal | undefined;

  currentUser: any;

  constructor(
    private http: HttpClient,
    private clientDasboardVehicle: ClientDashboardService,
    private LoginService: LoginService,
  ) {}

  ngOnInit() {
    // Initialize the modal
    const modalElement = document.getElementById('editModal');
    this.LoginService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
    if (modalElement) {
      this.editModal = new bootstrap.Modal(modalElement);
    }

    this.loadClientVehicle(this.currentUser);
  }

  loadClientVehicle(currentUser: any) {
    console.log('The current user is:', currentUser);
    console.log('Fetching vehicles...');
    this.clientDasboardVehicle.getClientVehicules(this.currentUser).subscribe(
      (data: any) => {
        console.log('Vehicule data are:', data);
        this.clientVehicles = data;
        this.isLoading = false;
      },
      (error: any) => {
        this.error = 'Error fetching vehicule';
        this.isLoading = false;
      },
    );
  }

  addClientVehicle() {
    this.clientVehicles.push({ ...this.newClientVehicle });
    this.newClientVehicle = { clientName: '', vehicle: '', license: '' }; // Reset form
  }

  deleteClientVehicle(clientVehicle: ClientVehicle) {
    // if (this.currentUser.role === 'ADMIN') {
    this.clientVehicles = this.clientVehicles.filter(
      (cv) => cv !== clientVehicle,
    );
    // }
  }

  editClientVehicle(clientVehicle: ClientVehicle) {
    this.editedClientVehicle = { ...clientVehicle };
    this.editModal?.show();
  }

  updateClientVehicle() {
    const index = this.clientVehicles.findIndex(
      (cv) => cv.license === this.editedClientVehicle.license,
    );
    if (index !== -1) {
      this.clientVehicles[index] = { ...this.editedClientVehicle };
    }
    this.editModal?.hide();
  }
}
