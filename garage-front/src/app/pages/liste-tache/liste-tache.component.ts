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
  dropdownStates: { [taskId: string]: boolean } = {};

  constructor(private taskService: TaskService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getTasksByMechanic();
  }


  toggleDropdown(taskId: string): void {
    // Ferme tous les dropdowns sauf celui sur lequel on a cliqué
    Object.keys(this.dropdownStates).forEach(id => {
      if (id !== taskId) {
        this.dropdownStates[id] = false;
      }
    });

    // Bascule l'état du dropdown de la tâche sélectionnée
    this.dropdownStates[taskId] = !this.dropdownStates[taskId];
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
        console.log("tasks", this.tasks)
        console.log("newStatus", newStatus)
        alert("Tâche mise à jour avec succès");
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du statut :', error);
      }
    );
  }
}
