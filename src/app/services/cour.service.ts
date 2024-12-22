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

  getCourseByName(name: string | null) : Observable<Course>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<Course>(`${this.urlAPI}/COURSE-SERVICE/Course/name/${name}`, { headers });
  }
}
