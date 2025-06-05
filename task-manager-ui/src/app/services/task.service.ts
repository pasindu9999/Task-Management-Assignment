import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Task } from '../models/task.model'; 

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks'; 

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
      
    });
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, { headers: this.getAuthHeaders() })
      .pipe(
        map(tasks => tasks.map(task => ({ ...task, createdAt: task.createdAt ? new Date(task.createdAt) : undefined }))),
        catchError(this.handleError)
      );
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(task => ({ ...task, createdAt: task.createdAt ? new Date(task.createdAt) : undefined })),
        catchError(this.handleError)
      );
  }

  createTask(task: Task): Observable<Task> {
   
    const { id, createdAt, ...taskData } = task;
    return this.http.post<Task>(this.apiUrl, taskData, { headers: this.getAuthHeaders() })
      .pipe(
        map(newTask => ({ ...newTask, createdAt: newTask.createdAt ? new Date(newTask.createdAt) : undefined })),
        catchError(this.handleError)
      );
  }

  updateTask(id: string, task: Task): Observable<Task> {
    const { createdAt, ...taskData } = task; 
    return this.http.put<Task>(`${this.apiUrl}/${id}`, taskData, { headers: this.getAuthHeaders() })
      .pipe(
        map(updatedTask => ({ ...updatedTask, createdAt: updatedTask.createdAt ? new Date(updatedTask.createdAt) : undefined })),
        catchError(this.handleError)
      );
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error && typeof error.error === 'object') {
         if (error.error.message) {
            errorMessage += `\nDetails: ${error.error.message}`;
         } else if (error.error.errors) {
            const errors = Object.entries(error.error.errors)
                                 .map(([field, message]) => `${field}: ${message}`)
                                 .join(', ');
            errorMessage += `\nValidation Errors: ${errors}`;
         }
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
