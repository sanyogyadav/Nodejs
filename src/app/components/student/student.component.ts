import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {

  studentForm! : FormGroup;

  constructor(private fb: FormBuilder, private cruds: CrudService) {
    this.studentForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.max(18)]],
      city: ['', [Validators.required]]
    });
   }

  ngOnInit(): void { }

  onSubmit() {
    if(this.studentForm.valid) {
      let id = this.studentForm.value.id;
      let name = this.studentForm.value.name;
      let email = this.studentForm.value.email;
      let age = this.studentForm.value.age;
      let city = this.studentForm.value.city;

      console.log(this.studentForm.value);

      this.cruds.createStudents( id, name, email, age, city ).subscribe((result) => {
        console.log(result);
      })
    }
  }
}
