import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavbarClientComponent } from '../navbar-client/navbar-client.component';
import { SidebarClientComponent } from '../sidebar-client/sidebar-client.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

interface Appointment {
  vehicle: string;
  description: string;
  status: string; // You might want to use an enum for this in a real application
  mechanicien: string;
}


@Component({
  selector: 'app-appointment-client',
  standalone: true,
  imports: [CommonModule,NavbarClientComponent, SidebarClientComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './appointment-client.component.html',
  styleUrl: './appointment-client.component.css'
})
export class AppointmentClientComponent {

  appointments: Appointment[] = []; // Corrected line
  newAppointment: Appointment = {
    vehicle: '',
    description: '',
    status: 'Pending',
    mechanicien: ''
  };

  searchTerm: string = '';

  constructor() {
    // You might load initial appointments here, e.g., from a service
    this.loadAppointments();
  }

  loadAppointments(): void {
    // fetch this from a service:
    this.appointments = [
      { vehicle: 'Toyota Camry', description: 'Oil Change', status: 'Completed', mechanicien: 'John Doe' },
      { vehicle: 'Honda Civic', description: 'Brake Repair', status: 'In Progress', mechanicien: 'Jane Smith' },

    ];
  }

  addAppointment(): void {
    // send this to a service to save it
    this.appointments.push({ ...this.newAppointment });
    this.newAppointment = {
      vehicle: '',
      description: '',
      status: 'Pending',
      mechanicien: ''
    };
  }

  /*
  searchAppointments(): Appointment{
    if (!this.searchTerm) {
      return this.appointments;
    }
    return this.appointments.filter(appointment =>
      appointment.vehicle.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      appointment.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      // Add more search criteria as needed
    );
  }
    */

}

