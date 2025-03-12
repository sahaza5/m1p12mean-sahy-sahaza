import { Component, Input } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-sidebar-client',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar-client.component.html',
  styleUrl: './sidebar-client.component.css'
})
export class SidebarClientComponent {

  clientName: string | null = null;

  ngOnInit() {
    this.clientName = localStorage.getItem('clientName'); // Get client name from localStorage
  }

}
