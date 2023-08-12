import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/api/students';

  //Add student API method POST
  createStudents(id: number, name: string, email: string, age: number, city: string): Observable<any> {
    return this.http.post(`${this.url}`, {
      id: id,
      name: name,
      email: email,
      age: age,
      city: city
    })
  }

  //get All students list API method GET
  getAllStudents():Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/all`);
  }

  //get student by ID API method GET
  getStudentsById(id: number):Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/${id}`);
  }

  //update student by ID API method PUT
  updateStudentById(id: string, name: string, email: string, age: string, city: string):Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, {
      name: name,
      email: email,
      age: age,
      city: city
    });
  }

  //delete student by ID API method delete
  deleteStudentById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  //delete all students API method delete
  deleteAllStudent(): Observable<any> {
    return this.http.delete<any>(`${this.url}`);
  }

  //search student by name API method GET
  searchStudentByName(url : any): Observable<any> {
    // return this.http.get(`${this.url}/?name=${name}`);
    return this.http.get(url);

  }

}
