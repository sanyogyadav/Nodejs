import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentComponent } from './components/student/student.component';

const routes: Routes = [
  {
    component: StudentListComponent,
    path: ''
  },
  {
    component: StudentDetailsComponent,
    path: 'student-details'
  },
  {
    component: StudentComponent,
    path: 'add-student'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }