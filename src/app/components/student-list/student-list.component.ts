import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { Student } from 'src/app/model/student-model/student-model.module'; 

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  student_list : Student[] = [];

  constructor(private cruds: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.getAllStudent();
  }

  getAllStudent() {
    this.cruds.getAllStudents().subscribe((result: Student[])=> {
      this.student_list = result;
      console.log(this.student_list);
    })
  }

  getStudentDetailById(id: number) {
    this.cruds.getStudentsById(id).subscribe((result: Student[])=> {
      console.log(result);
      this.router.navigateByUrl("/student-details");
    })
  }

}
