import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {

  studentForm : FormGroup;

  constructor(private fb: FormBuilder) {
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
      console.log(this.studentForm.value);
    }
  }
}
