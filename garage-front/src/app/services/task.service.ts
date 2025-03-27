import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Récupérer toutes les tâches d'un mécanicien
  getTasks(authService: AuthService, mechanicId: string): Observable<any> {
    const token = authService.getToken();
    console.log("token getTasks", token)
    return this.http.get<any[]>(`${this.apiUrl}/mechanicien/${mechanicId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Mettre à jour le statut d'une tâche
  updateTaskStatus(taskId: string, newStatus: string): Observable<any> {
    const token = this.authService.getToken();
    return this.http.patch<any>(
      `${this.apiUrl}/update-status/${taskId}`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
}
