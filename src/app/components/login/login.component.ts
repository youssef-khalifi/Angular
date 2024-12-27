import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm! : FormGroup;
  registerForm! : FormGroup;

  constructor(private fb : FormBuilder,private toast: NgToastService,
              private  authService : AuthService,
              private router : Router) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        username: this.fb.control(""),
        password: this.fb.control(""),
        userType: this.fb.control("Student")
      }
    )

    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

  }

  onLogin(): void {

    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    let userType = "Student";

    console.log(username)
    console.log(password)
    console.log(userType)
    this.authService.login(username, password, userType).subscribe({
      next: (response) => {
        const { Access_Token, Refresh_Token } = response;
        this.authService.saveTokens(Access_Token, Refresh_Token , username , password , userType);
        console.log('Login successful! Tokens saved.');
        setTimeout(() => {
          this.router.navigate(['/home/local']);
        }, 1000);

        this.toast.success("Login with Success", "Success",1000);
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      }
    });
  }

  navigateToTeacherLogin(){
    this.router.navigate(['/login'])
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }


  register(){
    let fullName = this.registerForm.value.fullName;
    let email = this.registerForm.value.email;
    let password = this.registerForm.value.password;
    let gender = this.registerForm.value.gender;
    let age = this.registerForm.value.age;

    this.authService.Register(fullName,password,email,age,gender).subscribe({

      next : (data : any) => {
        setTimeout(() => {
          this.registerForm.reset()
        }, 2000);
        this.toast.success("Profile Created with Success", "Success",1000);
    }
    })
  }
}
