import {Course} from "./Course";


export class Student {
  id: number;
  fullName: string;
  age: number;
  gender: string;
  image?: Uint8Array;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  university: string;
  jobTitle: string;
  courses : Course[] = [];

  constructor(
    id: number,
    fullName: string,
    age: number,
    gender: string,
    image: Uint8Array | undefined,
    email: string,
    password: string,
    university: string,
    phoneNumber: string,
    jobTitle: string,
    role: string
  ) {
    this.id = id;
    this.fullName = fullName;
    this.age = age;
    this.gender = gender;
    this.image = image;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.jobTitle = jobTitle;
    this.university = university;
  }
}
