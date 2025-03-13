import { Component } from '@angular/core';
import { NavbarClientComponent } from '../navbar-client/navbar-client.component';
import { SidebarClientComponent } from '../sidebar-client/sidebar-client.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-payement',
  standalone: true,
  imports: [CommonModule,NavbarClientComponent, SidebarClientComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './payement.component.html',
  styleUrl: './payement.component.css'
})
export class PayementComponent {

}
