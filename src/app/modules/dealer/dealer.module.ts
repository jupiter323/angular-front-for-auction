import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealerComponent } from './dealer.component';
import { DealerSignupComponent } from './register/register.component';
import { DealerLoginComponent } from './login/login.component';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';  
import { DealerSubmitCarComponent } from './submit-car/submit-car.component';
import { DealerDashboardComponent } from './dashboard/dashboard.component';
import { EnquiriesComponent } from './enquiries/enquiries.component';

var carsRoutes = [{
		path :'',
		children:[{
			path: 'register',
			component: DealerSignupComponent
		},
		{
			path: 'login',
			component: DealerLoginComponent
		},
		{
			path: 'submit-car',
			component: DealerSubmitCarComponent
		},
		{
			path: 'enquiries',
			component: EnquiriesComponent
		}],
		component : DealerComponent
	}]
@NgModule({
  declarations: [
    DealerComponent,
    DealerSignupComponent,
    DealerLoginComponent,
	DealerSubmitCarComponent,
	DealerDashboardComponent,
	EnquiriesComponent
  ],
  imports: [
		FormsModule,
		RouterModule.forChild(carsRoutes),
		HttpModule,
		CommonModule
  ],
  exports:[RouterModule]
})
export class DealerModule { }