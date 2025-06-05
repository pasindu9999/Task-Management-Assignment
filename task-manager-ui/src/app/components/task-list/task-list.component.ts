import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  isLoading = false;
  error: string | null = null;

  statusFilter: string = ''; 
  availableStatuses: string[] = ['ALL', 'TO_DO', 'IN_PROGRESS', 'DONE']; 

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.error = null;
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.applyFilter(); 
        this.isLoading = false;
      },
      error: (err) => {
        this.error = `Failed to load tasks. Error: ${err.message ? err.message : 'Unknown error'}`;
        if (err.status === 401 || err.status === 403) {
            this.error += ". You might need to log in.";
        }
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  applyFilter(): void {
    if (this.statusFilter === '' || this.statusFilter === 'ALL') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(task => task.status === this.statusFilter);
    }
  }

  onFilterChange(newStatus: string): void {
    this.statusFilter = newStatus;
    this.applyFilter();
  }

  deleteTask(id: string | undefined): void {
    if (!id) {
      console.error('Task ID is undefined, cannot delete.');
      this.error = 'Cannot delete task: ID is missing.';
      return;
    }
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {

          this.loadTasks();
        },
        error: (err) => {
          this.error = `Failed to delete task. Error: ${err.message}`;
          console.error(err);
        }
      });
    }
  }

  navigateToEdit(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/tasks/edit', id]);
    }
  }

  navigateToCreate(): void {
      this.router.navigate(['/tasks/new']);
  }
}
