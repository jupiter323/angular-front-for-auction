import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './cars.component';
import { CarsListingComponent } from './listing/listing.component';
import { CarsDetailsComponent } from './details/details.component';
import { UploadCarImageComponent } from './upload-image/upload-image.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadMakeLogoComponent } from './upload-make-logo/upload-make-logo';
import { ModalModule, TabsModule } from 'ngx-bootstrap';
import { ModelsComponent } from './models/models.component';


var carsRoutes = [{
	path: '',
	children: [{
		path: 'models',
		component: ModelsComponent
	},
	{
		path: 'listing',
		component: CarsListingComponent
	},
	{
		path: 'details',
		component: CarsDetailsComponent
	},
	{
		path: 'upload-image',
		component: UploadCarImageComponent
	},
	{
		path: 'upload-make-logo',
		component: UploadMakeLogoComponent
	}
	],
	component: CarsComponent
}]
@NgModule({
	declarations: [
		CarsComponent,
		CarsListingComponent,
		CarsDetailsComponent,
		UploadCarImageComponent,
		UploadMakeLogoComponent,
		ModelsComponent
	],
	imports: [
		RouterModule.forChild(carsRoutes),
		CommonModule,
		TabsModule.forRoot(),
		FormsModule
	],
	exports: [RouterModule]
})
export class CarsModule { }
