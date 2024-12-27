import {Course} from "./Course";

export class Video {
  id: number; // Equivalent to @Id and @GeneratedValue
  title: string;
  description: string;
  tags: string;
  videoName: string;
  addedDate: Date;
  courseId: number;
  course?: Course;

  constructor(
    id: number,
    title: string,
    description: string,
    tags: string,
    videoName: string,
    addedDate: Date,
    courseId: number,
    course?: Course
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.videoName = videoName;
    this.addedDate = addedDate;
    this.courseId = courseId;
    this.course = course;
  }
}


