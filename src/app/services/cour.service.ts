import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Teacher} from "../models/Teacher";
import {Course} from "../models/Course";

@Injectable({
  providedIn: 'root'
})
export class CourService {

  private readonly urlAPI = 'http://localhost:8888';
  token: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.authenticatedUser.accessToken;
  }

  getCourses(): Observable<Course[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<Course[]>(`${this.urlAPI}/COURSE-SERVICE/Course`, { headers });
  }

  getCoursesByTeacher(id: number | undefined): Observable<Course[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<Course[]>(`${this.urlAPI}/COURSE-SERVICE/Course/teacher/${id}`, { headers });
  }

  getCourseByName(name: string | null) : Observable<Course>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<Course>(`${this.urlAPI}/COURSE-SERVICE/Course/name/${name}`, { headers });
  }

  deleteCourse(id: number) : Observable<void>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.delete<void>(`${this.urlAPI}/COURSE-SERVICE/Course/${id}`, { headers });
  }

  createCourse(form : FormData , id: number) : Observable<Course>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.post<Course>(`${this.urlAPI}/COURSE-SERVICE/Course/${id}`, form, { headers });
  }
  updateCourse(form : FormData , id: number) : Observable<Course>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.put<Course>(`${this.urlAPI}/COURSE-SERVICE/Course/${id}`, form, { headers });
  }
}
