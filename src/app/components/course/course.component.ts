import {Component, OnInit} from '@angular/core';
import {Course} from "../../models/Course";
import {CourService} from "../../services/cour.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit{

  courses : Course[] = [];

  constructor(private service : CourService,
              private router : Router) {
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

  public navigateToDetails(name : string){
    this.router.navigate(['/home/course-details', name]);
  }


}
