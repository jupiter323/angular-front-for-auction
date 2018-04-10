import { Component , Renderer2, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from '../../../shared/services/configs/configs.service';
import { UserService } from '../../../shared/services/user/user.service';
import { HttpClient } from "@angular/common/http";
import * as $ from 'jquery';
declare var localStorage  : any;
import * as toastr from 'toastr';
import 'block-ui';


@Component({
  selector: '',
  templateUrl: 'login.component.html',
  providers:[ConfigurationService]
})

export class UserLoginComponent {
 
  title = 'app';
  dealer:any = {};
  loginMsg:any = false;
  constructor(private renderer : Renderer2, private http: HttpClient, private router : Router,private config : ConfigurationService, private userService : UserService ){  	
    
  }

  dealerLogin(data){
    data = data.value; 
    let self = this;
    self.dealer = {
      email : data.email,
      password : data.password,
    }

    $.blockUI({css:{backgroundColor : 'none', border: 'none'},message : $("<img src='/assets/images/logo/loader.gif'>")});

    self.http.post(self.config.getAPIUrl()+ "user/login", self.dealer ).subscribe(response => {
      let loginData:any = response;      
      if(!loginData.error){
      	localStorage.setItem('authtoken', loginData.token);
        localStorage.setItem('user' , JSON.stringify(loginData.user));
        self.userService.updateUser();
        toastr.success("Login success !! Redirecting to dashboard");
        setTimeout(function(){
            self.router.navigate(['/user/profile/'+loginData.user._id]);
        }, 2000);      	
      }
      else{
          toastr.error(loginData.message);
          localStorage.setItem('authtoken', false);
          $.unblockUI();
      }
    },error=>{
      $.unblockUI();
      toastr.error(error.error.message);
    }); 

  }
}
