import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {CourService} from "../../services/cour.service";
import {Course} from "../../models/Course";
import {Teacher} from "../../models/Teacher";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  courses : Course[] = [];

  constructor(private service : CourService) {
  }
  ngOnInit(): void {
    this.getCourses()
  }

  getCourses(){
    this.service.getCourses().subscribe({
      next: (data: Course[]) => {
        console.log(data);
        this.courses = data;
      },
      error: (err) => {
        console.error("Error fetching Courses data:", err);
      }
    });
  }

}
