import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { Student } from 'src/app/model/student-model/student-model.module'; 

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  student_list : Student[] = [];
  student_details : any;
  updateForm! : FormGroup;

  constructor(private cruds: CrudService, private router: Router, private fb: FormBuilder,) {
    this.updateForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.max(18)]],
      city: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAllStudent();
  }

  updateStudentById(id: string, name: string, email: string, age: string, city: string) {
    this.cruds.updateStudentById( id, name, email, age, city ).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }  

  getAllStudent() {
    this.cruds.getAllStudents().subscribe((result: Student[])=> {
      this.student_list = result;
      // console.log(this.student_list);
    })
  }

  getStudentById(id: number) {
    this.cruds.getStudentsById(id).subscribe((result: any) => {
      this.student_details = result;
      console.log("I want this ",this.student_details);
    })
  }

  deleteStudentById(id: number) {
    this.cruds.deleteStudentById(id).subscribe((result: Student[])=> {
      this.ngOnInit();
    });
  }

}
