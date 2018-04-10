import { Component , Renderer2, OnInit } from '@angular/core';
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
  templateUrl: 'dashboard.component.html',
  providers:[ConfigurationService]
})

export class UserDashboardComponent implements OnInit {
  title = 'app';
  dealer:any = {};
  loginMsg:any = false;
  constructor(private renderer : Renderer2, private http: HttpClient, private router : Router,private config : ConfigurationService, private userService : UserService ){  	
    //this.renderer.addClass(document.body, 'm-detail');
  }

  ngOnInit(){

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
      	//self.loginMsg = {error: false, message:"Login Successfull. Redirecting to dashboard" };
      	localStorage.setItem('dealertoken', loginData.token);	
        localStorage.setItem('user' , JSON.stringify(loginData.user));
        self.userService.updateUser();
        toastr.error("Success !! Redirecting to dashboard");
        setTimeout(function(){
            self.router.navigate(['/user/dashboard']);
        }, 2000);      	
      }
      else{
      	//self.loginMsg.error = true;
          //self.loginMsg.message = loginData.message;
          toastr.error(loginData.message);
          localStorage.setItem('dealertoken', false);
          $.unblockUI();
      }
    },error=>{
        console.log(error, "error");
      //self.loginMsg = error.json() ;
      $.unblockUI();
      toastr.error(error.error.message);
    }); 

  }
}
