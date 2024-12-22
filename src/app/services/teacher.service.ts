import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Teacher} from "../models/Teacher";
import {File} from "node:buffer";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private readonly urlAPI = 'http://localhost:8888';
  token: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.authenticatedUser.accessToken;
  }

  getStudents(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get(`${this.urlAPI}/TEACHER-SERVICE/Teachers`, { headers });
  }

  getStudent(): Observable<Teacher> {

    let email = this.authService.authenticatedUser.username
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<Teacher>(`${this.urlAPI}/TEACHER-SERVICE/Teachers/profile/${email}`, { headers });
  }

  updateTeacher(form : FormData , id : number): Observable<Teacher> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.put<Teacher>(`${this.urlAPI}/TEACHER-SERVICE/Teachers/${id}`, form, { headers });
  }
}
