import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserSignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { UserLoginComponent } from './login/login.component';
import { UpdateUserProfileComponent } from './profile/profile.component';
import {UserDashboardComponent} from './dashboard/dashboard.component';
var userRoutes = [{
		path :'',
		children:[{
			path: 'signup',
			component: UserSignupComponent
		},
		{
			path: 'login',
			component: UserLoginComponent
		},
		{
			path: 'profile/:user',
			component: UpdateUserProfileComponent
		}
	],
		component : UserComponent
	}]
@NgModule({
  declarations: [
        UserComponent,
		UserSignupComponent,
		UserLoginComponent,
		UpdateUserProfileComponent,
		UserDashboardComponent
  ],
  imports: [
		RouterModule.forChild(userRoutes),
		CommonModule,
		FormsModule
  ],
  exports:[RouterModule]
})
export class UserModule { }
