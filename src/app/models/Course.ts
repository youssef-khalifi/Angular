import {Teacher} from "./Teacher";

export class Course {
  id : number
  name: string;
  description: string;
  image?: Uint8Array;
  createdAt: Date;
  courseLevel: string;
  courType: string;
  teacher : Teacher


  constructor(
    id : number,
    name: string,
    description: string,
    image: Uint8Array | undefined,
    createdAt: Date,
    courseLevel: string,
    courType: string,
    teacher : Teacher
  ) {
    this.id = id
    this.name = name;
    this.description = description;
    this.image = image;
    this.createdAt = createdAt;
    this.courseLevel = courseLevel;
    this.courType = courType;
    this.teacher = teacher
  }


}
