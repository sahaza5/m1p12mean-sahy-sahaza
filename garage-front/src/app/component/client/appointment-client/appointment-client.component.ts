import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarClientComponent } from '../navbar-client/navbar-client.component';
import { SidebarClientComponent } from '../sidebar-client/sidebar-client.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-appointment-client',
  standalone: true,
  imports: [NavbarClientComponent, SidebarClientComponent],
  templateUrl: './appointment-client.component.html',
  styleUrl: './appointment-client.component.css'
})
export class AppointmentClientComponent {

}
