import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm! : FormGroup;
  registerForm! : FormGroup;

  constructor(private fb : FormBuilder,
              //private  authService : AuthService,
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
  }

  onLogin(): void {

    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    let userType = this.loginForm.value.userType;

   /* this.authService.login(username, password, userType).subscribe({
      next: (response) => {
        const { Access_Token, Refresh_Token } = response;
        this.authService.saveTokens(Access_Token, Refresh_Token , username , password , userType);
        console.log('Login successful! Tokens saved.');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      }
    });*/
  }

  navigateToTeacherLogin(){
    this.router.navigate(['/login'])
  }



}
