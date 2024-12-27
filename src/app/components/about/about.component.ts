import {Component, OnInit} from '@angular/core';
import {Teacher} from "../../models/Teacher";
import {Student} from "../../models/Student";
import {AuthService} from "../../services/auth.service";
import {TeacherService} from "../../services/teacher.service";
import {StudentService} from "../../services/student.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{

  user : Teacher | Student | undefined;

  constructor(private authService : AuthService,
              private teacherService : TeacherService,
              private StudentService : StudentService) {
  }
  ngOnInit(): void {

    this.getUser()
  }


  getUser(){

    if (this.authService.authenticatedUser.userType.includes("Teacher")){

      this.teacherService.getStudent().subscribe({
        next :(data : Teacher) =>{
           this.user = data
        }
      })
    }else {
      this.StudentService.getStudent().subscribe({
        next : (data : Student) =>{
          this.user = data
        }
      })
    }
  }
}
