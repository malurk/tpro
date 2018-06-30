import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskComponent} from './task/task.component'
import {UpdatesComponent} from './updates/updates.component'


const routes: Routes = [
  { path : "", component: TaskComponent },
  { path: "updates", component:UpdatesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
