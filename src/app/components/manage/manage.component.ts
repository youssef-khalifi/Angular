import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Course} from "../../models/Course";
import {CourService} from "../../services/cour.service";
import {Teacher} from "../../models/Teacher";
import {TeacherService} from "../../services/teacher.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NgToastService} from "ng-angular-popup";
import {window} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit{

  @ViewChild('modal', { static: false }) modal!: ElementRef;
  @ViewChild('modalForm', { static: false }) modalForm!: ElementRef;
  @ViewChild('modalFormUpdate', { static: false }) modalFormUpdate!: ElementRef;

  courses! : Course[] ;
  teacher! : Teacher ;
  course! : Course ;
  courseUpdate! : Course ;
  courseForm!: FormGroup;
  courseFormUpdate!: FormGroup;
  selectedImage: File | null = null;

  constructor(private courService: CourService,
              private fb: FormBuilder,
              private service : TeacherService,
              private toast: NgToastService,
              private renderer: Renderer2) {
  }
  ngOnInit(): void {
    this.getTeacherAndCourses();

    this.courseForm = this.fb.group({
      name: ['', [Validators.required]],
      courseType: ['', [Validators.required]],
      courseLevel: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.courseFormUpdate = this.fb.group({
      name: ['', [Validators.required]],
      courseType: ['', [Validators.required]],
      courseLevel: ['', Validators.required],
      description: ['', Validators.required],
    });

  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  getTeacherAndCourses(): void {

    this.service.getStudent().subscribe({
      next: (data: Teacher) => {
        this.teacher = data;
        this.getCourses();
      },
      error: (err) => {
        console.error("Error fetching teacher data:", err);
      }
    });
  }

  getCourses(): void {
    if (this.teacher?.id) {
      this.courService.getCoursesByTeacher(this.teacher.id).subscribe({
        next: (data: Course[]) => {
          this.courses = data;
        },
        error: (err) => {
          console.error("Error fetching courses data:", err);
        }
      });
    }
  }

  deleteCour(cour : Course){
    this.courService.deleteCourse(cour.id).subscribe({
     next:() => {
       this.getCourses()
       this.toast.success("Delete with success" , "Success" , 2000)
       this.closeModal()
     },
      error : ()=>{
        this.toast.success("Error Delete Course" , "Error" , 2000)
      }
    })
    }

  createCourse(){
    const form = new FormData();


    form.append('name', this.courseForm.get('name')?.value);
    form.append('courType', this.courseForm.get('courseType')?.value);
    form.append('courseLevel', this.courseForm.get('courseLevel')?.value);
    form.append('description', this.courseForm.get('description')?.value);
    if (this.selectedImage) {
      form.append('imageFile', this.selectedImage);
    }

    this.courService.createCourse(form ,this.teacher!.id).subscribe({
    next :(data : Course)=>{
      console.log(data)
      this.closeModalForm()
      this.getCourses()
      this.courseForm.reset()
    },
      error :(error)=>{
      this.courseForm.reset()
      }
    })

  }

  updateCourse(){
    const formUpdate = new FormData();


    formUpdate.append('name', this.courseFormUpdate.get('name')?.value);
    formUpdate.append('courType', this.courseFormUpdate.get('courseType')?.value);
    formUpdate.append('courseLevel', this.courseFormUpdate.get('courseLevel')?.value);
    formUpdate.append('description', this.courseFormUpdate.get('description')?.value);
    if (this.selectedImage) {
      formUpdate.append('imageFile', this.selectedImage);
    }

    this.courService.updateCourse(formUpdate , this.courseUpdate!.id).subscribe({

      next: (data : Course) =>{
        console.log(data)
        this.course = data
        this.courseFormUpdate.reset()
        this.getCourses()
        this.closeModalFormUpdate()
        this.courseFormUpdate.reset();
        this.selectedImage = null;
      }
    })
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

  openModalForm() {

    this.renderer.addClass(this.modalForm.nativeElement, 'fade-in');
    this.renderer.setStyle(this.modalForm.nativeElement, 'display', 'block');
    setTimeout(() => {
      this.renderer.addClass(this.modalForm.nativeElement, 'show');
    }, 10);
  }

  closeModalForm() {
    this.renderer.removeClass(this.modalForm.nativeElement, 'show');
    setTimeout(() => {
      this.renderer.removeClass(this.modalForm.nativeElement, 'fade-in');
      this.renderer.setStyle(this.modalForm.nativeElement, 'display', 'none');
    }, 300);

    this.courseForm.reset();
  }

  openModalFormUpdate(cour : Course) {

    this.courseUpdate = cour;
    this.renderer.addClass(this.modalFormUpdate.nativeElement, 'fade-in');
    this.renderer.setStyle(this.modalFormUpdate.nativeElement, 'display', 'block');
    setTimeout(() => {
      this.renderer.addClass(this.modalFormUpdate.nativeElement, 'show');
    }, 10);
  }

  closeModalFormUpdate() {
    this.renderer.removeClass(this.modalFormUpdate.nativeElement, 'show');
    setTimeout(() => {
      this.renderer.removeClass(this.modalFormUpdate.nativeElement, 'fade-in');
      this.renderer.setStyle(this.modalFormUpdate.nativeElement, 'display', 'none');
    }, 300);

  }
}
