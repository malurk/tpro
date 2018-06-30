import { Component, OnInit } from '@angular/core';
import {Task, TaskUpdates, ActivityStamp, TaskStatus, TouchStamp} from '../models/tasks'

// import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  taskCount : number = 0;
  selectedTask: Task = {
    taskTitle : "",
    taskStatus: TaskStatus.OPEN
  }

  editableTask: Task = {
    taskTitle : "",
    taskStatus: TaskStatus.OPEN
  }

  editSelectTask : boolean = false;
  
   tStamp123 : TouchStamp = {
    timestamp: new Date(),
    touchMessage : "Task Created",
    stamp : ActivityStamp.TASK_CREATE
}


  dummyDesc : string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra, massa a venenatis vehicula, sapien nisl faucibus justo, quis tristique sem magna a urna.";


  myTasks: Task[] =[
    { "taskTitle" : "Complete Excel Training", "taskStatus" : TaskStatus.OPEN, taskDesc: this.dummyDesc, lastUpdate: new Date().toLocaleString(), taskActivity : [this.tStamp123]},
    { "taskTitle" : "Prepare Product Roadmap", "taskStatus" : TaskStatus.OPEN, taskDesc: this.dummyDesc, lastUpdate: new Date().toLocaleString(), taskActivity : [this.tStamp123]},
  ];


  private newTaskTitle : string;
  private newTaskDesc : string;

   stringifyTaskStatus(st : TaskStatus) : string {
    let statusString : string = ""
      if(st == TaskStatus.OPEN){
        statusString = "Open";
      } else if (st == TaskStatus.IN_PROGRESS) {
        statusString = "In Progress";
      }else if (st == TaskStatus.BLOCKED) {
        statusString = "Blocked";
      }else if (st == TaskStatus.COMPLETE) {
        statusString = "Complete";
      }
      return statusString;
  }



  editSelectedTask(){
   
      this.editSelectTask = true;
      this.editableTask = {
      taskTitle: this.selectedTask.taskTitle,
      taskStatus: this.selectedTask.taskStatus,
      taskDesc: this.selectedTask.taskDesc
      }


  }

  cancelEdit(){
    this.editSelectTask = false;
  }

  constructor() {
    this.newTaskTitle = "";


   }

  ngOnInit() {
    this.taskCount = this.myTasks.length;
  }

  addTask(){
    if (this.newTaskTitle != ""){
      const tStamp : TouchStamp = {
          timestamp: new Date(),
          touchMessage : "Task Created",
          stamp : ActivityStamp.TASK_CREATE
      }

      if (this.newTaskDesc == ""){
          this.newTaskDesc = this.dummyDesc;
      }

      const newTask : Task = {
        taskTitle : this.newTaskTitle,
        taskDesc: this.newTaskDesc,
        taskStatus: TaskStatus.OPEN,
        taskActivity : [tStamp]
      }
      newTask.lastUpdate = tStamp.timestamp.toLocaleString();
      this.myTasks.push(newTask);
      this.taskCount = this.myTasks.length;
      this.newTaskTitle = ""
      this.newTaskDesc = ""
    
    }
  }

  editTask(){
    if (this.selectedTask.taskStatus != this.editableTask.taskStatus){
              
        // UPdate the Editable Task
        let ind = this.myTasks.findIndex(tsk => tsk.taskTitle == this.selectedTask.taskTitle);
        const tStamp : TouchStamp = {
          timestamp: new Date(),
          touchMessage : "Status Changed from `" + this.stringifyTaskStatus(this.selectedTask.taskStatus) +  
                                    "' to `" +
                                    this.stringifyTaskStatus(this.editableTask.taskStatus) + "'",
          stamp : ActivityStamp.TASK_STATUS_CHANGE
        }

        this.myTasks[ind].taskStatus = this.editableTask.taskStatus;
        this.myTasks[ind].taskActivity.push(tStamp);


        console.log(this.myTasks[ind].taskActivity);

        //Add Activity and TOuchstamp

        //update Last Updated TIme 
        this.myTasks[ind].lastUpdate = tStamp.timestamp.toLocaleString();

        // Update the Selected Task   
        this.selectedTask = this.myTasks[ind];


        console.log(this.myTasks[ind]);
    } else{
      console.log("Nothing has changed");
    }
    // Remove Edit FLag
    this.cancelEdit()
  }

  showTask(i){
      this.selectedTask = this.myTasks[i];
      console.log(this.selectedTask.taskTitle);
  }




}
