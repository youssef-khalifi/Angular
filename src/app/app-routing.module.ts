import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {authGuard} from "./guards/auth.guard";
import {TeacherLoginComponent} from "./components/teacher-login/teacher-login.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {CourseComponent} from "./components/course/course.component";
import {CourseDetailsComponent} from "./components/course-details/course-details.component";
import {ManageComponent} from "./components/manage/manage.component";
import {VideosComponent} from "./components/videos/videos.component";
import {AboutComponent} from "./components/about/about.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard], children:
      [
        { path: 'local', component : AboutComponent },
        { path: 'course', component : CourseComponent },
        { path: 'profile', component : ProfileComponent },
        { path: 'manage', component : ManageComponent },
        { path: 'resources/:name', component : VideosComponent },
        {path: 'course-details/:name', component: CourseDetailsComponent},
      ],
  },
  { path: '', component: LoginComponent },
  { path: 'login', component: TeacherLoginComponent },
  { path: '**', redirectTo: 'login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
