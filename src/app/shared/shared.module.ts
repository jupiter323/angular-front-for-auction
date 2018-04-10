import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarsHeaderComponent } from './components/header/header.component';
import { CarsFooterComponent } from './components/footer/footer.component';
import { UserService } from './services/user/user.service';

import { HelperService } from './services/helper/helper.service';
import { CarService } from './services/car/car.service';

@NgModule({
  declarations: [ CarsHeaderComponent, CarsFooterComponent ],
  imports: [RouterModule,CommonModule],
  exports: [ CarsHeaderComponent, CarsFooterComponent ],
  providers: [UserService, HelperService, CarService]
})

export class SharedModule {  }