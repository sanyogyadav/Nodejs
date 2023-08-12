import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { Student } from 'src/app/model/student-model/student-model.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  student: Student[] = [];

  constructor(private cruds: CrudService, private router: Router) {}

  ngOnInit(): void {
    
  }

  deleteAllStudents() {
    this.cruds.deleteAllStudent().subscribe((result: any) => {
      this.router.navigate(["/add-student"]);
    });
  }
  
}
