import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { TaskService } from "../../services/task.service";
import { UiService } from "../../services/ui.service";

import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(private taskService: TaskService, private uiService: UiService) {
    this.subscription = this.uiService.onToggle()
      .subscribe((value) => this.showAddTask = value)
  }

  ngOnInit(): void {
      this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(
      (tasks) => this.tasks = tasks
    );
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task)
      .subscribe(()=> (
        this.tasks = this.tasks.filter((t) => t.id !== task.id)
      ));
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task)
      .subscribe();
  }

  addTask(task: Task) {
    this.taskService.addTask(task)
      .subscribe((task) => this.tasks.push(task));
  }

}
