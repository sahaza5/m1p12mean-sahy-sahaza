import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router'; // Import Router
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as bootstrap from 'bootstrap'; // Import bootstrap for modal
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from "../sidebar/sidebar.component"; // Import HttpClient

interface Mechanic {
  mechanicName: string;
  address: string;
  contact: string;
  id?: number
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [NavbarComponent, SidebarComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{

  mechanics: Mechanic[] = [];
  newMechanic: Mechanic = { mechanicName: '', address: '', contact: ''};
  editedMechanicData: Mechanic | null = null;

  apiUrl = '';

  //private editModal: bootstrap.Modal | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.fetchMechanics();
  }

  fetchMechanics(): void {
    this.http.get<Mechanic[]>(`${this.apiUrl}/mechanics`).subscribe(   // api fetch
      (data) => {
        this.mechanics = data;
      },
      (error) => {
        console.error('Error fetching mechanics:', error);
      }
    );
  }

  addCMechanic(): void {
    this.http.post<Mechanic>(`${this.apiUrl}/users/add/mechanicien`, this.newMechanic).subscribe(
      (response) => {
        this.mechanics.push(response);
        this.newMechanic = { mechanicName: '', address: '', contact: '' };
      },
      (error) => {
        console.error('Error adding mechanic:', error);
      },
      () => {
        this.fetchMechanics();
      }
    );
  }

  editedMechanic(mechanic: Mechanic): void {
    if (this.editedMechanicData?.id === mechanic.id) {
      // Save changes
      this.http.put<Mechanic>(`${this.apiUrl}/mechanics/${mechanic.id}`, this.editedMechanicData).subscribe(
        () => {
          this.fetchMechanics(); // Refresh the list
          this.editedMechanicData = null;
        },
        (error) => {
          console.error('Error updating mechanic:', error);
        }
      );
    } else {
      // Enter edit mode
      this.editedMechanicData = { ...mechanic };
    }
  }


}
