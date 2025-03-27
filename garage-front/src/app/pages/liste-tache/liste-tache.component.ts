import { Component } from '@angular/core';
import { NavbarLeftComponent } from '../../component/navbar-left/navbar-left.component';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-liste-tache',
  imports: [NavbarLeftComponent, CommonModule],
  templateUrl: './liste-tache.component.html',
  styleUrl: './liste-tache.component.css'
})
export class ListeTacheComponent {
  tasks: any[] = [];
  isDropdownOpen = false;

  constructor(private taskService: TaskService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getTasksByMechanic();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Récupère les tâches du mécanicien connecté
  getTasksByMechanic() {
    const mechanicId = this.authService.getUserId(); // Récupère l'ID du mécanicien connecté
    this.taskService.getTasks(this.authService, mechanicId).subscribe(
      (response) => {
        this.tasks = response;
        console.log("tasks", this.tasks)
      },
      (error) => {
        console.error('Erreur lors de la récupération des tâches :', error);
      }
    );
  }

  //Met à jour le statut d'une tâche
updateTaskStatus(taskId: string, newStatus: string) {
  this.taskService.updateTaskStatus(taskId, newStatus).subscribe(
    () => {
      this.tasks = this.tasks.map(task =>
        task._id === taskId ? { ...task, status: newStatus } : task
      );
    },
    (error) => {
      console.error('Erreur lors de la mise à jour du statut :', error);
    }
  );
}
}
