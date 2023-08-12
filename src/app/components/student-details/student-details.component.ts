import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student-model/student-model.module';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit{

  constructor(private cruds: CrudService) {}

  ngOnInit(): void {
    
  }

}
