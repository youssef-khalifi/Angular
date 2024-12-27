import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../../models/Course";
import {CourService} from "../../services/cour.service";
import {Teacher} from "../../models/Teacher";
import {Video} from "../../models/Video";
import {VideoService} from "../../services/video.service";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit{

  courseName: string | null='';
  course : Course | undefined;
  videos : Video[] =[];
  videoUrl: string | null = null;
  courses : Course[] = [];

  ngOnInit(): void {
    this.courseName = this.route.snapshot.paramMap.get('name');
    console.log('Course ID (on load):', this.courseName);

    this.getCourse()

  }

  constructor(private route: ActivatedRoute,private router: Router,private courseService : CourService,
              private service : CourService , private videoService : VideoService) {}


  public getCourse(){
    this.service.getCourseByName(this.courseName).subscribe({
      next: (data: Course) => {
        console.log(data);
        this.course = data;
        this.getVideos()
        this.getCourses()
      },
      error: (err) => {
        console.error("Error fetching Course data:", err);
      }
    });
  }

  getVideos(){

    this.videoService.getVideosByCourseId(this.course!.id).subscribe({
      next : (data : Video[]) =>{
        console.log(data)
        this.videos = data
      }
    })
  }

  playVideo(id: number): void {

    this.videoService.playVideo(id).subscribe({
      next : (data : any ) =>{
        const videoBlob = data;
        this.videoUrl = URL.createObjectURL(videoBlob);
        console.log(this.videoUrl)
      },
      error :(error)=>{
        console.log(error)
      }
    })
  }

  getCourses(){
    this.courseService.getCoursesByTeacher(this.course?.teacher!.id).subscribe({

      next :  (data : Course[])=>{
        console.log(data)
      }
    })
  }

}
