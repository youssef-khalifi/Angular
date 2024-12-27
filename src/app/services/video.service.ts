import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Course} from "../models/Course";
import {Video} from "../models/Video";
import {VideoRequest} from "../models/VideoRequest";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private readonly urlAPI = 'http://localhost:8888';
  token: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.authenticatedUser.accessToken;
  }

  saveVideo(video : VideoRequest) : Observable<Video>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.post<Video>(`${this.urlAPI}/VIDEO-SERVICE/Video/save`, video, { headers });
  }

  uploadVideo(video : File , id : number) : Observable<Video>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const formData = new FormData();
    formData.append('video', video);

    return this.http.post<Video>(`${this.urlAPI}/VIDEO-SERVICE/Video/upload/${id}`, formData, { headers });
  }

  getVideosByCourseId(courseId: number): Observable<Video[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<Video[]>(`${this.urlAPI}/VIDEO-SERVICE/Video/videos/${courseId}`, { headers });
  }

  deleteVideo(videoId: number): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.delete<string>(`${this.urlAPI}/VIDEO-SERVICE/Video/${videoId}`, { headers }  );
  }

  playVideo(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get(`${this.urlAPI}/VIDEO-SERVICE/Video/play/${id}`, {
      headers,
      responseType: 'blob' as 'json'
    });
  }


}
