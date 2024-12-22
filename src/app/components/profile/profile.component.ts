import {Component, OnInit} from '@angular/core';
import {TeacherService} from "../../services/teacher.service";
import {Teacher} from "../../models/Teacher";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  teacher : Teacher | undefined;
  teacherForm!: FormGroup;
  selectedImage: File | null = null;


  constructor(private service : TeacherService,private fb: FormBuilder,
              private authService : AuthService) {
  }

    ngOnInit(): void {

    if (this.authService.authenticatedUser.userType.includes("Teacher")){
      this.getTeacher()
    }
      this.teacherForm = this.fb.group({
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
        university: ['', Validators.required],
        jobTitle: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      }, { validators: this.passwordMatchValidator });
    }


  getTeacher(): void {
    this.service.getStudent().subscribe({
      next: (data: Teacher) => {
        console.log(data);
        this.teacher = data;
      },
      error: (err) => {
        console.error("Error fetching teacher data:", err);
      }
    });
  }

  updateUser(){

    const formData = new FormData();
    const formValues = this.teacherForm.value;


    formData.append('fullName', this.teacherForm.get('fullName')?.value);
    formData.append('jobTitle', this.teacherForm.get('jobTitle')?.value);
    formData.append('university', this.teacherForm.get('university')?.value);
    formData.append('phoneNumber', this.teacherForm.get('phoneNumber')?.value);
    formData.append('password', this.teacherForm.get('password')?.value);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    if (this.authService.authenticatedUser.userType.includes("Teacher")){


      this.service.updateTeacher(formData , this.teacher!.id).subscribe({
        next(data : Teacher){
          console.log(data)
        },
        error(error){
          console.log(error)
        }
      })



    }else {
      console.log('student')
    }
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }
}
