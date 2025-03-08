/*import { Component } from '@angular/core';

@Component({
  selector: 'app-client-dashboard',
  imports: [],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css'
})
export class ClientDashboardComponent {

}*/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule], // Add CommonModule
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  vehicles: any[] = []; // Replace with actual vehicle data
  appointments: any[] = []; // Replace with actual appointment data
  serviceHistory: any[] = []; // Replace with actual service history data

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Fetch data from a service or API (replace with your actual data fetching)
    this.vehicles = [
      { make: 'Toyota', model: 'Camry', licensePlate: 'ABC-123' },
      { make: 'Honda', model: 'Civic', licensePlate: 'XYZ-789' }
    ];
    this.appointments = [{ date: '2024-03-15', service: 'Oil Change' }];
    this.serviceHistory = [{ date: '2024-02-20', description: 'Tire Rotation' }];
  }

  viewVehicleDetails(vehicle: any): void {
    // Implement vehicle details view
    console.log('View Vehicle Details:', vehicle);
  }

  registerNewVehicle(): void {
    // Implement new vehicle registration
    console.log('Register New Vehicle');
  }

  viewAppointmentDetails(appointment: any): void {
    // Implement appointment details view
    console.log('View Appointment Details:', appointment);
  }

  scheduleNewAppointment(): void {
    // Implement new appointment scheduling
    console.log('Schedule New Appointment');
  }

  viewServiceDetails(service: any): void {
    // Implement service details view
    console.log('View Service Details:', service);
  }
}
