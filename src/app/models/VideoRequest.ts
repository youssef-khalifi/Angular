import {Course} from "./Course";

export class VideoRequest {
  title: string;
  description: string;
  tags: string;
  videoName: string;
  addedDate: Date;
  courseId: number;

  constructor(
    title: string,
    description: string,
    tags: string,
    videoName: string,
    addedDate: Date,
    courseId: number,

  ) {

    this.title = title;
    this.description = description;
    this.tags = tags;
    this.videoName = videoName;
    this.addedDate = addedDate;
    this.courseId = courseId;
  }
}


