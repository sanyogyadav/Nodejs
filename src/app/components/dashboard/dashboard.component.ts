import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { Student } from 'src/app/model/student-model/student-model.module';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  student: Student[] = [];
  searchForm!: FormGroup;
  searchResults: any;
  keyword: any;

  constructor(private cruds: CrudService, private router: Router) {}

  ngOnInit(): void {
  }

  deleteAllStudents() {
    this.cruds.deleteAllStudent().subscribe((result: any) => {
      this.router.navigate(["/add-student"]);
    });
  }

  onSubmit(keyword: any) {
    const url = `http://localhost:3000/api/students?name=%${keyword}%`;
    this.cruds.searchStudentByName(url).subscribe(results => {
      this.searchResults = results;
      console.log("this is search value",results);
    });
  }

  clearSearch() {
    this.keyword = '';
    this.searchResults = [];
  }
  
}
