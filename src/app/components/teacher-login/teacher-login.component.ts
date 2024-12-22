import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrl: './teacher-login.component.css'
})
export class TeacherLoginComponent implements OnInit {

  loginForm! : FormGroup;
  registerForm! : FormGroup;

  constructor(private fb : FormBuilder,
              private  authService : AuthService,
              private router : Router,
              private toast: NgToastService) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        username: this.fb.control(""),
        password: this.fb.control(""),
        userType: this.fb.control("Teacher")
      }
    )
  }

  onLogin(): void {

    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    let userType = this.loginForm.value.userType;

    this.authService.login(username, password, userType).subscribe({
      next: (response) => {
        const { Access_Token, Refresh_Token } = response;
        this.authService.saveTokens(Access_Token, Refresh_Token , username , password , userType);
        console.log('Login successful! Tokens saved.');
        console.log(response)

        this.toast.success("welcome" , "Success" , 3000)
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.toast.danger("Credentials not Correct" , "Error" , 3000)
      }
    });
  }

  navigateToStudentLogin(){
    this.router.navigate(['/'])
  }



}
