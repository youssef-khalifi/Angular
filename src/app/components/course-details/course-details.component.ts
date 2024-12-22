import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../../models/Course";
import {CourService} from "../../services/cour.service";
import {Teacher} from "../../models/Teacher";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit{

  courseName: string | null='';
  course : Course | undefined;

  ngOnInit(): void {
    this.courseName = this.route.snapshot.paramMap.get('name');
    console.log('Course ID (on load):', this.courseName);

    this.getCourse()

  }

  constructor(private route: ActivatedRoute,private router: Router,
              private service : CourService) {}


  public getCourse(){
    this.service.getCourseByName(this.courseName).subscribe({
      next: (data: Course) => {
        console.log(data);
        this.course = data;
      },
      error: (err) => {
        console.error("Error fetching Course data:", err);
      }
    });
  }

}
