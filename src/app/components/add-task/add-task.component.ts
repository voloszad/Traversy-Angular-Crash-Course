import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from "../../Task";
import { UiService } from "../../services/ui.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  showAddTask: boolean = false;
  subscription: Subscription = new Subscription();

  text: string = '';
  day: string = '';
  reminder: boolean = false;

  constructor() {
  }


  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.text.trim()) {
      alert('define task')
      return;
    }

    const newTask: Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    }

    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }

}
