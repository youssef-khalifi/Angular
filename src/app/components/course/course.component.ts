import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Course} from "../../models/Course";
import {CourService} from "../../services/cour.service";
import {Router} from "@angular/router";
import {window} from "rxjs";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit{

  @ViewChild('modal', { static: false }) modal!: ElementRef;
  courses : Course[] = [];
  course! : Course;

  constructor(private service : CourService,private renderer: Renderer2,
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


  openModal(course : Course) {

    this.course = course
    this.renderer.addClass(this.modal.nativeElement, 'fade-in');
    this.renderer.setStyle(this.modal.nativeElement, 'display', 'block');
    setTimeout(() => {
      this.renderer.addClass(this.modal.nativeElement, 'show');
    }, 10);
  }
  closeModal() {
    this.renderer.removeClass(this.modal.nativeElement, 'show');
    setTimeout(() => {
      this.renderer.removeClass(this.modal.nativeElement, 'fade-in');
      this.renderer.setStyle(this.modal.nativeElement, 'display', 'none');
    }, 300);
  }



  public searchEmployees(key: string): void {
    console.log(key);
    const results: Course[] = [];
    for (const employee of this.courses) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.teacher.fullName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.courType.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.courseLevel.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.courses = results;
    if (results.length === 0 || !key) {
      this.getCourses();
    }
  }
}
