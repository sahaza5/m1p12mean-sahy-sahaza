import { routes } from './../../../app.routes';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router'; // Import Router
import { SidebarClientComponent } from '../sidebar-client/sidebar-client.component';
import { NavbarClientComponent } from '../navbar-client/navbar-client.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as bootstrap from 'bootstrap'; // Import bootstrap for modal
import { HttpClient } from '@angular/common/http'; // Import HttpClient

interface ClientVehicle {
  clientName: string;
  vehicle: string;
  license: string;
}

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarClientComponent, NavbarClientComponent, ReactiveFormsModule, FormsModule], // Add CommonModule
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {

  clientVehicles: ClientVehicle[] = [];
  newClientVehicle: ClientVehicle = { clientName: '', vehicle: '', license: '' };
  editedClientVehicle: ClientVehicle = { clientName: '', vehicle: '', license: '' };
  private editModal: bootstrap.Modal | undefined;


  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // if(!localStorage.getItem('token')){
    //   this.router.navigate(['/']);
    // }
     // Initialize the modal
     const modalElement = document.getElementById('editModal');
     if (modalElement) {
       this.editModal = new bootstrap.Modal(modalElement);
     }
   }

  addClientVehicle() {
    // this.clientVehicles.push({ ...this.newClientVehicle });
    // this.newClientVehicle = { clientName: '', vehicle: '', license: '' }; // Reset form

  }

  deleteClientVehicle(clientVehicle: ClientVehicle) {
    this.clientVehicles = this.clientVehicles.filter(cv => cv !== clientVehicle);
  }

  editClientVehicle(clientVehicle: ClientVehicle) {
    this.editedClientVehicle = { ...clientVehicle };
    this.editModal?.show();
  }

  updateClientVehicle() {
    const index = this.clientVehicles.findIndex(cv => cv.license === this.editedClientVehicle.license);
    if (index !== -1) {
      this.clientVehicles[index] = { ...this.editedClientVehicle };
    }
    this.editModal?.hide();
  }

}
