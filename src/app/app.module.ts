import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/services/auth/token.interceptor';
import { HomeComponent } from './modules/home/home.component';
import { ModalModule, TabsModule } from 'ngx-bootstrap';

const appRoutes = [{
		path :'cars',
		loadChildren: './modules/cars/cars.module#CarsModule'
  },{
		path :'dealer',
		loadChildren: './modules/dealer/dealer.module#DealerModule'
	},{
		path :'user',
		loadChildren: './modules/user/user.module#UserModule'
	},{
		path :'',
		component: HomeComponent
	}];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
  	RouterModule.forRoot(appRoutes),
    BrowserModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ModalModule.forRoot(),
    TabsModule.forRoot()
  ],
  exports: [ SharedModule, FormsModule, CommonModule ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
