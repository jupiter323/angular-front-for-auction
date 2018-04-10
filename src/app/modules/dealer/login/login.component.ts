import { Component , Renderer2, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from '../../../shared/services/configs/configs.service';
import { UserService } from '../../../shared/services/user/user.service';
import { Http } from '@angular/http';
import * as $ from 'jquery';
declare var localStorage  : any;

@Component({
  selector: '',
  templateUrl: 'login.component.html' ,
  providers:[ConfigurationService]
})

export class DealerLoginComponent {
 
  title = 'app';
  dealer:any = {};
  loginMsg:any = false;

  constructor(private renderer : Renderer2, private http: Http,private router : Router,private config : ConfigurationService, private userService : UserService ){  	
    //this.renderer.addClass(document.body, 'm-detail');
    /*$(document).ready(function(){
         console.log("okkkkkkk");
    });*/
  }

  dealerLogin(data){
    data = data.value; 
    let self = this;
    self.dealer = {
      email : data.email,
      password : data.password,
    }
    self.http.post(self.config.getAPIUrl()+ "dealer/login", self.dealer ).subscribe(response => {
      let loginData = response.json();      
      if(!loginData.error){
      	self.loginMsg = {error: false, message:"Login Successfull. Redirecting to dashboard" };
      	localStorage.setItem('authtoken', loginData.token);	
        localStorage.setItem('user' , JSON.stringify(loginData.user));
        self.userService.updateUser();
      	self.router.navigate(['/dealer/submit-car']);
      }
      else{
      	self.loginMsg.error = true;
      	self.loginMsg.message = loginData.message;
      	localStorage.setItem('authtoken', false);
      }     
    },error=>{
      self.loginMsg = error.json() ;
    });    
  }

//   ngOnDestroy(){
//     this.renderer.removeClass(document.body, 'm-detail');
//   }

}
