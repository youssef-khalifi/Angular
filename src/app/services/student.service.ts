import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Teacher} from "../models/Teacher";
import {Student} from "../models/Student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly urlAPI = 'http://localhost:8888';
  token: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.authenticatedUser.accessToken;
  }

  getStudents(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get(`${this.urlAPI}/STUDENT-SERVICE/Students`, { headers });
  }

  getStudent(): Observable<Student> {

    let email = this.authService.authenticatedUser.username
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<Teacher>(`${this.urlAPI}/STUDENT-SERVICE/Students/profile/${email}`, { headers });
  }

  update(form : FormData , id : number): Observable<Student> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.put<Student>(`${this.urlAPI}/STUDENT-SERVICE/Students/${id}`, form, { headers });
  }
}
