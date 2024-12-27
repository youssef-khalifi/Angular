import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../../models/Course";
import {CourService} from "../../services/cour.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VideoService} from "../../services/video.service";
import {Video} from "../../models/Video";
import {VideoRequest} from "../../models/VideoRequest";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent implements OnInit{

  visible : boolean = true;
  name: string | null = '';
  course! : Course;
  uploadForm! : FormGroup;
  videoForm!: FormGroup;
  videoCreated! : Video;
  videos : Video[] = [];
  videoToSave: VideoRequest = new VideoRequest( '', '', '', '', new Date(), 0);

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private toast: NgToastService,
              private courseService : CourService, private videoService : VideoService) {}

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');

    this.getCourse()


    this.videoForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      tags: ['', Validators.required],
      videoName: ['', Validators.required]}
      );

    this.uploadForm = this.fb.group({
      video: ['', [Validators.required]]}
    );
  }

  getCourse(){
    this.courseService.getCourseByName(this.name).subscribe({
      next : (data : Course) =>{
        this.course = data;
        this.getVideos()
        console.log(this.course)
      }
    })
  }

  saveVideo(){

    const videoName : string = this.videoForm.get('videoName')?.value + '.mp4';

    this.videoToSave.videoName = videoName;
    this.videoToSave.title = this.videoForm.get('title')?.value;
    this.videoToSave.description = this.videoForm.get('description')?.value;
    this.videoToSave.tags = this.videoForm.get('tags')?.value;

    this.videoToSave.courseId = this.course.id;
    this.videoToSave.addedDate = new Date() ;

    console.log(this.videoToSave.courseId)
  this.videoService.saveVideo(this.videoToSave).subscribe({
     next : (data : Video) =>{
       console.log(data);
       this.videoCreated = data;
       this.visible = !this.visible;
     }
   })
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadForm.patchValue({ video: file });
      this.uploadForm.get('video')?.updateValueAndValidity();
    }
  }

  uploadVideo(){
    const video = this.uploadForm.value.video;
    this.videoService.uploadVideo(video , this.videoCreated.id).subscribe({
      next : (data : Video) =>{
        console.log(data)
        setTimeout(() => {
          this.toast.success("Video Created with success" , "Success" , 3000)
        }, 1000);
        this.uploadForm.reset()
        this.videoForm.reset()
        this.visible = !this.visible
        this.getVideos()
      }
    })

  }

  getVideos(){
    this.videoService.getVideosByCourseId(this.course!.id).subscribe({
      next : (data : Video[]) =>{
        this.videos = data
        console.log(this.videos)
    }
    })
  }

  deleteVideo(video : Video){
    this.videoService.deleteVideo(video.id).subscribe({
      next : (data : string) =>{
        console.log(data)
        this.getVideos()
        setTimeout(() => {
          this.toast.success("Video Deleted Successfully" , "Success" , 3000)
        }, 1000);

      }
    })
  }
}
